import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  // PrivateRoute.tsx
  const { isAuthenticated, token } = useAuth();

  // Verificação mais robusta
  const isAuth = isAuthenticated && token !== null;
  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
