import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo120x120.png";
import ButtonDrop from "../MenuSupenso/MenuSuspenso";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "../../contexts/CartContext"; // import do contexto

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" onClick={() => navigate("/TelaPrincipal")} />
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/TelaPrincipal">Página Inicial</Link>
        </li>
        <li>
          <Link to="/camisas">Camisetas</Link>
        </li>
        <li>
          <Link to="/Sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/Contato">Contato</Link>
        </li>
      </ul>

      <div className={styles.rightIcons}>
        <button
          className="cart-button"
          onClick={() => navigate("/carrinho")}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: "-1px",
          }}
        >
          <i
            className="bi bi-cart"
            style={{ fontSize: "1.5rem", color: "white" }}
          ></i>
          {/* Adicionando o contador de itens */}
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
        <ButtonDrop />
      </div>
    </nav>
  );
};

export default Navbar;
