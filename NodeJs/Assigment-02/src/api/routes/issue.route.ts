import express from "express";

import auth from "../../middleware/auth.middleware.js";

import {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
} from "../controller/issue.controller.js";

const router = express.Router();

router.post("/", auth, createIssue);

router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);
router.patch("/:id", auth, updateIssue);
router.delete("/:id", auth, deleteIssue);

export default router;