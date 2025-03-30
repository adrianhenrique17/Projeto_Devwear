import React, { useState } from "react";
import styles from "./ContactForm.module.css";

//componente reutilizado das atividades das trilhas

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviado:", form);
    alert("Mensagem enviada!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Feedback DevWear</h2>

      <input
        type="text"
        name="nome"
        placeholder="Seu nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Seu e-mail"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="mensagem"
        placeholder="Sua mensagem"
        value={form.mensagem}
        onChange={handleChange}
        required
      />

      <button type="submit">envie!</button>
    </form>
  );
};

export default ContactForm;
