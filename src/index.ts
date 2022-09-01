import startServer from "./server/startServer";

const port = +process.env.PORT || 4004;

(async () => {
  try {
    await startServer(port);
  } catch {
    process.exit(1);
  }
})();
