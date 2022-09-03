import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import CustomError from "../../utils/CustomError";

const registerUser = async (
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

export default registerUser;
