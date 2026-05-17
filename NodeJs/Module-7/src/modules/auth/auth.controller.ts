import type { Request, Response } from "express"
import { authSerivce } from "./auth.service"

const loginUser = async(req: Request, res:Response)=>{
  try {
    const result = await authSerivce.loginUserIntoDB(req.body)
    res.status(200).json({
      success: true,
      message: "User Retrived Successfully!",
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error : error
    })
  }
}

export const authController ={
  loginUser
}