import { NextResponse } from "next/server";
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

export async function GET(request: Request) {
  try {
    const db = getPool();

    // 1. Create tables if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS visit_counter (
        id SERIAL PRIMARY KEY,
        page_name VARCHAR(50) UNIQUE NOT NULL,
        views INTEGER DEFAULT 0
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS active_sessions (
        session_id VARCHAR(50) PRIMARY KEY,
        last_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Parse session_id query parameter
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      await db.query(`
        INSERT INTO active_sessions (session_id, last_ping)
        VALUES ($1, CURRENT_TIMESTAMP)
        ON CONFLICT (session_id)
        DO UPDATE SET last_ping = CURRENT_TIMESTAMP;
      `, [sessionId]);
    }

    // 3. Clean up expired sessions (older than 20 seconds)
    await db.query(`
      DELETE FROM active_sessions
      WHERE last_ping < CURRENT_TIMESTAMP - INTERVAL '20 seconds';
    `);

    // 4. Get active users count
    const activeResult = await db.query(`
      SELECT COUNT(*) as count FROM active_sessions;
    `);
    const activeCount = parseInt(activeResult.rows[0]?.count ?? "1", 10);

    // 5. Increment view count atomically
    const query = `
      INSERT INTO visit_counter (page_name, views)
      VALUES ('home', 1)
      ON CONFLICT (page_name)
      DO UPDATE SET views = visit_counter.views + 1
      RETURNING views;
    `;

    const result = await db.query(query);
    const views = result.rows[0]?.views ?? 0;

    return NextResponse.json({
      success: true,
      views,
      activeUsers: Math.max(1, activeCount),
    });
  } catch (error: any) {
    console.error("Database counter error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Database connection error" },
      { status: 555 } // custom fallback code
    );
  }
}
