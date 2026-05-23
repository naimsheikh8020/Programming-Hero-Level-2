import type { Request, Response } from "express";

import { loginUser, signupUser } from "../service/auth.service.js";

import handleControllerError from "../../utils/handleControllerError.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await signupUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};
