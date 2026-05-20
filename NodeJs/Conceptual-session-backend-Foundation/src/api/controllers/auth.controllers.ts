import type { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { sendResponse } from "../../db/utils/sendResponse.js";
import { signToken } from "../../db/utils/jwt.js";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, age, role } = req.body;

  const user = await authService.createUser({
    name,
    email,
    password,
    age,
    role,
  });
  if (!user) {
    sendResponse(res, { message: "Failed to create User" }, 400);
    return;
  }

  sendResponse(
    res,
    { message: "User Created Successfully!!", data: user },
    200,
  );
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.validateUser(email, password);

    if (!user) {
      return sendResponse(
        res,
        { message: "Invalid Email or Password" },
        401
      );
    }

    const { accessToken, refreshToken } = signToken(user);

    return sendResponse(res, {
      message: "User Login Successful!!",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};
