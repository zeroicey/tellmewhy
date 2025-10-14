import { useQuestionQuery } from "@/hooks/use-question-query";
import { Link } from "react-router";

export default function QuestionList() {
  const { data: questions } = useQuestionQuery();

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🤔</div>
          <h3 className="text-lg font-medium mb-2">No Questions Yet</h3>
          <p className="text-sm text-center">
            Be the first to ask a question!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border py-2 px-5 w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
      {questions.map((question) => (
        <div key={question.id} className="p-2 border-b last:border-b-0">
          <Link to={`/questions/${question.id}`}>
            <h1 className="text-xl font-bold">{question.title}</h1>
          </Link>
          <p>{question.content}</p>
        </div>
      ))}
    </div>
  );
}
