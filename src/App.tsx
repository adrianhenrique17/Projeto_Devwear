import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TelaPrincipal from "./pages/TelaPrincipal/TelaPrincipal";
import Camisas from "../src/pages/Camisas/Camisas";

//defini as rotas do nosso projeto
// o main está renderizando tudo, pois esta no topo do dom
//<Route path="/" element={<Register />} /> */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/TelaPrincipal" element={<TelaPrincipal />} />
        <Route path="/Camisas" element={<Camisas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
