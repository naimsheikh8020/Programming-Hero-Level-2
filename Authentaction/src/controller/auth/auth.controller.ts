import type { Request, Response } from "express";
import { registerSchema } from "./auth.schema.js";
import { User } from "../../models/user.model.js";
import { hashPassword } from "../../lib/hash.js";



export const registerHandler = async (req: Request, res: Response) => {
  try {
    const result = await registerSchema.safeParseAsync(req.body);
    if(!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request data",
        errors: result.error.flatten()
      });
    }
    const { email, password, name } = result.data;
    const NormalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: NormalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists"
      });
    }

    const passwordHash = await hashPassword(password);

    const newlyCreatedUser = await User.create({
      email: NormalizedEmail,
      passwordHash: passwordHash,
      name,
      role: "user",
      isEmailVerified: false,
      twoFactorEnabled: false
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newlyCreatedUser
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
}