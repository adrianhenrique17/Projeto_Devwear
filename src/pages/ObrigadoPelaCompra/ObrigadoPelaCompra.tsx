import Navbar from "../../components/Navbar/NavBar";
import fotoObg from "../../assets/ObrigadoPelaCompra/how to play.jpg";
import "./ObrigadoPelaCompra.css";

const ObrigadoPelaCompra = () => {
  return (
    <div>
      <Navbar />

      <img src={fotoObg} alt="Obrigado pela compra" className="img-obg" />
    </div>
  );
};

export default ObrigadoPelaCompra;
