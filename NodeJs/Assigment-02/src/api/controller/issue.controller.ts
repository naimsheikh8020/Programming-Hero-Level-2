import type { Request, Response } from "express";

import {
  createIssueService,
  deleteIssueService,
  getAllIssuesService,
  getSingleIssueService,
  updateIssueService,
} from "../service/issue.service.js";

import handleControllerError from "../../utils/handleControllerError.js";

export const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await createIssueService(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};

export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await getAllIssuesService(req.query);

    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result,
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};

export const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await getSingleIssueService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const result = await updateIssueService(req.params.id as string, req.body, req.user);

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    await deleteIssueService(req.params.id as string, req.user);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: unknown) {
    handleControllerError(error, res);
  }
};
