import mysql from "mysql2/promise";

// Validate required env variables
const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME", "DB_PORT"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Warning: Missing environment variable ${key}`);
  }
});

// Create pool with safe fallbacks
const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASS ?? "",
  database: process.env.DB_NAME ?? "management_system",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Quick test to verify connection (only logs once on startup)
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected:", conn.config.database);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

export default pool;
