import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "segredo_bem_secreto";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (user: UserModel): string => {
  const { id, email } = user;
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
