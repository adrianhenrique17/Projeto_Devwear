import express from "express"
import sequelize from "./config/database";
import registroRoutes from "./routes/registroRoutes"
const app = express();

const port = 3000;

app.get("/",(req,res) => {
    res.send("Hello World!");
})

app.use(express.json());

app.use(registroRoutes)

sequelize.sync({alter: true}).then(() => {console.log ("O database foi sincronizado com sucesso")}). catch ((error)=> {console.log ("deu ruim")})

app.listen(port, () => {console.log ("Servidor rodando na porta 3000 ",port)});

