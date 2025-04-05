import { useState } from "react";
import "./Login.css";
import logo from "../../assets/devwearball.png";
import { Link } from "react-router-dom"; // Corrigindo importação do Link

//html

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //não deixa o botão de acessar, recarregar senão o form não envia

    //  e-mail
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    setError(""); // Limpa a mensagem de erro se a validação passar
    console.log(email, password);
    console.log("Envio bem-sucedido!");
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-center align-items-center text-center">
        {/* formatação com bootstrap */}
        {/*col deixa em colunas o componente para ser mais responsivel */}
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
          {/* secondary deixa o texto cinza*/}

          {/* Exibe a mensagem de erro caso o e-mail seja inválido */}
          {error && <span className="text-danger">{error}</span>}

          <div className="mt-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-secondary bg-opacity-25 text-dark"
            />
            {/* form control deixa é do Bs e deixa input redondo*/}
          </div>

          <div className="mt-2">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control bg-secondary bg-opacity-25 text-dark"
            />
          </div>

          <div className="mt-4">
            <button className="btn btn-primary">Acessar</button>
          </div>

          <div className="mt-3">
            <span>Registre-se. </span>
            <Link to="/register">Aqui</Link>

            {/* registrando na tela de login e Link e a tag do router que leva para as urls escolhidas*/}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
