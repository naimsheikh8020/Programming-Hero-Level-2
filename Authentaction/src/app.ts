import express, { type Request, type Response }  from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req: Request, res: Response)=>{
  res.status(200).json({ status: "OK" });
});

export default app;