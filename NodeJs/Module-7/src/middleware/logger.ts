import { type NextFunction, type Request, type Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {

  const time = new Date().toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`Method -> ${req.method} | URL -> ${req.url} | Time -> ${time}`);

  const log = `Method -> ${req.method} | URL -> ${req.url} | Time -> ${time}\n`;

  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.log("Logger Error:", err);
    }
  });

  next();
};

export default logger;