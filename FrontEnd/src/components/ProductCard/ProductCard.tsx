import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router";

// definindo as props do card
interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

//desestruração
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  description,
  price,
}) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h2 className="product-title">{title}</h2>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>
      <div className="button-container">
        {/* vai agrupar os botões*/}
        <button
          className="product-button"
          onClick={() => navigate(`/compra/${id}`)}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
