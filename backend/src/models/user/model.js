import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto, { randomUUID } from "crypto";
import { USER_ADDRESS_TYPES, USER_ROLE } from "../../constants/user.js";
import { SALT_ROUNDS } from "../../config/env.js";

const { Schema } = mongoose;

// Address Schema

const addressSchema = new Schema(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    streetName: { type: String, required: true },
    houseNumber: { type: String, required: true },
    zipCode: { type: String, required: true },

    addressType: {
      type: String,
      enum: USER_ADDRESS_TYPES,
      required: true,
    },
  },
  { _id: false }
);

// User Schema

const userSchema = new Schema(
  {
    reference_id: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(8).toString("hex"),
    },

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },

    addresses: { type: [addressSchema], default: [] },

    image: {
      type: String,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },

    role: { type: String, enum: USER_ROLE, default: "Customer" },

    myOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    agree: { type: Boolean, required: true },

    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// Pre-save hook to generate user_code
userSchema.pre("save", function () {
  if (!this.isNew || this.reference_id) return;

  this.reference_id = `USR_${randomUUID()}`;
});

// Password Hashing

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

// Password Changed At
userSchema.pre("save", function () {
  if (!this.isModified("password") || this.isNew) return;

  this.passwordChangedAt = Date.now() - 1000;
  return;
});

// Compare input password with hashed password

userSchema.methods.verifyPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create password reset token

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Check if password was changed after token issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
export default User;
