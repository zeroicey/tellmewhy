import { useProfileQuery } from "@/hooks/use-profile-query";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { NavUser } from "./nav-user";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useProfileQuery();
  const { isSignedIn, user } = useAuthStore();
  if (
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup")
  ) {
    return null;
  }
  if (!isSignedIn || !user || !data) {
    return (
      <div className="w-full flex items-center justify-between p-2 sticky top-0 bg-white">
        <Link to={"/questions"}>
          <span>Tell me why ❓</span>
        </Link>
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 bg-white">
      <Link to={"/questions"}>
        <span>Tell me why ❓</span>
      </Link>
      <div className="flex items-center">
        {location.pathname !== "/ask" && (
          <Button
            className="cursor-pointer"
            variant={"default"}
            onClick={() => {
              navigate("/ask");
            }}
          >
            Ask
          </Button>
        )}
        <NavUser
          user={{
            name: data?.username || "Unknown",
            email: user?.email || "",
            avatar: data?.avatar_url || "",
          }}
        />
      </div>
    </div>
  );
}
