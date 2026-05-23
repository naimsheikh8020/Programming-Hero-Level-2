import express from "express";
import authRoutes from "./auth.route.js";
import issueRoutes from "./issue.route.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/issues", issueRoutes);

export default router;