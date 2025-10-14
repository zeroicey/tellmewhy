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

// 获取单个问题的hook
export const useQuestionByIdQuery = (questionId: number) => {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", questionId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!questionId, // 只有当questionId存在时才执行查询
  });
};
