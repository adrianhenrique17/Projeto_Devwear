import React, { useState } from "react";
import "./ProductSizeSelector.css";

//usando a mesma logica da aula da claudia sobre hooks para aumentar e diminuir

const ProductSizeSelector: React.FC = () => {
  const [selectedSize, setselectedSize] = useState<string>("P"); //armazena o tamanho e onde ele inicia
  const [quantity, setQuantity] = useState<number>(1); // armazena quantidade

  const sizes = ["P", "M", "G", "GG"];
  // handlesizechange atualiza o tamanho selecionado
  const handleSizeChange = (size: string) => {
    setselectedSize(size);
  };

  //incrementQuantity, não deixam -1
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div>
      <p>Guia de medidas</p>
      <h4 className="tamanho-select-text">Tamanho: {selectedSize} </h4>
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
            {" "}
            {size}{" "}
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
