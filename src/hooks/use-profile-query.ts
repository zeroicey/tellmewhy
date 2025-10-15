import { supabase } from "@/lib/supabase";
import useAuthStore from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  const { user, isSignedIn } = useAuthStore();
  return useQuery({
    queryKey: ["get-profile", user?.id],
    queryFn: async () => {
      if (!isSignedIn || !user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) return null;

      if (!profile?.avatar) {
        return {
          ...profile,
          avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${
            profile.username || "Unknown"
          }`,
        };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(profile?.avatar);
      return { ...profile, avatar: publicUrl };
    },
    retry: false,
    enabled: isSignedIn,
  });
};
