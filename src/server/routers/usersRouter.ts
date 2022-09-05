import express from "express";
import { validate } from "express-validation";
import { registerUser } from "../controllers/users";
import paths from "../paths";
import registerUserCredentials from "../schemas/usersCredentials";

const usersRouter = express.Router();

usersRouter.post(
  paths.registerUser,
  validate(registerUserCredentials, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
