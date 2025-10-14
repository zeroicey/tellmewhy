import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/stores/auth";
import { Loader2 } from "lucide-react";
import { useProfileQuery } from "@/hooks/use-profile-query";

export default function ProtectedLayout() {
  const { isSignedIn, loading } = useAuthStore();
  const { data: profile } = useProfileQuery();
  console.log("profile:", profile);

  if (loading) {
    return (
      <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-[#f4f6f9] z-50">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (isSignedIn && !profile) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
