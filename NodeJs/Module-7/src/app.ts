import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {  pool } from "./db";
import { UserRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());



app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api/users',UserRoute);
app.use('/api/profile',profileRoute)
app.use('/api/auth', authRoute)


export default app