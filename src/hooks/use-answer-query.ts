import { supabase } from "@/lib/supabase";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

const queryKey: QueryKey = ["list-answers"];

export const useAnswerQuery = (questionId: string | undefined) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await supabase
        .from("answers")
        .select(`*, profile:profiles(*)`)
        .eq("question_id", +questionId!);
      const updatedData = data?.map((answer) => {
        if (!answer.profile.avatar) {
          return {
            ...answer,
            profile: {
              ...answer.profile,
              avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${answer.profile.username}`,
            },
          };
        }
        const { data: avatar } = supabase.storage
          .from("avatars")
          .getPublicUrl(answer.profile.avatar);
        return {
          ...answer,
          profile: { ...answer.profile, avatar: avatar.publicUrl },
        };
      });
      return updatedData;
    },
    enabled: !!questionId,
  });
};

export const useAnswerCreateMutation = (questionId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await supabase.from("answers").insert({
        content,
        question_id: +questionId!,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Publish answer successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error("Publish answer failed!");
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
