import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAnswerQuery } from "@/hooks/use-answer-query";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  questionId: string | undefined;
}

export default function AnswerList({ questionId }: Props) {
  const { data: answers } = useAnswerQuery(questionId);
  const [expandedAnswers, setExpandedAnswers] = useState<Set<number>>(new Set());
  
  const MAX_CONTENT_LENGTH = 200; // 设置最大显示字符数

  const toggleExpanded = (answerId: number) => {
    const newExpanded = new Set(expandedAnswers);
    if (newExpanded.has(answerId)) {
      newExpanded.delete(answerId);
    } else {
      newExpanded.add(answerId);
    }
    setExpandedAnswers(newExpanded);
  };

  const shouldTruncate = (content: string) => content.length > MAX_CONTENT_LENGTH;
  
  const getDisplayContent = (content: string, answerId: number) => {
    if (!shouldTruncate(content) || expandedAnswers.has(answerId)) {
      return content;
    }
    return content.slice(0, MAX_CONTENT_LENGTH) + "...";
  };

  if (!answers || answers.length === 0) {
    return (
      <div className="w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white p-8 shadow-md rounded-lg border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-medium mb-2 text-gray-700">还没有回答</h3>
          <p className="text-sm text-center text-gray-500 mb-4">
            成为第一个回答这个问题的人吧！
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-3">
      {answers.map((answer) => {
        const isExpanded = expandedAnswers.has(answer.id);
        const needsTruncation = shouldTruncate(answer.content);
        
        return (
          <div
            key={answer.id}
            className="relative w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white p-4 shadow-md rounded-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* avatar */}
                <Avatar>
                  <AvatarImage src={answer.profile.avatar} alt="@tellmewhy" />
                  <AvatarFallback>??</AvatarFallback>
                </Avatar>
                <span className="font-bold text-gray-800">
                  {answer.profile.nickname || answer.profile.username}
                </span>
              </div>
              {/* publish time */}
              <span className="text-sm text-gray-500">
                {new Date(answer.created_at).toLocaleString()}
              </span>
            </div>
            
            <div className="relative">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-2">
                {getDisplayContent(answer.content, answer.id)}
              </div>
              
              {needsTruncation && (
                <>
                  {/* 底部展开按钮 */}
                  {!isExpanded && (
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => toggleExpanded(answer.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-all duration-200 border border-blue-200 hover:border-blue-300 cursor-pointer"
                      >
                        <span>查看完整</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Sticky收起按钮 - 只在展开时显示 */}
                  {isExpanded && (
                    <div className="sticky bottom-4 flex justify-center mt-4">
                      <button
                        onClick={() => toggleExpanded(answer.id)}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm border border-blue-500 cursor-pointer"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>收起</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
