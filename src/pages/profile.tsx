import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/auth";
import { Navigate } from "react-router";
import { useProfileQuery } from "@/hooks/use-profile-query";
import { toast } from "sonner";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isSignedIn, loading: authLoading } = useAuthStore();
  const { data: profile } = useProfileQuery();

  // 初始化资料
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setNickname(profile.nickname || "");
      if (profile.avatar) {
        setAvatar(profile.avatar);
      }
    }
  }, [profile]);

  // 获取头像（默认）
  const getAvatarUrl = () => {
    if (avatar) return avatar;
    // 默认头像
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl("59323300.jpg");
    return data.publicUrl;
  };

  // 更新资料
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!profile) {
      const { error } = await supabase.from("profiles").insert({
        username,
        nickname,
        avatar_url: avatar,
      });
      if (error) toast.error(error.message);
      else toast.success("Profile created successfully!");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        nickname,
        avatar_url: avatar,
      })
      .eq("id", profile.id);

    if (error) toast.error(error.message);
    else toast.success("Profile updated successfully!");

    setLoading(false);
  };

  // 点击按钮 -> 触发文件选择框
  const handleChangeAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 上传头像逻辑
  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${profile?.id}.${fileExt}`;

      // 上传文件到 Supabase
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 获取公开 URL
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      setAvatar(data.publicUrl);

      toast.success("Avatar uploaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
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
              <AvatarImage src={getAvatarUrl()} alt="avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {/* 隐藏的文件输入框 */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />

            <Button
              type="button"
              onClick={handleChangeAvatarClick}
              disabled={uploading}
              className="bg-blue-400"
            >
              {uploading ? <Loader2 className="animate-spin" /> : "Change avatar"}
            </Button>
          </div>

          <div className="w-full">
            <FieldGroup>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>Nickname</FieldLabel>
                <Input
                  placeholder="Enter nickname"
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
                className="bg-blue-500"
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
