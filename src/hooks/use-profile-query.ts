import { supabase } from "@/lib/supabase";
import useAuthStore from "@/stores/auth";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["get-profile"];

export const useProfileQuery = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      console.log(error?.code);
      if (error) throw error;
      return data;
    },
  });
};
