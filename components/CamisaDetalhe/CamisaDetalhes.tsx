import "./CamisaDetalhes.css";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import ProductSizeSelector from "../../components/ProductSelector/ProductSizeSelector"; //importando um componente em um componente rsrs
//import camisas
import camisaBD from "../../assets/Camisas/CamisaBD.png";
import camisaBios from "../../assets/Camisas/CamisaBios.png";
import camisaCommit from "../../assets/Camisas/CamisaCommit.png";
import camisaComputaria from "../../assets/Camisas/CamisaComputaria.png";
import camisaUpdate from "../../assets/Camisas/CamisaUpdate.png";
import camisaVariaveis from "../../assets/Camisas/CamisaVariaveis.png";

//NOTFOUND
import notfound from "../../assets/NOTFOUND/post_thumbnail-77d8f2a95f2f41b5863f3fba5a261d7e.jpeg";

// funçãozinha pog para sempre que abrir os detalhes ele jogar a tela para cima
const ScrollToTop: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; // Esse componente não renderiza nada
};

const camisas = [
  {
    id: "1",
    foto: camisaBD,
    nome: "Camisa Banco de Dados",
    preco: 50.0,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },
  {
    id: "2",
    foto: camisaBios, //puxa o import e manda para a tela camisas referente ao id da camisa
    nome: "Camisa Problema de Bios",
    preco: 60.0,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },

  {
    id: "3",
    foto: camisaCommit,
    nome: "Camisa Commit",
    preco: 70.0,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },

  {
    id: "4",
    foto: camisaComputaria,
    nome: "Camisa Computaria",
    preco: 90.0,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },

  {
    id: "5",
    foto: camisaUpdate,
    nome: "Camisa Update s/ where",
    preco: 60.0,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },

  {
    id: "6",
    foto: camisaVariaveis,
    nome: "Camisa Variaveis",
    preco: 60.0,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },
];

interface CamisaDetalhesProps {
  id?: string;
}

const CamisaDetalhes: React.FC<CamisaDetalhesProps> = ({ id }) => {
  const { id: urlId } = useParams(); //captura io id da url
  const camisa = camisas.find((e) => e.id === (id || urlId)); //busca por id

  if (!camisa) {
    return <img src={notfound} className="img-notfound" />;
  }

  return (
    <div className="camisa-detalhes-container">
      <ScrollToTop />
      <img src={camisa.foto} alt={camisa.nome} className="camisa-imagem" />
      <h1 className="nome-camisa">{camisa.nome}</h1>
      <p className="caminho-text">/TelaPrincipal/camisetas/{id}</p>
      <p className="descricao-compra-text">{camisa.descricao}</p>
      <div className="ProductSelector">
        <ProductSizeSelector />
      </div>
      <p>Preço: R$ {camisa.preco.toFixed(2)}</p>
      <button>Comprar</button>
    </div>
  );
};

export default CamisaDetalhes;
