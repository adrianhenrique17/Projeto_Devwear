import "./CamisaDetalhes.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ProductSizeSelector from "../../components/ProductSelector/ProductSizeSelector";
import notfound from "../../assets/NOTFOUND/post_thumbnail-77d8f2a95f2f41b5863f3fba5a261d7e.jpeg";

const ScrollToTop: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

interface Camisa {
  id: string;
  nome: string;
  descricao: string;
  preco: number; 
  imagem_url: string; //puxando as imagem via nuvem cloudinary
}

const CamisaDetalhes: React.FC = () => {
  const { id } = useParams();
  const [camisa, setCamisa] = useState<Camisa | null>(null);
  const [erro, setErro] = useState(false);

  //conexão com o back
  useEffect(() => {
    const fetchCamisa = async () => {
      try {
        const response = await api.get(`/api/camisas/${id}`);
        console.log("Dados da camisa:", response.data);

        
        const camisaComPrecoNumerico = {
          ...response.data,
          preco: parseFloat(response.data.preco), 
        };

        setCamisa(camisaComPrecoNumerico);
        setErro(false);
      } catch (error) {
        console.error("Erro ao buscar camisa:", error);
        setErro(true);
      }
    };

    fetchCamisa();
  }, [id]);

  if (erro) {
    return (
      <img
        src={notfound}
        className="img-notfound"
        alt="Camisa não encontrada"
      />
    );
  }

  if (!camisa) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="camisa-detalhes-container">
      <ScrollToTop />
      <img
        src={camisa.imagem_url}
        alt={camisa.nome}
        className="camisa-imagem"
      />
      <div className="camisa-info">
        <h1 className="nome-camisa">{camisa.nome}</h1>
        <p className="caminho-text">/TelaPrincipal/camisetas/{id}</p>
        <p className="descricao-compra-text">{camisa.descricao}</p>
        <div className="ProductSelector">
          <ProductSizeSelector />
        </div>
        <p className="camisa-preco">Preço: R$ {camisa.preco.toFixed(2)}</p>
        <button>Comprar</button>
      </div>
    </div>
  );
};

export default CamisaDetalhes;
