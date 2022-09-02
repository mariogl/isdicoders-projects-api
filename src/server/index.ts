import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors";
import paths from "./paths";
import usersRouter from "./routers/usersRouter";

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());

app.use(paths.users, usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
