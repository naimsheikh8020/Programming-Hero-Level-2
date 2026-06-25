import type { Request, Response } from "express";
import { registerSchema } from "./auth.schema.js";
import { User } from "../../models/user.model.js";
import { hashPassword } from "../../lib/hash.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../lib/email.js";

function getAppUrl() {
  return process.env.App_URL || "http://localhost:5000";
}

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const result = await registerSchema.safeParseAsync(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request data",
        errors: result.error.flatten(),
      });
    }
    const { email, password, name } = result.data;
    const NormalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: NormalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    const passwordHash = await hashPassword(password);

    const newlyCreatedUser = await User.create({
      email: NormalizedEmail,
      passwordHash: passwordHash,
      name,
      role: "user",
      isEmailVerified: false,
      twoFactorEnabled: false,
    });
    const verifyToken = jwt.sign(
      {
        sub: newlyCreatedUser.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verifyToken}`;
    await sendEmail(
      newlyCreatedUser.email,
      "Verify your email",
      `<p>Hi ${newlyCreatedUser.name},</p>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>If you did not register, please ignore this email.</p>`,
    )

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        id: newlyCreatedUser.id,
        email: newlyCreatedUser.email,
        name: newlyCreatedUser.name,
        role: newlyCreatedUser.role,
        isEmailVerified: newlyCreatedUser.isEmailVerified,
        twoFactorEnabled: newlyCreatedUser.twoFactorEnabled,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
