import fp from "fastify-plugin";
import { Pool } from "pg";

export default fp(async (fastify) => {
  // 1️⃣ Validate environment early
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // 2️⃣ Create SINGLE pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DB_POOL_SIZE ?? 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // 3️⃣ Verify DB connection (fail fast)
  try {
    await pool.query("SELECT 1");
    fastify.log.info("Database connected successfully");
  } catch (err) {
    fastify.log.error(err, "Database connection failed");
    throw err; // stop app startup
  }

  // 4️⃣ Decorate fastify instance
  fastify.decorate("db", pool);

  // 5️⃣ Graceful shutdown
  fastify.addHook("onClose", async () => {
    fastify.log.info("Closing database connection pool");
    await pool.end();
  });
});
