import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./FormularioEntrega.css";
import Navbar from "../../components/Navbar/NavBar";

const FormularioEntrega = () => {
  const navigate = useNavigate();
  const [formaPagamento, setFormaPagamento] = useState("");

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault();
    // Você pode salvar a formaPagamento no contexto, localStorage, ou enviar para o backend
    navigate("/ObrigadoPelaCompra");
  };

  return (
    <div className="form-container">
      <Navbar />
      <h2 className="form-title">Complete seu pedido</h2>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="section-header">
            <span className="icon">📍</span>
            <div>
              <h3>Endereço de Entrega</h3>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </div>

          <div className="inputs-container">
            <input type="text" placeholder="CEP" />
            <input type="text" placeholder="Rua" />
            <div className="input-row">
              <input type="text" placeholder="Número" />
              <input type="text" placeholder="Complemento (Opcional)" />
            </div>
            <div className="input-row">
              <input type="text" placeholder="Bairro" />
              <input type="text" placeholder="Cidade" />
              <input type="text" placeholder="UF" className="uf" />
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="section-header">
            <span className="icon">💰</span>
            <div>
              <h3>Pagamento</h3>
              <p>
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>

          <div className="payment-options">
            <button
              type="button"
              className={`payment-option ${
                formaPagamento === "credito" ? "selected" : ""
              }`}
              onClick={() => setFormaPagamento("credito")}
            >
              💳 CARTÃO DE CRÉDITO
            </button>
            <button
              type="button"
              className={`payment-option ${
                formaPagamento === "debito" ? "selected" : ""
              }`}
              onClick={() => setFormaPagamento("debito")}
            >
              🏦 CARTÃO DE DÉBITO
            </button>
            <button
              type="button"
              className={`payment-option ${
                formaPagamento === "dinheiro" ? "selected" : ""
              }`}
              onClick={() => setFormaPagamento("dinheiro")}
            >
              💵 DINHEIRO
            </button>
          </div>
        </section>

        <button type="submit" className="btn-finalizar">
          FINALIZAR
        </button>
      </form>
    </div>
  );
};

export default FormularioEntrega;
