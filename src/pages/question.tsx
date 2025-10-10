import { useQuestionQuery } from "@/hooks/use-question-query";

export default function QuestionPage() {
  const { data: questions } = useQuestionQuery();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ul>
        {questions?.map((question) => {
          return <li key={question.id}>{question.title}</li>;
        })}
      </ul>
    </div>
  );
}
