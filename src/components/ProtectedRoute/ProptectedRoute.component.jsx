import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = useSelector((state) => state.user.user);

  return !user ? <Navigate to="/login" replace /> : <Outlet />;
}

export default ProtectedRoute;
