import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAnswerQuery } from "@/hooks/use-answer-query";

interface Props {
  questionId: string | undefined;
}

export default function AnswerList({ questionId }: Props) {
  const { data: answers } = useAnswerQuery(questionId);
  return (
    <div className="flex flex-col gap-3">
      {answers?.map((answer) => (
        <div
          key={answer.id}
          className="w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white p-2 shadow-md"
        >
          <div className="flex items-center justify-start mb-2 gap-2">
            {/* avatar */}
            <Avatar>
              <AvatarImage
                src={
                  answer.profile.avatar?.trim() !== ""
                    ? answer.profile.avatar!
                    : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${answer.profile.username}`
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{answer.profile.username}</span>
          </div>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {answer.content}
          </div>
        </div>
      ))}
    </div>
  );
}
