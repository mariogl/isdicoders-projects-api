import dotenv from "dotenv";

dotenv.config();

const env = {
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(","),
  serverPort: process.env.PORT,
  mongoDBConnection: process.env.MONGODB_CONNECTION,
  jwtSecret: process.env.JWT_SECRET,
};

export default env;
