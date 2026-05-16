import { type Request, type Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";



const creatUser = async (req: Request, res: Response) => {
  // const { name, email, password, age } = req.body;
  try {
    const result = await userService.creatUserIntoDB(req.body);

    res.status(201).json({
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSigleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSigleUserFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Get Singel User",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await userService.upddatUserFromDB(id as string, req.body);

    if (data.checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: data.result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await userService.deleteUserFromDB(id as string);
    if(data.checkUser.rows.length === 0){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    
    }
     res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const userController = {
  creatUser,
  getAllUser,
  getSigleUser,
  updateUser,
  deleteUser
};
