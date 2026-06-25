import express from "express";
import { config } from "dotenv";
//Import movieRoutes
import movieRoutes from "./routes/movieRoutes.js";

import { connectDB, disconnectDB } from "./config/db.js";

config();
connectDB();

const app = express();
app.use("/movies", movieRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});
const server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
