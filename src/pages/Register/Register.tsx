import { useState } from "react";
import "../../pages/Register/Register.css";
import logo from "../../assets/devwearball.png";
import Botao from "../../components/btn";
import { Link } from "react-router";

//HTML

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [CPF, setCpf] = useState("");

  //formEvent fala pro type definir oque é ele
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //não deixa o botão de acessar, recarregar senão o form não envia

    console.log(username, password, name, CPF);
    console.log("Envio");
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-center align-items-center text-center">
        {/* formatação com bootstrap */}
        {/*col deixa em colunas o componente para ser mais responsivel */}
        <form onSubmit={handleSubmit} className="form-signin">
          <img src={logo} className="Logo" />
          <h6 className="mb-5">
            <p>
              <strong>{"<DevWear/>"}</strong>
            </p>
            <p className="texto-login">
              {"Debugue seu estilo, compile sua identidade!"}
            </p>
          </h6>
          <h4 className="mb-3 text-secondary">Registre sua conta aqui!</h4>
          {/* secondary deixa o texto cinza*/}
          <div className="mt-3">
            {/* e.target.value Envia os dados para variavel */}
            <input
              type="Email"
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
              className="form-control  bg-secondary bg-opacity-25 text-dark"
            />
            {/* form control deixa é do Bs e deixa input redondo*/}
          </div>

          <div className="mt-3">
            <input
              type="Nome"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              className="form-control  bg-secondary bg-opacity-25 text-dark"
            />
          </div>

          <div className="mt-3">
            <input
              type="Senha"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control bg-secondary bg-opacity-25 text-dark"
            />
          </div>

          <div className="mt-3">
            <input
              type="Cpf"
              placeholder="Cpf"
              onChange={(e) => setCpf(e.target.value)}
              className="form-control bg-secondary bg-opacity-25 text-dark"
            />
          </div>

          <div className="btncss">
            <Botao texto="Registrar" />
            {/* fiz um componente para reutilizar esse botão :) */}
          </div>

          <div className="mt-1">
            <span>Logue. </span>
            <Link to={"/"}>Aqui!</Link>
            {/* registrando na tela de Register e Link e a tag do router que leva para as urls escolhidas*/}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

//slr
