import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./styles/global.css";
import App from "./App";

// deixa no main por ele no dom ele tem mais alto nivel
// ele renderiza as rotas que estão em app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
