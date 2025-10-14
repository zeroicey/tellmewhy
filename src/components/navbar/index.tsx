import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth";
import { Link, useLocation, useNavigate } from "react-router";
import { NavUser } from "./nav-user";
import { Plus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, user } = useAuthStore();
  if (
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup") ||
    location.pathname === "/"
  ) {
    return null;
  }
  if (!isSignedIn || !user) {
    return (
      <div className="w-full flex items-center justify-between p-2 bg-white border-b border-gray-200">
        <Link to={"/questions"}>
          <span className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
            Tell me why ❓
          </span>
        </Link>
        <Button
          onClick={() => navigate("/signin")}
          className="bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
          Sign In
        </Button>
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
        {location.pathname !== "/ask" && (
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
        <NavUser
          user={{
            name: user.user_metadata.username || "Unknown",
            email: user?.email || "",
            avatar: user.user_metadata.avatar_url || "",
          }}
        />
      </div>
    </div>
  );
}
