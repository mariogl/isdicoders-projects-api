import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import CustomError from "../../utils/CustomError";
import env from "../../loadEnvironment";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, username, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ name }, { email }] });

    if (existingUser) {
      const message = "Existing username or email";
      next(new CustomError(409, message, message));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      username,
      password: hashedPassword,
      email,
    };

    await User.create(newUser);

    res.status(201).json({ message: `Created user ${username}` });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const error = new CustomError(
        403,
        "username doesn't exist",
        "Wrong credentials"
      );

      throw error;
    }

    try {
      await bcrypt.compare(password, user.password);
    } catch {
      const error = new CustomError(403, "Wrong password", "Wrong credentials");
      throw error;
    }

    const userDataForToken = {
      id: user.id,
      name: user.name,
    };

    const token = jwt.sign(userDataForToken, env.jwtSecret, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
