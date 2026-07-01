import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { User } from "../../models/user.model.js";
import { checkPassword, hashPassword } from "../../lib/hash.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../lib/email.js";
import { createAccessToken, createRefreshToken } from "../../lib/token.js";

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
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    const passwordHash = await hashPassword(password);

    const newlyCreatedUser = await User.create({
      email: normalizedEmail,
      passwordHash,
      name,
      role: "user",
      isEmailVerified: false,
      twoFactorEnabled: false,
    });

    const verifyToken = jwt.sign(
      { sub: newlyCreatedUser.id },
      process.env.JWT_ACCESS_SECRET!, // or JWT_VERIFY_SECRET
      { expiresIn: "1d" }
    );

    const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verifyToken}`;

    try {
      await sendEmail(
        newlyCreatedUser.email,
        "Verify your email",
        `
          <p>Hi ${newlyCreatedUser.name},</p>
          <p>Thank you for registering.</p>
          <p>Please click the link below to verify your email:</p>
          <a href="${verifyUrl}">Verify Email</a>
          <p>If you didn't create this account, please ignore this email.</p>
        `
      );

      return res.status(201).json({
        status: "success",
        message:
          "Registration successful. Please check your email to verify your account.",
        user: {
          id: newlyCreatedUser.id,
          email: newlyCreatedUser.email,
          name: newlyCreatedUser.name,
          role: newlyCreatedUser.role,
          isEmailVerified: newlyCreatedUser.isEmailVerified,
          twoFactorEnabled: newlyCreatedUser.twoFactorEnabled,
        },
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      return res.status(201).json({
        status: "success",
        message:
          "Account created successfully, but we couldn't send the verification email. Please request a new verification email later.",
        user: {
          id: newlyCreatedUser.id,
          email: newlyCreatedUser.email,
          name: newlyCreatedUser.name,
          role: newlyCreatedUser.role,
          isEmailVerified: newlyCreatedUser.isEmailVerified,
          twoFactorEnabled: newlyCreatedUser.twoFactorEnabled,
        },
      });
    }
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const verifyEmailHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.query.token as string | undefined;

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Verification token is required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as jwt.JwtPayload;

    const userId = decoded.sub as string;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        status: "error",
        message: "Email is already verified",
      });
    }

    user.isEmailVerified = true;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Invalid or expired verification token",
    });
  }
};


export const loginHandler = async(req: Request, res: Response) => {
  try {
    const result = await loginSchema.safeParse(req.body);
    if(!result.success){
      return res.status(400).json({
        status: "error",
        message: "Invalid request data",
        errors: result.error.flatten()
      });
    }

    const { email, password } = result.data;
    const NormalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: NormalizedEmail });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await checkPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    if(!user.isEmailVerified){
      return res.status(403).json({
        status: "error",
        message: "Please verify your email before logging in.",
      });
    }

    const accessToken = createAccessToken(user.id, user.role, user.tokenVersion);
    
    const refreshToken = createRefreshToken(user.id, user.role, user.tokenVersion);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
