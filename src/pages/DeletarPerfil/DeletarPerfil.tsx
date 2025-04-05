import "./DeletarPerfil.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";
import logo from "../../assets/DevWerarLogo150x150.jpg";

const DeletarPerfil = () => {
  return (
    <div>
      <Navbar />
      {/*<img src={logo} />*/}
      <h1>Deletar Perfil </h1>
      <h1>Nome do Usuário: </h1>
      <h2>E-mail: </h2>
      <button>Deletar</button>
      <Footer />
    </div>
  );
};

export default DeletarPerfil;
