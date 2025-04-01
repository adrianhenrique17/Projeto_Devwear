import express from "express"
import sequelize from "./config/database";
import registroRoutes from "./routes/registroRoutes"
import camisetasRoutes from "./routes/camisetasRoutes";
import authRoutes from "./routes/authRoutes";


const app = express();

const port = 3000;

app.get("/",(req,res) => {
    res.send("Hello World!");
})

app.use(express.json());

app.use(registroRoutes)

app.use(camisetasRoutes)

sequelize.sync({alter: true}).then(() => {console.log ("O database foi sincronizado com sucesso")}). catch ((error)=> {console.log ("deu ruim")})

app.listen(port, () => {console.log ("Servidor rodando na porta 3000 ",port)});

