import express, { type Application, type Request, type Response } from "express";

import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import router from "./api/routes/index.js";
const app: Application = express();

app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "DevPulse API Running Successfully",
  });
});


app.use(notFound);

app.use(globalErrorHandler);

export default app;