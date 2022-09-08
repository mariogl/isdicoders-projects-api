import connectDB from "./database";
import env from "./loadEnvironment";
import startServer from "./server/startServer";

const port = +env.serverPort || 4004;

(async () => {
  try {
    await startServer(port);
    await connectDB(env.mongoDBConnection);
  } catch {
    process.exit(1);
  }
})();
