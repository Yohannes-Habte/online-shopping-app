import { NODE_ENV } from "../../config/env.js";

// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
  // Set default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (NODE_ENV !== "production") {
    console.error("ERROR 💥", {
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    console.error(`ERROR: ${message} (${statusCode})`);
  }

  // Additional error details for logging
  const errorDetails = {
    statusCode: statusCode,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  };

  // Log detailed error information in non-production environments
  if (NODE_ENV !== "production") {
    console.error("Error Details:", JSON.stringify(errorDetails, null, 2));
  } else {
    // In production, log minimal error details or use a logging service
    console.error(`Error: ${message}, StatusCode: ${statusCode}`);
  }

  // Structure the error response
  const errorResponse = {
    success: false,
    status: statusCode,
    message: message,
    stack: NODE_ENV !== "production" ? err.stack : undefined,
  };

  // Return the error response
  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
