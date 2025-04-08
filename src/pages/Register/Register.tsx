import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/Register/Register.css";
import logo2 from "../../assets/devwearball.png";
import { Link } from "react-router-dom";
import api from "../../api/api";
import InputMask from "react-input-mask"; // lib de Cpf

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cpf?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");

  const validateCPF = (cpf: string): boolean => {
    const cleanedCPF = cpf.replace(/\D/g, "");
    return cleanedCPF.length === 11;
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const ExecuteRegister = async () => {
    try {
      const { name, email, password, cpf } = formData;

      const response = await api.post("/api/users", {
        name,
        email,
        password,
        cpf,
      });

      if (response.data && response.status === 201) {
        window.alert("Registro bem-sucedido!");
        console.log("Registro bem-sucedido!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          cpf: "",
        });
        navigate("/"); // Redireciona para a tela de login
      } else {
        setError(response.data.error || "Erro desconhecido no registro");
      }
    } catch (error: unknown) {
      console.error("Erro ao registrar:", error);
      if (
        error instanceof Error &&
        (error as import("axios").AxiosError).response
      ) {
        console.error(
          "Erro do backend:",
          (error as import("axios").AxiosError).response?.data
        );
      }
      setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      ExecuteRegister();
    } else {
      console.log("Formulário inválido", errors);
    }
  };

  return (
    <div className="row2">
      <div className="d-flex justify-content-center align-items-center text-center">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="form-signin2">
          <img src={logo2} className="Logo2" alt="Logo DevWear" />
          <h6 className="mb-7">
            <p>
              <strong>{"<DevWear/>"}</strong>
            </p>
          </h6>
          <h6 className="mb-3 text-secondary">Registre sua conta aqui!</h6>

          <div className="mt-3">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className={`form-control bg-secondary bg-opacity-25 text-dark ${
                errors.name ? "is-invalid" : ""
              }`}
            />
            {errors.name && (
              <div className="invalid-feedback d-block text-start">
                {errors.name}
              </div>
            )}
          </div>

          <div className="mt-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control bg-secondary bg-opacity-25 text-dark ${
                errors.email ? "is-invalid" : ""
              }`}
            />
            {errors.email && (
              <div className="invalid-feedback d-block text-start">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mt-3">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              className={`form-control bg-secondary bg-opacity-25 text-dark ${
                errors.password ? "is-invalid" : ""
              }`}
            />
            {errors.password && (
              <div className="invalid-feedback d-block text-start">
                {errors.password}
              </div>
            )}
          </div>

          <div className="mt-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control bg-secondary bg-opacity-25 text-dark ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback d-block text-start">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="mt-3">
            <InputMask
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={handleChange}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <input
                  {...inputProps}
                  type="text"
                  name="cpf"
                  placeholder="CPF (xxx.xxx.xxx-xx)"
                  className={`form-control bg-secondary bg-opacity-25 text-dark ${
                    errors.cpf ? "is-invalid" : ""
                  }`}
                />
              )}
            </InputMask>
            {errors.cpf && (
              <div className="invalid-feedback d-block text-start">
                {errors.cpf}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Registrar
            </button>
          </div>

          <div className="mt-1">
            <span>Já tem uma conta? </span>
            <Link to="/">Logue aqui!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
