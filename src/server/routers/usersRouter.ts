import express from "express";
import { validate } from "express-validation";
import { getUsers, loginUser, registerUser } from "../controllers/users";
import paths from "../paths";
import {
  loginUserCredentials,
  registerUserCredentials,
} from "../schemas/usersCredentials";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post(
  paths.users.registerUser,
  validate(registerUserCredentials, {}, { abortEarly: false }),
  registerUser
);

usersRouter.post(
  paths.users.loginUser,
  validate(loginUserCredentials, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
