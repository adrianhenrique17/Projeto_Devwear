import React from "react";
import "./BarraInferior.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} DevWear. Todos os direitos
          reservados.
        </p>
        <div className="links">
          <a href="/https://policies.google.com/privacy?hl=pt-BR">
            Política de Privacidade
          </a>
          <a href="https://www.react.ind.br/pol%C3%ADtica-de-privacidade#:~:text=N%C3%A3o%20compartilhamos%20suas%20informa%C3%A7%C3%B5es%20pessoais,os%20servi%C3%A7os%20solicitados%20por%20voc%C3%AA.&text=Nosso%20site%20pode%20usar%20cookies,melhorar%20a%20experi%C3%AAncia%20do%20usu%C3%A1rio.">
            Termos de Serviço
          </a>
          <a href="https://github.com/adrianhenrique17">Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
