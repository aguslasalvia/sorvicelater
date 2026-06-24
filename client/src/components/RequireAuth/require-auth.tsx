import { Navigate, Outlet, useLocation } from "react-router";
import { storage } from "@/lib/storage";
import toast from "react-hot-toast/headless";

export default function RequireAuth() {
  const location = useLocation();
  const token = storage.get("token") ?? localStorage.getItem("token");

  if (!token) {
    toast.error("You must be logged in to view this page.");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
