import { supabase } from "@/lib/supabase";
import useAuthStore from "@/stores/auth";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["get-profile"];

export const useProfileQuery = () => {
  const id = useAuthStore.getState().user?.id;
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id || "")
        .single();
      console.log(error?.code);
      if (error) throw error;
      return data;
    },
  });
};
