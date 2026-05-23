import type { Response } from "express";

import type {
  TCustomError,
} from "../types/issue.type.js";

const handleControllerError = (
  error: unknown,
  res: Response,
) => {

  const err =
    error as TCustomError;

  res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });

};

export default handleControllerError;