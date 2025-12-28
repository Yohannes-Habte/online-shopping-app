import http from "http";
import app from "./app.js";
import  connectDB from "./config/db.js";
import { PORT, NODE_ENV } from "./config/env.js";

/**
 * Validate required environment variables
 */
const REQUIRED_ENV_VARS = ["PORT", "MONGO_URI", "JWT_SECRET"];

REQUIRED_ENV_VARS.forEach((env) => {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

/**
 * Create HTTP server
 */
const server = http.createServer(app);

/**
 * Start server
 */
const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${NODE_ENV || "development"} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = (signal) => {
  console.log(`\n⚠️ Received ${signal}. Closing server...`);

  server.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("❌ Force shutdown after timeout");
    process.exit(1);
  }, 10000);
};

/**
 * Process-level error handling
 */
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Promise Rejection:", reason);
  gracefulShutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});
