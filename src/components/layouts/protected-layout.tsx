import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/stores/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProtectedLayout() {
  const { isSignedIn, loading } = useAuthStore();

  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (!loading && !isSignedIn && !toastShown) {
      toast.error("You must be signed in to access this page.");
      setToastShown(true);
    }
  }, [loading, isSignedIn, toastShown]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
