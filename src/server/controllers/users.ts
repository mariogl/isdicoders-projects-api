import { Request, Response } from "express";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    username,
    password: hashedPassword,
  };

  res.status(201).json({ message: `Created ${name}` });
};

export default registerUser;
