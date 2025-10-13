import { supabase } from "@/lib/supabase";
import useAuthStore from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["get-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};
