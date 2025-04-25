import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import emailjs from "@emailjs/browser"; //lib de envio de emails com form

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

    const templateParams = {
      from_name: form.nome,
      message: form.mensagem,
      email: form.email,
    };

    emailjs
      .send(
        "service_h0fy2hd",
        "template_79qmgri",
        templateParams,
        "cq6EXrYinR73F5F-o"
      )
      .then((response) => {
        console.log(
          "Email enviado com sucesso!",
          response.status,
          response.text
        );
        alert("Mensagem enviada!");
        setForm({
          nome: "",
          email: "",
          mensagem: "",
        });
      })
      .catch((error) => {
        console.error("Erro ao enviar email:", error);
        alert("Houve um erro ao enviar sua mensagem. Tente novamente.");
      });
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
