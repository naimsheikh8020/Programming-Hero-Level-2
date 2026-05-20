import express, { type Application, type Request, type Response } from "express";
import { logger } from "./middleware/logger.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";


const app : Application = express();

app.use(logger)

app.get("/", (req: Request, res:Response)=>{
  throw new Error("SERVER IS DYING")
  res.send("This is Naim Bhai")
})
app.use(globalErrorHandler)

export default app
