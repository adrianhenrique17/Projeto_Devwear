import dotenv from "dotenv";

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  port: process.env.PORT || 3000,
};
