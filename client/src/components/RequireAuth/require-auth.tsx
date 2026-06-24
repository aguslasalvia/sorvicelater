import { Navigate, Outlet, useLocation } from "react-router";
import { storage } from "@/lib/storage";

export default function RequireAuth() {
  const location = useLocation();
  const token = storage.get("token") ?? localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
