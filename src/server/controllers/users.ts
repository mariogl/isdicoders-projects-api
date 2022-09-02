import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  res.status(201).json({ message: `Created ${name}` });
};

export default registerUser;
