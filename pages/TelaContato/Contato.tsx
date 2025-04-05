import "./Contato.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/BarraInferior";
import ContactForm from "../../components/Form/ContactForm";

const Contato = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-principal-contact">Entre em Contato Conosco:</h1>

      <h3 className="text-contatos">
        <p>
          E-mail: <strong>DevWearContact@gmail.com</strong> <br />
        </p>
        <p>
          Celular: <strong>+55 44 99953-9725</strong> <br />
        </p>
        Redes Sociais:{" "}
        <a href="https://www.instagram.com/adriansilva017/">Instagram</a> -{" "}
        <a href="https://www.linkedin.com/in/adrian-henrique-olinek-da-silva-102b4927a/">
          Linkedin
        </a>
      </h3>

      <h3 className="feedback">Envie seu Feedback ao lado :</h3>
      <div className="form-item">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contato;
