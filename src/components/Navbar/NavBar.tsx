import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo120x120.png";
import { VscAccount } from "react-icons/vsc";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
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
        <div className={styles.rightIcons}>
          <li>
            <a href="#">
              <VscAccount />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
