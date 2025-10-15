import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/auth";
import { Navigate } from "react-router";
import { useProfileQuery } from "@/hooks/use-profile-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePage() {
  const { isSignedIn, loading: authLoading, user } = useAuthStore();
  const { data: profile } = useProfileQuery();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 初始化表单
  useEffect(() => {
    if (profile) {
      setUsername(profile.username ?? "");
      setNickname(profile.nickname ?? "");
      setAvatar(profile.avatar ?? "");
    }
  }, [profile]);

  // 点击更换头像按钮
  const handleChangeAvatarClick = () => fileInputRef.current?.click();

  // 🚀 上传头像（不一定更新数据库）
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = fileName;

      // 上传文件到 Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 获取公开 URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setAvatar(publicUrl);

      // ✅ 如果 profile 已存在 → 同步更新数据库
      if (profile) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar: filePath })
          .eq("id", profile.id);

        if (updateError) throw updateError;

        // 刷新缓存
        queryClient.invalidateQueries({ queryKey: ["get-profile", user.id] });
        toast.success("头像已更新！");
      } else {
        // ❌ 没有 profile，只上传 Storage
        toast.info("头像已上传，但还未创建个人资料。");
      }
    } catch (error: any) {
      toast.error(error.message || "头像上传失败");
    } finally {
      setUploading(false);
    }
  };

  // 🚀 更新或创建 Profile
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return;
    if (!username.trim()) {
      toast.error("Username 不能为空！");
      return;
    }

    setLoading(true);
    try {
      if (!profile) {
        // 🧩 无 profile → 创建
        const { error } = await supabase.from("profiles").insert({
          id: user.id,
          username,
          nickname,
          avatar: avatar.startsWith("http")
            ? avatar.replace(/^.*\/([^/]+)$/, "$1") // 提取文件名部分
            : avatar || null,
        });
        if (error) throw error;
        toast.success("Profile 创建成功！");
      } else {
        // 🧩 有 profile → 更新
        const { error } = await supabase
          .from("profiles")
          .update({
            username,
            nickname,
            avatar: avatar.startsWith("http")
              ? avatar.replace(/^.*\/([^/]+)$/, "$1")
              : avatar || profile.avatar,
          })
          .eq("id", profile.id);
        if (error) throw error;
        toast.success("资料更新成功！");
      }

      // 刷新缓存
      queryClient.invalidateQueries({ queryKey: ["get-profile", user.id] });
    } catch (error: any) {
      toast.error(error.message || "操作失败");
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn && !authLoading) return <Navigate to="/signin" replace />;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-30">
      <div className="w-200 h-100 rounded-xl box-border  border-black shadow-2xl p-10">
        <h1 className="text-2xl font-bold mb-3 text-center">User Profile</h1>
        <h2 className="text-center mb-8 text-gray-600">
          Manage your profile information ✨
        </h2>

        <form className="flex gap-20">
          {/* 左侧头像 */}
          <div className="flex flex-col items-center">
            <Avatar className="w-30 h-30 mb-5">
              <AvatarImage
                src={
                  avatar ||
                  "https://api.dicebear.com/7.x/pixel-art/svg?seed=Unknown"
                }
                alt="avatar"
              />
              <AvatarFallback>??</AvatarFallback>
            </Avatar>

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
              {uploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Change avatar"
              )}
            </Button>
          </div>

          {/* 右侧信息表单 */}
          <div className="flex-1">
            <FieldGroup>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Nickname</FieldLabel>
                <Input
                  placeholder="Enter nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Field>
            </FieldGroup>

            <div className="mt-10 flex justify-end">
              <Button
                type="submit"
                onClick={handleUpdate}
                disabled={loading}
                className="bg-blue-500"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
