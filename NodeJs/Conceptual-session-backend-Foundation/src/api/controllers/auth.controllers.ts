import type { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { sendResponse } from "../../db/utils/sendResponse.js";

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
  // user validate, sign token
  const { email, password } = req.body;
  const user = await authService.validateUser(email, password);
  if (!user) {
    sendResponse(res, { message: "Invalid Email or Password" }, 401);
    return;
  }
  //if this is true, user is in out database
};
