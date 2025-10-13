import { useQuestionQuery } from "@/hooks/use-question-query";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

export default function QuestionList() {
  const { data: questions } = useQuestionQuery();
  return (
    <div className="flex flex-col border py-2 px-5 h-full w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white shadow-md">
      {questions?.map((question) => {
        return (
          <>
            <div key={question.id} className="p-2">
              <Link to={`/questions/${question.id}`}>
                <h1 className="text-xl font-bold">{question.title}</h1>
              </Link>
              <p>{question.content}</p>
            </div>
            <Separator />
          </>
        );
      })}
    </div>
  );
}
