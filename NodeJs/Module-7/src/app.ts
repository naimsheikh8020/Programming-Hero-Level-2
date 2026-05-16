import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {  pool } from "./db";
import { UserRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());



app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World")
  res.status(200).json({
    message: "express Server",
    author: "Naim",
  });
});

app.use('/api/users',UserRoute)




app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    

   

    

   

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


export default app