import { useCart } from "../../contexts/CartContext";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";
import { useNavigate } from "react-router-dom";
import "./Carrinho.css";

const Carrinho = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.precoUnit * item.quantidade,
    0
  );
  const frete = 5.5;
  const total = totalItems + frete;

  const finalizarCompra = () => {
    clearCart();
    navigate("/FormularioEntrega");
  };

  return (
    <div className="container-carrinho">
      <Navbar />

      <main className="carrinho-conteudo">
        <h2 className="carrinho-titulo">Camisas selecionadas</h2>

        <div className="carrinho-box">
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul className="carrinho-lista">
                {cart.map((item) => (
                  <li
                    key={`${item.id}-${item.tamanho}`}
                    className="carrinho-item"
                  >
                    <img
                      src={item.imagem_url}
                      alt={item.nome}
                      className="item-imagem"
                    />
                    <div className="item-info">
                      <p className="item-nome">{item.nome}</p>
                      <p className="item-tamanho">Tamanho: {item.tamanho}</p>

                      <div className="quantidade-controle">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id, item.tamanho)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(item.id, item.tamanho)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn-remover"
                        onClick={() => removeFromCart(item.id, item.tamanho)}
                      >
                        REMOVER
                      </button>
                    </div>
                    <div className="item-preco">
                      R${(item.precoUnit * item.quantidade).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="carrinho-resumo">
                <div className="resumo-linha">
                  <span>Total de itens</span>
                  <span>R${totalItems.toFixed(2)}</span>
                </div>
                <div className="resumo-linha">
                  <span>Entrega</span>
                  <span>R${frete.toFixed(2)}</span>
                </div>
                <div className="resumo-total">
                  <strong>Total</strong>
                  <strong>R${total.toFixed(2)}</strong>
                </div>
              </div>

              <button className="btn-confirmar" onClick={finalizarCompra}>
                CONFIRMAR PEDIDO
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Carrinho;
