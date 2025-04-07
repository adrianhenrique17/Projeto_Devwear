import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import camisasRoutes from "./routes/camisasRoutes";
import loginRoutes from "./routes/loginRoutes";
import contactRoutes from "./routes/contactRoutes";
import "dotenv/config";

//server

const app = express();
const cors = require("cors");
const port = 3000;

/* o cors não deixa o navegador bloquear o front de acessar o back, 
ai vc fala qual dominio ta tentando acessar e ele permite */

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); //middlware
app.use("/api", userRoutes);
app.use("/api", camisasRoutes);
app.use("/api", loginRoutes);
app.use("/api", contactRoutes);

// sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("Moio a parada", error);
  });

app.listen(port, () => {
  console.log("Server running on port", port);
});
export default app;
