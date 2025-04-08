import { useState, useEffect } from "react";
import "./EditarPerfil.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";
import api from "../../api/api";

const EditarPerfil = () => {
  // Pegamos o ID do localStorage
  const userId = localStorage.getItem("userId");

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [cpf, setCpf] = useState("");

  useEffect(() => {
    if (userId) {
      api
        .get(`/api/users/${userId}`)
        .then((res) => {
          const user = res.data.user;
          setNome(user.name);
          setCpf(user.cpf);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados:", err);
        });
    }
  }, [userId]);

  const handleUpdate = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await api.put(`/api/users/${userId}`, {
        name: nome,
        password: senha,
        cpf: cpf,
      });

      alert("Perfil atualizado com sucesso (nome e senha)!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="editar-perfil-text">Editar Perfil</h1>
      <div className="container-editar">
        <h1>
          <p className="cpf-validation">
            CPF para validação - coloque xxx.xxx.xxx-xx
          </p>
          CPF:
          {/* CPF não é alterado no back-end, mas precisa ser enviado */}
          <input
            className="cpf-input"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF (não alterado)"
            maxLength={14}
          />
        </h1>

        <h1>
          Nome do Usuário
          <input
            className="name-cpf-input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome de usuário"
          />
        </h1>

        <h1>
          Senha:
          <input
            className="senha-input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />
        </h1>

        <h1>
          Confirmar Senha:
          <input
            className="senha-input"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirmar Senha"
          />
          <button className="btn-editar" onClick={handleUpdate}>
            Atualizar
          </button>
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default EditarPerfil;
