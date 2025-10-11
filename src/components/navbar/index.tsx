import { useProfileQuery } from "@/hooks/use-profile-query";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth";
import { useLocation, useNavigate } from "react-router";
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
  if (!isSignedIn) {
    return (
      <div className="w-full flex items-center justify-between p-2">
        <span>Tell me why ❓</span>
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <span>❓Tell me why</span>
        <div className="flex items-center">
          {location.pathname !== "/ask" && (
            <Button
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
    </div>
  );
}
