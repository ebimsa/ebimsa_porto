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
      CREATE TABLE IF NOT EXISTS visit_logs (
        id SERIAL PRIMARY KEY,
        visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS active_sessions (
        session_id VARCHAR(50) PRIMARY KEY,
        last_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seeding visit_logs with July 6 late-night deployment traffic if empty
    const logCheckResult = await db.query("SELECT COUNT(*)::INTEGER as count FROM visit_logs;");
    const logCount = logCheckResult.rows[0]?.count ?? 0;
    if (logCount === 0) {
      const deployDate = "2026-07-06";
      const numDeployViews = 8; // Small count for late night deployment
      for (let j = 0; j < numDeployViews; j++) {
        const hour = 20 + Math.floor(Math.random() * 4); // 20:00 to 23:00
        const minute = Math.floor(Math.random() * 60);
        await db.query(`
          INSERT INTO visit_logs (visited_at)
          VALUES ($1::TIMESTAMP WITH TIME ZONE);
        `, [`${deployDate} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+07`]);
      }
    }

    // 2. Parse session_id query parameter
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    let isNewSession = true;
    if (sessionId) {
      const sessionCheck = await db.query(
        "SELECT last_ping FROM active_sessions WHERE session_id = $1",
        [sessionId]
      );
      isNewSession = sessionCheck.rows.length === 0;

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

    // 5. If new session, increment view count & insert log
    if (isNewSession) {
      await db.query(`
        INSERT INTO visit_logs (visited_at)
        VALUES (CURRENT_TIMESTAMP);
      `);

      await db.query(`
        INSERT INTO visit_counter (page_name, views)
        VALUES ('home', 1)
        ON CONFLICT (page_name)
        DO UPDATE SET views = visit_counter.views + 1;
      `);
    }

    // 6. Get total views directly from visit_logs count to ensure 100% consistency with chart data
    const viewsResult = await db.query(`
      SELECT COUNT(*)::INTEGER as count FROM visit_logs;
    `);
    const views = viewsResult.rows[0]?.count ?? 0;

    // 7. Get daily visits (past 30 days)
    const dailyResult = await db.query(`
      SELECT 
        TO_CHAR(visited_at AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM-DD') as label, 
        COUNT(*)::INTEGER as count
      FROM visit_logs
      WHERE visited_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY label
      ORDER BY label ASC;
    `);

    // 8. Get monthly visits (past 12 months)
    const monthlyResult = await db.query(`
      SELECT 
        TO_CHAR(visited_at AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM') as label, 
        COUNT(*)::INTEGER as count
      FROM visit_logs
      WHERE visited_at >= CURRENT_DATE - INTERVAL '12 months'
      GROUP BY label
      ORDER BY label ASC;
    `);

    // 9. Get yearly visits (past 5 years)
    const yearlyResult = await db.query(`
      SELECT 
        TO_CHAR(visited_at AT TIME ZONE 'Asia/Jakarta', 'YYYY') as label, 
        COUNT(*)::INTEGER as count
      FROM visit_logs
      WHERE visited_at >= CURRENT_DATE - INTERVAL '5 years'
      GROUP BY label
      ORDER BY label ASC;
    `);

    return NextResponse.json({
      success: true,
      views,
      activeUsers: Math.max(1, activeCount),
      daily: dailyResult.rows,
      monthly: monthlyResult.rows,
      yearly: yearlyResult.rows,
    });
  } catch (error: any) {
    console.error("Database counter error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Database connection error" },
      { status: 555 }
    );
  }
}
