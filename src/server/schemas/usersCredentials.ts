import { Joi } from "express-validation";
import userDataConstants from "../../utils/userDataConstants";

export const registerUserCredentials = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(userDataConstants.username.min).required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          `^[a-zA-Z0-9]{${userDataConstants.password.min},${userDataConstants.password.max}}$`
        )
      )
      .required(),
    repeatedPassword: Joi.string().valid(Joi.ref("password")),
    email: Joi.string().email().required(),
  }),
};

export const loginUserCredentials = {
  body: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
};
