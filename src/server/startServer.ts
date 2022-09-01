import "../loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import app from ".";
import CustomError from "../utils/CustomError";

const debug = Debug("isdicoders-projects:server:startServer");

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening on http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error: CustomError) => {
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
