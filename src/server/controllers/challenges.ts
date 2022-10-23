import { NextFunction, Request, Response } from "express";
import Challenge from "../../database/models/Challenge";

// eslint-disable-next-line import/prefer-default-export
export const getChallenges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challenges = await Challenge.find();

    res.json({ challenges });
  } catch (error) {
    next(error);
  }
};
