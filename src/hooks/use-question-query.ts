import { supabase } from "@/lib/supabase";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["list-questions"];

export const useQuestionQuery = () => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("questions").select("*");
      if (error) throw error;
      return data;
    },
  });
};
