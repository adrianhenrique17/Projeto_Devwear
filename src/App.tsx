import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TelaPrincipal from "./pages/TelaPrincipal/TelaPrincipal";
import Camisas from "./pages/TelaCamisas/Camisas";
import Sobre from "./pages/TelaSobre/Sobre";
import Contato from "./pages/TelaContato/Contato";
import Compra from "./pages/TelaCompra/Compra";
import EditarPerfil from "./pages/EditarPerfil/EditarPerfil";
import ObrigadoPelaCompra from "./pages/ObrigadoPelaCompra/ObrigadoPelaCompra";
import Carrinho from "./pages/Carrinho/Carrinho";
import FormularioEntrega from "./pages/FormularioEntrega/FormularioEntrega";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Protegidas */}
            <Route
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route path="/TelaPrincipal" element={<TelaPrincipal />} />
              <Route path="/Camisas" element={<Camisas />} />
              <Route path="/Sobre" element={<Sobre />} />
              <Route path="/Contato" element={<Contato />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route
                path="/FormularioEntrega"
                element={<FormularioEntrega />}
              />
              <Route
                path="/ObrigadoPelaCompra"
                element={<ObrigadoPelaCompra />}
              />
              <Route path="/Compra/:id" element={<Compra />} />
              <Route path="/EditarPerfil" element={<EditarPerfil />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
