import "./Compra.css";
import React from "react";
import CamisaDetalhes from "../../components/CamisaDetalhe/CamisaDetalhes";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";

const Compra: React.FC = () => {
  return (
    <div>
      <h1>Detalhes</h1>
      <Navbar />
      <CamisaDetalhes /> {/* Removida a prop id */}
      <Footer />
    </div>
  );
};

export default Compra;
