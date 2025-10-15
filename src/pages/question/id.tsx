import { useParams } from "react-router";
import { useQuestionByIdQuery } from "@/hooks/use-question-query";
import { useState } from "react";
import { useAnswerCreateMutation } from "@/hooks/use-answer-query";
import AnswerEditor from "@/components/answer/answer-editor";
import AnswerList from "@/components/answer/answer-list";

export default function QuestionIdPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const [answerEditorShown, setAnswerEditorShown] = useState(false);
  const [answerEditorValue, setAnswerEditorValue] = useState("");
  const { data: question, isPending, error } = useQuestionByIdQuery(questionId);
  const { mutate: createMutate } = useAnswerCreateMutation(questionId);

  const handleAnswerSubmit = () => {
    createMutate(answerEditorValue);
  };

  // 加载状态
  if (isPending) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
          <div className="flex flex-col items-center justify-center py-12 text-red-500">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium mb-2">Error Loading Question</h3>
            <p className="text-sm text-center">
              Failed to load the question. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 问题不存在
  if (!question) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">Question Not Found</h3>
            <p className="text-sm text-center">
              The question you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 显示问题详情
  return (
    <div className="flex flex-col w-full bg-[#f4f6f9] gap-2 items-center relative">
      <div className="w-full max-h-[600px] bg-white flex flex-col items-center shadow-md">
        <div className="w-200 p-5">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            {question.title}
          </h1>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {question.content}
          </div>
        </div>
      </div>
      {answerEditorShown && (
        <AnswerEditor
          answerEditorValue={answerEditorValue}
          setAnswerEditorValue={setAnswerEditorValue}
          handleAnswerSubmit={handleAnswerSubmit}
          setAnswerEditorShown={setAnswerEditorShown}
        />
      )}

      <AnswerList questionId={questionId} />

      {/* 悬浮的添加按钮 */}
      {!answerEditorShown && (
        <button
          onClick={() => setAnswerEditorShown(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 cursor-pointer"
          aria-label="添加回答"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
