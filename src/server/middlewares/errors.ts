import "../../loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
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
  let message = error.publicMessage ?? "Server error";

  if (error instanceof ValidationError) {
    error.details.body.forEach((errorDetail) => {
      debug(chalk.red(errorDetail.message));
      message = "Wrong data received";
    });
  }

  debug(chalk.red(error.message));

  res.status(status).json({ error: message });
};
