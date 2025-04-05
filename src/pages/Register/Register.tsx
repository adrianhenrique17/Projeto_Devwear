import { useState } from "react";
import "../../pages/Register/Register.css";
import logo2 from "../../assets/devwearball.png";
import Botao from "../../components/Btn/btn";
import { Link } from "react-router-dom";

// Interface para os erros de validação - ATUALIZADA com confirmPassword
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cpf?: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // NOVO CAMPO
    cpf: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Função para validar CPF
  const validateCPF = (cpf: string): boolean => {
    // Implementação básica - você pode usar uma lib ou implementação mais completa
    return cpf.length === 11 || cpf.length === 14; // 11 dígitos ou 14 com formatação
  };

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Função para validar senha (mínimo 8 caracteres)
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  // Validação geral do formulário - ATUALIZADA com confirmação de senha
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

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

    // NOVA VALIDAÇÃO: Confirmação de senha
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Dados válidos:", formData);
      // Aqui você faria a chamada para a API de registro
    } else {
      console.log("Formulário inválido", errors);
    }
  };

  return (
    <div className="row2">
      <div className="d-flex justify-content-center align-items-center text-center">
        <form onSubmit={handleSubmit} className="form-signin2">
          <img src={logo2} className="Logo2" alt="Logo DevWear" />
          <h6 className="mb-7">
            <p>
              <strong>{"<DevWear/>"}</strong>
            </p>
          </h6>
          <h6 className="mb-3 text-secondary">Registre sua conta aqui!</h6>

          {/* Campo Nome */}
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

          {/* Campo Email */}
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

          {/* Campo Senha */}
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

          {/* Campo Confirmação de Senha - ATUALIZADO com name="confirmPassword" */}
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

          {/* Campo CPF */}
          <div className="mt-3">
            <input
              type="text"
              name="cpf"
              placeholder="CPF (somente números)"
              value={formData.cpf}
              onChange={handleChange}
              className={`form-control bg-secondary bg-opacity-25 text-dark ${
                errors.cpf ? "is-invalid" : ""
              }`}
            />
            {errors.cpf && (
              <div className="invalid-feedback d-block text-start">
                {errors.cpf}
              </div>
            )}
          </div>

          <div className="btncss">
            <Botao texto="Registrar" />
            {/* fiz um componente para reutilizar esse botão :) */}
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
