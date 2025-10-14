import { supabase } from "@/lib/supabase";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["list-answers"];

export const useAnswerQuery = (questionId: string | undefined) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .eq("question_id", +questionId!);
      if (error) throw error;
      return data;
    },
    enabled: !!questionId,
  });
};
