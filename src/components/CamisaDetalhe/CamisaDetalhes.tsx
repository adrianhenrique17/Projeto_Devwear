import "./CamisaDetalhes.css";
import { useParams } from "react-router-dom";
import React from "react";
import ProductSizeSelector from "../../components/ProductSelector/ProductSizeSelector"; //importando um componente em um componente rsrs
//import camisas
import camisaBD from "../../assets/Camisas/CamisaBD.png";
import camisaBios from "../../assets/Camisas/CamisaBios.png";
import camisaCommit from "../../assets/Camisas/CamisaCommit.png";
import camisaComputaria from "../../assets/Camisas/CamisaComputaria.png";
import camisaUpdate from "../../assets/Camisas/CamisaUpdate.png";
import camisaVariaveis from "../../assets/Camisas/CamisaVariaveis.png";

const camisas = [
  {
    id: "1",
    foto: camisaBD,
    nome: "Camisa Banco de Dados",
    preco: 99.99,
    descricao:
      "Camisa Estilosa feita para você DEV T-shirt masculina.\nesta peça foi meticulosamente desenhada para você. \n 100% Algodão, Malha penteada fio 30.1 alta qualidade \n Modelagem com caimento reto proporcional",
  },
  {
    id: "2",
    foto: camisaBios, //puxa o import e manda para a tela camisas referente ao id da camisa
    nome: "Camisa Problema de Bios",
    preco: 89.99,
    descricao: "camisa azul",
  },

  {
    id: "3",
    foto: camisaComputaria,
    nome: "Camisa Computaria",
    preco: 79.99,
    descricao: "camisa verde",
  },
];

interface CamisaDetalhesProps {
  id?: string;
}

const CamisaDetalhes: React.FC<CamisaDetalhesProps> = ({ id }) => {
  const { id: urlId } = useParams(); //captura io id da url
  const camisa = camisas.find((e) => e.id === (id || urlId)); //busca por id

  if (!camisa) {
    return <h2>Camisa não encontrada!</h2>;
  }

  return (
    <div className="camisa-detalhes-container">
      <img src={camisa.foto} alt={camisa.nome} className="camisa-imagem" />
      <h1>{camisa.nome}</h1>
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
