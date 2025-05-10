import "./TelaPrincipal.css";
import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import BarraInferior from "../../components/Footer/BarraInferior";
import ProductCard from "../../components/products/ProductCard";

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
      <NavBar />
      <div className="Superior-Itens">
        <ProductCard
          image={camisaBD}
          title="Awesome Product"
          description="This is an amazing product you should buy."
          price="R$ 50,00"
        />
        <ProductCard
          image={camisaBios}
          title="Awesome Product"
          description="This is an amazing product you should buy."
          price="$60,00"
        />
        <ProductCard
          image={camisaCommit}
          title="Awesome Product"
          description="This is an amazing product you should buy."
          price="$19.99"
        />
      </div>

      <div className="Inferior-Itens">
        <ProductCard
          image={camisaComputaria}
          title="Awesome Product"
          description="This is an amazing product you should buy."
          price="$19.99"
        />
        <ProductCard
          image={camisaUpdate}
          title="Awesome Product"
          description="This is an amazing product you should buy."
          price="$19.99"
        />
        <ProductCard
          image={camisaVariaveis}
          title="Awesome Product"
          description="This is an amazing product you should buy."
          price="$19.99"
        />
      </div>

      <BarraInferior />
    </div>
  );
};

export default TelaPrincipal;
