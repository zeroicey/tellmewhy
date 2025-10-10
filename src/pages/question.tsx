import { Button } from "@/components/ui/button";
import { useQuestionQuery } from "@/hooks/use-question-query";
import useAuthStore from "@/stores/auth";
import { useNavigate } from "react-router";

export default function QuestionPage() {
  const navigate = useNavigate();
  const { data: questions } = useQuestionQuery();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button
        variant={"default"}
        onClick={() => {
          useAuthStore.getState().signOut();
          navigate("/signin");
        }}
      >
        Log out
      </Button>
      <ul>
        {questions?.map((question) => {
          return <li key={question.id}>{question.title}</li>;
        })}
      </ul>
    </div>
  );
}
