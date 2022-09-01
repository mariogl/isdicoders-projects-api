import "../../loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import CustomError from "../../utils/CustomError";

const debug = Debug("isdicoders-projects:server:middlewares/errors");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = "Endpoint not found";
  const error = new CustomError(404, message, message);

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const status = error.statusCode ?? 500;
  const message = error.publicMessage ?? "Server error";

  debug(chalk.red(error.message));

  res.status(status).json({ error: message });
};
