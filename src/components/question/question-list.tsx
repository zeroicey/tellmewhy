import { useQuestionQuery } from "@/hooks/use-question-query";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function QuestionList() {
  const { data: questions, isPending } = useQuestionQuery();

  // 加载状态
  if (isPending) {
    return (
      <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
        {/* 骨架屏加载效果 */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="p-4 border-b last:border-b-0 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🤔</div>
          <h3 className="text-lg font-medium mb-2">还没有问题</h3>
          <p className="text-sm text-center">成为第一个提问的人吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
      {questions.map((question) => (
        <div key={question.id} className="p-4 border-b last:border-b-0">
          <Link to={`/questions/${question.id}`}>
            <h1 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
              {question.title}
            </h1>
          </Link>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words mb-3 line-clamp-2">
            {question.content}
          </p>

          {/* 最新答案信息 */}
          {question.latestAnswer ? (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Avatar className="w-5 h-5">
                  <AvatarImage
                    src={question.latestAnswer.profile?.avatar || ""}
                    alt="回答者"
                  />
                  <AvatarFallback className="text-xs">
                    {question.latestAnswer.profile?.nickname?.[0] ||
                      question.latestAnswer.profile?.username?.[0] ||
                      "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {question.latestAnswer.profile?.nickname ||
                    question.latestAnswer.profile?.username}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">
                  {new Date(
                    question.latestAnswer.created_at
                  ).toLocaleDateString("zh-CN")}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                {question.latestAnswer.content}
              </p>
            </div>
          ) : (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-400 italic">暂无回答</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
