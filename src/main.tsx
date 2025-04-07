import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

// deixa no main por ele no dom ele tem mais alto nivel
// ele renderiza as rotas que estão em app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
