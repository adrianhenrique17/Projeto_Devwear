import React from "react";
import "./BarraInferior.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Adrian & Eduardo. Todos os direitos
          reservados.
        </p>
        <div className="links">
          <a href="/https://policies.google.com/privacy?hl=pt-BR">
            Política de Privacidade
          </a>
          <a href="#">Termos de Serviço</a>
          <a href="#">Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
