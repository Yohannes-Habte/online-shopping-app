import JWT from "jsonwebtoken";
import User from "../../models/user/model.js";
import mongoose from "mongoose";
import { AppError } from "../../utils/errors.js";

//====================================================================
// Verify token
//====================================================================

const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

//====================================================================
// Middleware: Authentication
//====================================================================

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("User is not authenticated!", 401));
  }

  try {
    const user = verifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

//====================================================================
// Middleware: Authorization
//====================================================================

const checkRole = (role) => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return next(new AppError("Not authenticated!", 401));
    }

    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new AppError("User not found", 404));
      }

      if (user.role !== role) {
        return next(
          new AppError(
            "Forbidden: You do not have permission to perform this action",
            403
          )
        );
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new AppError("Server error. Please try again later.", 500));
    }
  };
};

//====================================================================
// Middleware: Owner or Admin Authorization
//====================================================================

export const isOwnerOrAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Not authenticated!", 401));
  }

  try {
    const decoded = verifyToken(token);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid user ID format", 400));
    }

    const user = await User.findById(decoded.id).select("_id role");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (user._id.toString() !== req.params.id && user.role !== "Admin") {
      return next(
        new AppError(
          "Forbidden: You do not have permission to perform this action",
          403
        )
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Server error. Please try again later.", 500));
  }
};

//====================================================================
// Middleware: Role Authorization
//====================================================================

export const isAdmin = checkRole("Admin");
export const isVendor = checkRole("Vendor");
