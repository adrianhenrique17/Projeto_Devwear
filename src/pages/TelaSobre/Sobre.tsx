import "./Sobre.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";

import adrian from "../../assets/Fundadores/Adrian.png";

const Sobre = () => {
  return (
    <div>
      <Navbar />
      <h1 className="sobre-text">Quem é a DevWear?</h1>
      <h3 className="descricao-text">
        A DevWear é uma marca independente que oferece roupas <br /> para devs
        de alta qualidade, ideais para profissionais de tecnologia. <br />
        Com uma ampla variedade de Roupas, é a escolha perfeita para mostrar
        suas preferencias, <br /> e para se identificar como um verdadeiro DEV.
        <br />
        Iniciamos esta ideia para mostrar que o pessoal da area de T.I também
        podem ser estilosos.
      </h3>
      <h1 className="descricao-meio-text">Como é adquirido os produtos?</h1>
      <h3 className="descicao-resposta-text">
        Os produtos são comprados de fornecedores externos, de extrema
        qualidade. Os produtos são <br />
        selecionado pelos proprios devs para ser escolhidos as peças mais
        estilosas e que condizem com o mercado de tecnologia atual.
        <br /> Compramos, estocamos e revendemos a vocês.
      </h3>

      <h1 className="Fundadores-text">Fundadores</h1>

      <div className="fundadores">
        <img src={adrian} alt="adrian" className="fundador-adrian" />
      </div>
      <Footer />
    </div>
  );
};

export default Sobre;
