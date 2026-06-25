import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { error } from "console";

dotenv.config();


async function startServer() {

  await connectDB();
    const server = http.createServer(app);
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});