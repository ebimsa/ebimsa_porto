import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

let pool: Pool | null = null;

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

export async function GET(request: NextRequest) {
  try {
    const db = getPool();

    // Create table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS guest_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    
    let query = "SELECT id, name, message, created_at FROM guest_messages ORDER BY created_at DESC";
    const values: any[] = [];

    if (limitParam && limitParam !== "all") {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        query += " LIMIT $1";
        values.push(limit);
      }
    }

    const result = await db.query(query, values);
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
    const body = await request.json();
    const { name, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    const sanitizedName = sanitizeString(name).substring(0, 100);
    const sanitizedMessage = sanitizeString(message).substring(0, 1000);

    const db = getPool();

    // Ensure table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS guest_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

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
