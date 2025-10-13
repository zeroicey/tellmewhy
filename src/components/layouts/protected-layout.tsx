import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/stores/auth";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout() {
  const { isSignedIn, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
