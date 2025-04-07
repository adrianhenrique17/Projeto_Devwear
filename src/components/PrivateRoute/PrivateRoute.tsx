import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
