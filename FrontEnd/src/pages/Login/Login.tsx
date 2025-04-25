import { useState } from "react";
import "./Login.css";
import logo from "../../assets/devwearball.png";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const ExecuteLogin = async () => {
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });
      if (response.data.success) {
        console.log("Login bem-sucedido!");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        window.location.href = "/TelaPrincipal";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || "Erro desconhecido no login");
        } else {
          window.alert("Não foi possível conectar ao servidor");
        }
      } else {
        console.error("Erro ao fazer login:", error);
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    setError("");
    ExecuteLogin();
  };

  return (
    <div className="login-page">
      <div className="row-login">
        <div className="d-flex justify-content-center align-items-center text-center">
          <form onSubmit={handleSubmit} className="form-signin">
            <img src={logo} className="Logo" alt="DevWear Logo" />
            <h6 className="mb-5">
              <p>
                <strong>{"<DevWear/>"}</strong>
              </p>
              <p className="texto-login">
                {"Debugue seu estilo, compile sua identidade!"}
              </p>
            </h6>
            <h4 className="mb-3 text-secondary">Acesse sua conta</h4>

            {error && <span className="text-danger">{error}</span>}

            <div className="mt-1">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control bg-secondary bg-opacity-25 text-dark"
              />
            </div>

            <div className="mt-2 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-secondary bg-opacity-25 text-dark pe-5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                style={{ zIndex: 10 }}
              >
                {showPassword ? "😌" : "👁️"}
              </button>
            </div>

            <div className="mt-4">
              <button className="btn btn-primary">Acessar</button>
            </div>

            <div className="mt-3">
              <span>Registre-se. </span>
              <Link to="/register">Aqui</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
