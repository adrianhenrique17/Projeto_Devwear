import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import camisasRoutes from "./routes/camisasRoutes";
import loginRoutes from "./routes/loginRoutes";
import contactRoutes from "../src/routes/contactRoutes";

const app = express();
const port = 3000;

app.use(express.json()); //middlware
app.use(userRoutes);
app.use(camisasRoutes);
app.use(loginRoutes);
app.use(contactRoutes);

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
