import connectDB from "./database";
import startServer from "./server/startServer";

const port = +process.env.PORT || 4004;

(async () => {
  try {
    await startServer(port);
    await connectDB(process.env.MONGODB_CONNECTION);
  } catch {
    process.exit(1);
  }
})();
