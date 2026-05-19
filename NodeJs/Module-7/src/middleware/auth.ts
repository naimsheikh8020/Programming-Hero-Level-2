import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("This is Proteced Route");
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access!!",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `
    SELECT * FROM  users WHERE email=$1
    `,
        [decoded.email],
      );

      const user = userData.rows[0];
      console.log(user);

      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "User Not found",
        });
      }

      if (!user.is_active) {
        res.status(403).json({
          success: false,
          message: "Forbiddenn!!",
        });
      }

      req.user = decoded;

      next();
    } catch (error: any) {
      next(error)
    }
  };
};

export default auth;
