import "./Camisas.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";
import ProductCard from "../../components/products/ProductCard";

//importando camisas
import camisaBD from "../../assets/Camisas/CamisaBD.png";
import camisaBios from "../../assets/Camisas/CamisaBios.png";
import camisaCommit from "../../assets/Camisas/CamisaCommit.png";
import camisaComputaria from "../../assets/Camisas/CamisaComputaria.png";
import camisaUpdate from "../../assets/Camisas/CamisaUpdate.png";
import camisaVariaveis from "../../assets/Camisas/CamisaVariaveis.png";

const Camisas = () => {
  return (
    <div>
      <div>
        <h1 className="text-principal">Todas as Camisetas da Loja</h1>
      </div>
      <Navbar />
      <div className="camisetas-cima">
        <ProductCard
          image={camisaBD}
          title="Camisa Devwear Banco de dados"
          description="Camisa nova da coleção."
          price="R$ 50,00"
        />
        <ProductCard
          image={camisaBios}
          title="Camisa Devwear  Problema Bios"
          description="Camisa Original DevWear."
          price="R$60,00"
        />
      </div>

      <div className="camisetas-meio">
        <ProductCard
          image={camisaComputaria}
          title="Camisa Devwear Computaria"
          description="Camisa nova da coleção"
          price="R$90,00"
        />
        <ProductCard
          image={camisaCommit}
          title="Camisa Devwear Commit"
          description="Camisa nova da coleção."
          price="R$70,00"
        />
      </div>

      <div className="camisetas-baixo">
        <ProductCard
          image={camisaUpdate}
          title="Camisa Devwear Update s/ where"
          description="Camisa nova da coleção"
          price="R$60,00"
        />
        <ProductCard
          image={camisaVariaveis}
          title="Camisa Devwear Variaveis"
          description="Camisa Original DevWear."
          price="R$60,00"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Camisas;
