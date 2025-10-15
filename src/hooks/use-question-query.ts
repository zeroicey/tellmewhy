import { supabase } from "@/lib/supabase";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["list-questions"];

export const useQuestionQuery = () => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("questions")
        .select(`
          *,
          answers (
            id,
            content,
            created_at,
            profile:profiles (
              id,
              username,
              nickname,
              avatar
            )
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // 处理每个问题，只保留最新的答案
      const processedData = data?.map((question) => {
        let latestAnswer = null;
        
        if (question.answers && question.answers.length > 0) {
          // 按创建时间排序，获取最新的答案
          const sortedAnswers = question.answers.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          latestAnswer = sortedAnswers[0];
          
          // 处理头像URL
          if (latestAnswer.profile && !latestAnswer.profile.avatar) {
            latestAnswer.profile.avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${latestAnswer.profile.username}`;
          } else if (latestAnswer.profile?.avatar) {
            const { data: avatar } = supabase.storage
              .from("avatars")
              .getPublicUrl(latestAnswer.profile.avatar);
            latestAnswer.profile.avatar = avatar.publicUrl;
          }
        }
        
        return {
          ...question,
          latestAnswer
        };
      });
      
      return processedData;
    },
  });
};

export const useQuestionByIdQuery = (questionId: string | undefined) => {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", +questionId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!questionId, // 只有当questionId存在时才执行查询
  });
};
