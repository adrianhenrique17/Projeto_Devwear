import React from "react";
import "./ProductCard.css";

// definindo as props do card
interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

//desestruração
const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h2 className="product-title">{title}</h2>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>
      <div className="button-container">
        {" "}
        {/* vai agrupar os botões*/}
        <button className="product-button">Compre</button>
        <button className="product-button">carrinho</button>
      </div>
    </div>
  );
};

export default ProductCard;
