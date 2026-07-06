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

export async function GET() {
  try {
    const db = getPool();

    // 1. Create table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS visit_counter (
        id SERIAL PRIMARY KEY,
        page_name VARCHAR(50) UNIQUE NOT NULL,
        views INTEGER DEFAULT 0
      );
    `);

    // 2. Insert default row if not exists, and increment view count atomically
    const query = `
      INSERT INTO visit_counter (page_name, views)
      VALUES ('home', 1)
      ON CONFLICT (page_name)
      DO UPDATE SET views = visit_counter.views + 1
      RETURNING views;
    `;

    const result = await db.query(query);
    const views = result.rows[0]?.views ?? 0;

    return NextResponse.json({ success: true, views });
  } catch (error: any) {
    console.error("Database counter error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Database connection error" },
      { status: 500 }
    );
  }
}
