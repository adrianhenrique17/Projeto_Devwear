import "./TelaPrincipal.css";
import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import BarraInferior from "../../components/Footer/BarraInferior";

const TelaPrincipal = () => {
  return (
    <div className="tela-principal">
      <NavBar />
      <div className="conteudo">
        <p>Devwear</p>
      </div>
      <BarraInferior />
    </div>
  );
};

export default TelaPrincipal;
