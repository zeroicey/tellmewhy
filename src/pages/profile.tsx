import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/auth";
import { Navigate, useNavigate } from "react-router";
import { useProfileQuery } from "@/hooks/use-profile-query";
import { toast } from "sonner";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { isSignedIn, loading: authLoading } = useAuthStore();
  const { data: profile, error } = useProfileQuery();

  // 当profile加载完毕后的初始化的输入框
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setNickname(profile.nickname || "");
    }
  }, [profile]);

  // 这个是处理更新信息的逻辑
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase
        .from("profiles")
        .update({
          username,
          nickname,
        })
        .eq("id", profile?.id || "");
    } catch (err) {
      console.log(err);
      toast.error("有问题，请再来一次！");
      return;
    } finally {
      setLoading(false);
      navigate("/questions");
    }
  };

  // 这个是处理更新头像的逻辑
  const handleAvatarChange = async () => {
    console.log("the avatar is changed secussfully!");
  };

  if (!isSignedIn && !authLoading) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-30">
      <div className="w-200 h-100 rounded-xl box-border border-solid border-black shadow-2xl">
        <h1 className="text-2xl font-bold mb-3 mt-5 text-center">
          User Profile
        </h1>
        <h2 className="text-center">
          In this page, you can change your informations~
        </h2>
        <form className="flex box-border m-10 gap-20">
          <div className="flex flex-col items-center ml-10">
            <Avatar className="w-30 h-30 items-center mb-5">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/186951280?v=4"
                alt="@shadcn"
              />
            </Avatar>
            <Button type="button" onClick={handleAvatarChange}>
              Change avatar
            </Button>
          </div>
          <div className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Username
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="{username}"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ccheckout-7j9-card-name-43j">
                  Nickname
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="{nickname}"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <div className="mt-10">
              <Button
                type="submit"
                onClick={handleUpdate}
                disabled={loading}
                className="bg-blue-400"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
