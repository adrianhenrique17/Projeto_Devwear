import "./CamisaDetalhes.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ProductSizeSelector from "../../components/ProductSelector/ProductSizeSelector";
import notfound from "../../assets/NOTFOUND/post_thumbnail-77d8f2a95f2f41b5863f3fba5a261d7e.jpeg";
import { useCart } from "../../contexts/CartContext";

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
  imagem_url: string;
}

const CamisaDetalhes: React.FC = () => {
  const { id } = useParams();
  const [camisa, setCamisa] = useState<Camisa | null>(null);
  const [erro, setErro] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("P");
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCamisa = async () => {
      try {
        const response = await api.get(`/api/camisas/${id}`);
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

  const handleComprar = () => {
    if (!camisa) return;

    addToCart({
      id: camisa.id,
      nome: camisa.nome,
      precoUnit: camisa.preco,
      imagem_url: camisa.imagem_url,
      tamanho: selectedSize,
      quantidade: quantity,
    });

    navigate("/carrinho");
  };

  const handleAdicionarAoCarrinho = () => {
    if (!camisa) return;

    addToCart({
      id: camisa.id,
      nome: camisa.nome,
      precoUnit: camisa.preco,
      imagem_url: camisa.imagem_url,
      tamanho: selectedSize,
      quantidade: quantity,
    });

    alert("Produto adicionado ao carrinho!");
  };

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
        <h3 className="preço">R${camisa.preco},00</h3>
        <p className="descricao-compra-text">{camisa.descricao}</p>
        <div className="ProductSelector">
          <ProductSizeSelector
            onChange={(size, qty) => {
              setSelectedSize(size);
              setQuantity(qty);
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button onClick={handleComprar}>Comprar</button>
          <button onClick={handleAdicionarAoCarrinho}>
            🛒 Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default CamisaDetalhes;
