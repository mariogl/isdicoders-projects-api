import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { generalError, notFoundError } from "./middlewares/errors";
import paths from "./paths";
import usersRouter from "./routers/usersRouter";
import env from "../loadEnvironment";
import CustomError from "../utils/CustomError";

const app = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin || env.allowedOrigins.includes(requestOrigin)) {
        return callback(null, true);
      }
      return callback(
        new CustomError(403, "Not allowed by CORS", "Not allowed by CORS")
      );
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(mongoSanitize());

app.use(paths.users, usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
