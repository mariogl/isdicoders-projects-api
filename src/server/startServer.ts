import "../loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import ErrorWithCode from "../types/errors";
import app from ".";

const debug = Debug("isdicoders-projects:server:startServer");

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening on http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error: ErrorWithCode) => {
      debug(chalk.red("Error setting up the server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} in use`));
      } else {
        debug(chalk.red(error.message));
      }
      reject();
    });
  });

export default startServer;
