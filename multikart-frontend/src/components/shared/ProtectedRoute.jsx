import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // You can use a gold spinner here

  // Check if user exists and is an admin (assuming your model has a 'role' field)
  if (!user || user.role !== 'admin') {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;