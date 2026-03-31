import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: any) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
