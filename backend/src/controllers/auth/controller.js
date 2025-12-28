import { FRONTEND_URL } from "../../config/env.js";
import generateToken from "../../middlewares/token/middleware.js";
import User from "../../models/user/model.js";
import crypto from "crypto";
import sendEmail from "../../utils/sendMail.js";
import { AppError } from "../../utils/errors.js";
import { HTTP_STATUS } from "../../constants/index.js";

const JWT_EXPIRES_IN = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
const REMEMBER_ME_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000;

// ==============================================================================================
// Create new user in the database
// ==============================================================================================

export const createUser = async (req, res, next) => {
  const { name, email, password, role, consent } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("User already exists", HTTP_STATUS.CONFLICT);
    }

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password,
      role,
      agree: consent,
    });

    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser, JWT_EXPIRES_IN);

    // Set cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + JWT_EXPIRES_IN),
      sameSite: "strict",
      //   secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new AppError(
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// ==============================================================================================
// Login user in the database
// ==============================================================================================

export const loginUser = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    // Compare password using User model method
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    // Determine token expiry based on rememberMe

    const tokenExpiry = rememberMe ? REMEMBER_ME_EXPIRES_IN : JWT_EXPIRES_IN;
    const cookieExpiryMs = rememberMe ? REMEMBER_ME_EXPIRES_IN : JWT_EXPIRES_IN;

    // Generate JWT
    const token = generateToken(user, tokenExpiry);

    // Set cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + cookieExpiryMs),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    throw new AppError(
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// ==============================================================================================
// Update user information in the database
// ==============================================================================================

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    // Prevent updating password directly here
    if (updateData.password) delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new AppError(
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// ==============================================================================================
// Forgot password - generate a reset token
// ==============================================================================================

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    // Generate reset token using model method
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Construct reset URL (adjust your frontend URL)
    const resetURL = `${FRONTEND_URL}/reset-password/${resetToken}`;

    // Email content
    const message = `
      <h2>Password Reset Request</h2>
      <p>Hi ${user.name || "User"},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetURL}" style="padding:10px 15px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks,<br>LisaConsult Team</p>
    `;

    const textMessage = `Hi ${user.name || "User"},
You requested a password reset. Use this link to reset your password:
${resetURL}
If you did not request this, please ignore this email.
Thanks, LisaConsult Team`;

    // Send email
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: message,
      text: textMessage,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    throw new AppError(
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// ==============================================================================================
// Reset password using token
// ==============================================================================================

export const resetPassword = async (req, res, next) => {
  const { password } = req.body;

  const { token } = req.params;

  if (!token || !password) {
    throw new AppError("Token and new password are required", 400);
  }

  try {
    // Hash token to match stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("Invalid or expired password reset token", 400);
    }

    // Update password and clear reset token fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    // Generate new JWT after password reset
    const tokenJWT = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
      token: tokenJWT,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new AppError(
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// ==============================================================================================
// Logout user by clearing the token cookie
// ==============================================================================================
export const logoutUser = (req, res, next) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      //   secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new AppError(
      "Internal server error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
