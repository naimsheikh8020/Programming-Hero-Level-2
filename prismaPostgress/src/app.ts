import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/index"
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.routes";

const app:Application = express();
app.use(cors({
  origin: config.app_url,
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get("/", async (req:Request, res:Response)=>{
  const user = await prisma.user.findMany();
  console.log(user);
  res.send("Hello World naim");
})

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

export default app;