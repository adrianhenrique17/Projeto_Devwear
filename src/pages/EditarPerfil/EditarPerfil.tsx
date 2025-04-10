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
    if (!cpf || !nome || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

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

      alert("Perfil atualizado com sucesso!");
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
        <p className="cpf-validation">
          CPF para validação - coloque xxx.xxx.xxx-xx
        </p>
        {/* CPF não é alterado no back-end, mas precisa ser enviado */}
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>

          <input
            id="cpf"
            className="form-input"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF (não será alterado)"
            maxLength={14}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nome">Nome do Usuário:</label>
          <input
            id="nome"
            className="form-input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome de usuário"
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            className="form-input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            id="confirmarSenha"
            className="form-input"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirmar Senha"
          />
        </div>

        <button className="btn-editar" onClick={handleUpdate}>
          Atualizar
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditarPerfil;
