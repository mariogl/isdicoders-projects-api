import express from "express";
import { generalError, notFoundError } from "./controllers/errors";

const app = express();

app.use(notFoundError);
app.use(generalError);

export default app;
