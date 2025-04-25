import React, { useState, useEffect } from "react";
import "./ProductSizeSelector.css";

interface Props {
  onChange: (size: string, quantity: number) => void;
}

const ProductSizeSelector: React.FC<Props> = ({ onChange }) => {
  const [selectedSize, setSelectedSize] = useState<string>("P");
  const [quantity, setQuantity] = useState<number>(1);
  const sizes = ["P", "M", "G", "GG"];

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    onChange(selectedSize, quantity);
  }, [selectedSize, quantity, onChange]);

  return (
    <div>
      <p>Guia de medidas</p>
      <h4 className="tamanho-select-text">Tamanho: {selectedSize}</h4>
      <div>
        {sizes.map((size) => (
          <button
            className="btn-selector"
            key={size}
            onClick={() => handleSizeChange(size)}
            style={{
              backgroundColor: size === selectedSize ? "blue" : "lightgray",
              textAlign: "center",
            }}
          >
            {size}
          </button>
        ))}
      </div>
      <p className="quantidade-text">Quantidade desejada</p>
      <div className="quantidade-btn">
        <button onClick={decrementQuantity} className="decrement-button">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={incrementQuantity} className="increment-buttom">
          +
        </button>
      </div>
    </div>
  );
};

export default ProductSizeSelector;
