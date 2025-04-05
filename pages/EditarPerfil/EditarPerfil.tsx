import "./EditarPerfil.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";

const EditarPerfil = () => {
  return (
    <div>
      <Navbar />
      <h1 className="editar-perfil-text">Editar Perfil</h1>
      <div className="container-editar">
        <h1>Nome do Usuário - </h1>
        <h1>E-mail - </h1>
        <h1>
          CPF:
          <input className="cpf-input" type="text" placeholder="CPF" />
        </h1>
        <h1>
          Senha:{" "}
          <input className="senha-input" type="text" placeholder="Senha" />
        </h1>
        <h1>
          Confirmar Senha:{" "}
          <input
            className="senha-input"
            type="text"
            placeholder=" Confirmar Senha"
          />
          <button className="btn-editar">Atualizar</button>
        </h1>
      </div>

      <Footer />
    </div>
  );
};

export default EditarPerfil;
