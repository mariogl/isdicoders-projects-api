import { Joi } from "express-validation";

const registerUserCredentials = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(5).required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .required(),
    repeatedPassword: Joi.string().valid(Joi.ref("password")),
    email: Joi.string().email().required(),
  }),
};

export default registerUserCredentials;
