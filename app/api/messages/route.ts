import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

let pool: Pool | null = null;
let tableInitialized = false;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set in environment variables");
    }
    pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

async function ensureTable(db: Pool) {
  if (tableInitialized) return;
  await db.query(`
    CREATE TABLE IF NOT EXISTS guest_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  tableInitialized = true;
}

function sanitizeString(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// --- Rate Limiting In-Memory Store ---
// Map of IP -> array of submission timestamps (ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_INTERVAL_MS = 10 * 1000; // 10 seconds between submissions

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp.trim();
  }
  return "127.0.0.1";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number; reason?: string } {
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) || [];

  // Prune timestamps outside window
  timestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length > 0) {
    const lastTime = timestamps[timestamps.length - 1];
    const intervalDiff = now - lastTime;
    if (intervalDiff < MIN_INTERVAL_MS) {
      const waitSeconds = Math.ceil((MIN_INTERVAL_MS - intervalDiff) / 1000);
      return {
        allowed: false,
        retryAfterSeconds: waitSeconds,
        reason: `Mohon tunggu ${waitSeconds} detik sebelum mengirim pesan berikutnya.`,
      };
    }
  }

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = timestamps[0];
    const waitSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000);
    return {
      allowed: false,
      retryAfterSeconds: waitSeconds,
      reason: `Batas pengiriman pesan tercapai (maksimal ${MAX_REQUESTS_PER_WINDOW} pesan per 5 menit). Silakan tunggu ${waitSeconds} detik.`,
    };
  }

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 2000) {
    for (const [key, times] of rateLimitMap.entries()) {
      const valid = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, valid);
      }
    }
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return { allowed: true };
}

export async function GET(request: NextRequest) {
  try {
    const db = getPool();
    await ensureTable(db);

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    
    // Default limit is 50, maximum capped at 100 to prevent DB overload
    let limit = 50;
    if (limitParam) {
      if (limitParam === "all") {
        limit = 100;
      } else {
        const parsed = parseInt(limitParam, 10);
        if (!isNaN(parsed) && parsed > 0) {
          limit = Math.min(parsed, 100);
        }
      }
    }

    const query = "SELECT id, name, message, created_at FROM guest_messages ORDER BY created_at DESC LIMIT $1";
    const result = await db.query(query, [limit]);
    return NextResponse.json({ success: true, messages: result.rows });
  } catch (error: any) {
    console.error("Database messages GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Database connection error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // 1. Check Rate Limiting
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason || "Terlalu banyak permintaan." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds || 10),
          }
        }
      );
    }

    const body = await request.json();
    const { name, message, website, timestamp } = body;

    // 2. Honeypot check: Bots usually fill hidden form inputs
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: "Aktivitas bot terdeteksi." },
        { status: 400 }
      );
    }

    // 3. Time-to-submit verification: Humans take > 1.5s to read & submit form
    if (timestamp !== undefined) {
      const now = Date.now();
      const elapsed = now - Number(timestamp);
      if (elapsed < 1500) {
        return NextResponse.json(
          { success: false, error: "Pengiriman terlalu cepat. Terdeteksi bot otomatis." },
          { status: 400 }
        );
      }
      // If older than 24 hours or in the future by more than 1 minute
      if (elapsed > 24 * 60 * 60 * 1000 || elapsed < -60000) {
        return NextResponse.json(
          { success: false, error: "Sesi formulir kadaluarsa. Silakan muat ulang halaman." },
          { status: 400 }
        );
      }
    }

    // 4. Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Nama harus diisi (minimal 2 karakter)." },
        { status: 400 }
      );
    }
    if (name.trim().length > 50) {
      return NextResponse.json(
        { success: false, error: "Nama maksimal 50 karakter." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Pesan harus diisi (minimal 3 karakter)." },
        { status: 400 }
      );
    }
    if (message.trim().length > 500) {
      return NextResponse.json(
        { success: false, error: "Pesan maksimal 500 karakter." },
        { status: 400 }
      );
    }

    // 5. Anti-Flood Random String Pattern Check (e.g., 50-character single word gibberish)
    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 30 && !/\s/.test(trimmedMessage)) {
      return NextResponse.json(
        { success: false, error: "Format pesan tidak wajar (pesan panjang harus memiliki spasi kata)." },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeString(name).substring(0, 50);
    const sanitizedMessage = sanitizeString(message).substring(0, 500);

    const db = getPool();
    await ensureTable(db);

    const query = `
      INSERT INTO guest_messages (name, message)
      VALUES ($1, $2)
      RETURNING id, name, message, created_at;
    `;

    const result = await db.query(query, [sanitizedName, sanitizedMessage]);
    return NextResponse.json({ success: true, message: result.rows[0] });
  } catch (error: any) {
    console.error("Database messages POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Database connection error" },
      { status: 500 }
    );
  }
}
