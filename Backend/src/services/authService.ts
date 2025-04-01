import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

const usersDb = [
  {
    id: 1,
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10), 
  },
];

export const authenticateUser = async (email: string, password: string) => {
  const user = usersDb.find((u) => u.email === email);
  
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: "1h",
  });

  return token;
};
