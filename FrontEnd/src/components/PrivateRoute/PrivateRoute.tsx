import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { JSX } from "react";

// só deixa acessar se estiver logado

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {

  const { isAuthenticated, token } = useAuth();

 
  const isAuth = isAuthenticated && token !== null;
  return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
