import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo120x120.png";
import ButtonDrop from "../MenuSupenso/MenuSuspenso";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={Logo}
          alt="logo"
          onClick={() => (window.location.href = "/TelaPrincipal")}
        />
        {/* função para clicar logo e ir home*/}
      </div>

      <ul className={styles.navLinks}>
        <li>
          <a href="#">Pagina Inicial</a>
        </li>
        <li>
          <a href="#">Camisetas</a>
        </li>
        <li>
          <a href="#">Sobre</a>
        </li>
        <li>
          <a href="#">Contato</a>
        </li>
      </ul>
      <div className={styles.rightIcons}>
        <ButtonDrop />
      </div>
    </nav>
  );
};

export default Navbar;
