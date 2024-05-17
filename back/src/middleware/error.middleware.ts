import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${error.message}`);

  if (error instanceof QueryFailedError) {
    return res.status(500).json({
      message: error.message,
      query: error.query,
      parameters: error.parameters,
      driverError: error.driverError,
    });
  }

  return res.status(500).json({ message: "Internal server error" });
};
