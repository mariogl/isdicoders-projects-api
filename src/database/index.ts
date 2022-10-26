import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = Debug("isdicoders-projects:db:connection");

const connectDB = (mongoURL: string) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        const newRet: any = { ...ret };
        // eslint-disable-next-line no-underscore-dangle
        delete newRet._id;
        // eslint-disable-next-line no-underscore-dangle
        delete newRet.__v;

        return newRet;
      },
    });
    mongoose.connect(mongoURL, (error) => {
      if (error) {
        debug(chalk.red("Error connecting to database"));
        reject(error);
        return;
      }

      debug(chalk.green("Connected to database"));
      resolve(true);
    });
  });

export default connectDB;
