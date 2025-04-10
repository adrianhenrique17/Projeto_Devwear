import "./TelaPrincipal.css";
import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import BarraInferior from "../../components/Footer/BarraInferior";
import ProductCard from "../../components/ProductCard/ProductCard";
import Autoplay from "../../components/Autoplay/Autoplay";

//import de camisas
import camisaBD from "../../assets/Camisas/CamisaBD.png";
import camisaBios from "../../assets/Camisas/CamisaBios.png";
import camisaCommit from "../../assets/Camisas/CamisaCommit.png";
import camisaComputaria from "../../assets/Camisas/CamisaComputaria.png";
import camisaUpdate from "../../assets/Camisas/CamisaUpdate.png";
import camisaVariaveis from "../../assets/Camisas/CamisaVariaveis.png";

const TelaPrincipal = () => {
  return (
    <div>
      <Autoplay />
      <h1 className="text-superior">Bem-Vindos a DevWear</h1>
      <h2 className="text-superior2">Melhores camisetas para os Devs</h2>
      <NavBar />
      <div className="Superior-Itens">
        <ProductCard
          id={"1"}
          image={camisaBD}
          title="Camisa Devwear Banco de dados"
          description="Camisa nova da coleção."
          price="R$ 50,00"
        />
        <ProductCard
          id={"2"}
          image={camisaBios}
          title="Camisa Devwear Bios"
          description="Camisa Original DevWear."
          price="R$60,00"
        />
        <ProductCard
          id={"3"}
          image={camisaComputaria}
          title="Camisa Devwear Commit"
          description="Camisa nova da coleção."
          price="R$90,00"
        />
      </div>

      <div className="Inferior-Itens">
        <ProductCard
          id={"4"}
          image={camisaCommit}
          title="Camisa Devwear Computaria"
          description="Camisa nova da coleção"
          price="R$70,00"
        />
        <ProductCard
          id={"5"}
          image={camisaUpdate}
          title="Camisa Devwear Update s/ where"
          description="Camisa nova da coleção"
          price="R$60,00"
        />
        <ProductCard
          id="6"
          image={camisaVariaveis}
          title="Camisa Devwear Variaveis"
          description="Camisa Original DevWear."
          price="R$60,00"
        />
      </div>

      <BarraInferior />
    </div>
  );
};

export default TelaPrincipal;
