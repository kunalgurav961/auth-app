import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.port,
  MONGODB_URI: process.env.MONGODB_URI,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};

export default config;
