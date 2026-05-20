import express, { type Application, type Request, type Response } from "express";
import { logger } from "./middleware/logger.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import authRoutes from "./api/routes/auth.route.js"

const app : Application = express();

app.use(logger)
app.use(express.json())

app.get("/", (req: Request, res:Response)=>{
  res.send("This is Naim Bhai")
})

app.use("/auth", authRoutes)
app.use(globalErrorHandler)

export default app
