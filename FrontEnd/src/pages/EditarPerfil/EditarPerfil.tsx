import { useState, useEffect } from "react";
import "./EditarPerfil.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";
import api from "../../api/api";

type ErrorFields = {
  cpf?: string;
  nome?: string;
  senha?: string;
  confirmarSenha?: string;
  api?: string;
};

const EditarPerfil = () => {
  const userId = localStorage.getItem("userId");

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");

  const [errors, setErrors] = useState<ErrorFields>({});

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
    const newErrors: ErrorFields = {};

    if (!cpf) newErrors.cpf = "CPF é obrigatório.";
    if (!nome) newErrors.nome = "Nome é obrigatório.";
    if (!senha) newErrors.senha = "Senha é obrigatória.";
    if (!confirmarSenha) newErrors.confirmarSenha = "Confirme a senha.";
    if (senha && confirmarSenha && senha !== confirmarSenha)
      newErrors.confirmarSenha = "As senhas não coincidem.";

    const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (senha && !senhaValida.test(senha)) {
      newErrors.senha =
        "A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await api.put(`/api/users/${userId}`, {
        name: nome,
        password: senha,
        cpf: cpf,
      });

      alert("Perfil atualizado com sucesso!");
      setErrors({});
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);

      const responseMessage = error?.response?.data?.message;

      if (
        responseMessage?.toLowerCase().includes("cpf") ||
        responseMessage?.toLowerCase().includes("não encontrado")
      ) {
      } else {
        setErrors({
          cpf: "CPF não corresponde ao seu usuário.",
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="editar-perfil-text">Editar Perfil</h1>
      <div className="container-editar">
        <div className="form-group">
          <label htmlFor="cpf">
            CPF <span className="cpf-note">(usado apenas para validação)</span>:
          </label>
          <input
            id="cpf"
            className="form-input cpf-input"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF para confirmar a edição"
            maxLength={14}
          />
          <p className="cpf-aviso">
            Este campo é obrigatório para validar a alteração do nome e senha. O
            CPF <strong>não será alterado</strong>.
          </p>
          {errors.cpf && <p className="error-msg">{errors.cpf}</p>}
        </div>

        <hr className="form-divider" />

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
          {errors.nome && <p className="error-msg">{errors.nome}</p>}
        </div>

        <hr className="form-divider" />

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
          {errors.senha && <p className="error-msg">{errors.senha}</p>}
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
          {errors.confirmarSenha && (
            <p className="error-msg">{errors.confirmarSenha}</p>
          )}
        </div>

        {errors.api && <p className="error-msg geral">{errors.api}</p>}

        <button className="btn-editar" onClick={handleUpdate}>
          Atualizar
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditarPerfil;
