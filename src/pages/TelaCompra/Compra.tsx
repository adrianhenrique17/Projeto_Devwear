import "./Compra.css";
import React from "react";
import CamisaDetalhes from "../../components/CamisaDetalhe/CamisaDetalhes";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";

const Compra: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes</h1>
      <Navbar />
      <CamisaDetalhes id={id} />
      {/* {id} fala qual id ele tem que mostrar para rend. o componente correspondente*/}
      <Footer />
    </div>
  );
};

export default Compra;
