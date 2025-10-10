import { useProfileQuery } from "@/hooks/use-profile-query";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const { data } = useProfileQuery();
  const { isSignedIn, setLoading } = useAuthStore();
  if (!isSignedIn) {
    return (
      <div className="w-full flex items-center justify-between p-2">
        <span>Tell me why ❓</span>
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      </div>
    );
  }
  if (!data) return null;
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <span>Tell me why ❓</span>
        <div className="flex gap-2 items-center">
          <img
            src={data.avatar_url ?? ""}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>{data.nickname}</span>
          <Button
            variant={"default"}
            onClick={async () => {
              setLoading(true);
              await useAuthStore.getState().signOut();
              navigate("/signin");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
