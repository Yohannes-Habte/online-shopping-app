import express from "express";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./middlewares/rateLimit/middleware.js";
import routes from "./routes/index.js";
import { FRONTEND_URL } from "./config/env.js";
import globalErrorHandler from "./middlewares/globalError/middleware.js";

const app = express();

// -------------------
// Security Middlewares
// -------------------

// Add secure headers
app.use(helmet());

// Enable CORS for your frontend
app.use(
  cors({
    origin: FRONTEND_URL, // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Limit repeated requests from same IP (rate limiting)
app.use(limiter);

// Parse JSON bodies
app.use(express.json());

// -------------------
// Routes
// -------------------
app.use("/api/v1", routes);

// -------------------
// Error Handling Middleware
// -------------------
app.use(globalErrorHandler);

// -------------------
// Export app
// -------------------
export default app;
