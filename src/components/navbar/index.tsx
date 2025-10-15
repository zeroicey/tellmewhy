import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth";
import { Link, useLocation, useNavigate } from "react-router";
import { NavUser } from "./nav-user";
import { LogOut, Plus } from "lucide-react";
import { useProfileQuery } from "@/hooks/use-profile-query";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile } = useProfileQuery();
  const { user, signOut } = useAuthStore();
  if (
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup") ||
    location.pathname === "/"
  ) {
    return null;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
        <Link to={"/questions"}>
          <span className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
            Tell me why ❓
          </span>
        </Link>
        <div className="flex items-center">
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white border-none mr-2"
            onClick={() => {
              signOut();
              navigate("/signin");
            }}
          >
            <LogOut /> Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
      <Link to={"/questions"}>
        <span className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
          Tell me why ❓
        </span>
      </Link>
      <div className="flex items-center">
        {!location.pathname.startsWith("/ask") && (
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white border-none mr-2"
            variant={"default"}
            onClick={() => {
              navigate("/ask");
            }}
          >
            <Plus />
          </Button>
        )}
        {profile && (
          <NavUser
            user={{
              name: profile.nickname || profile.username || "Unknown",
              email: user?.email || "",
              avatar: profile?.avatar || "",
            }}
          />
        )}
      </div>
    </div>
  );
}
