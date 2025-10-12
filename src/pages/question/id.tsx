import { useParams } from "react-router";

export default function QuestionIdPage() {
  const { questionId } = useParams<{ questionId: string }>();
  return <div>QuestionIdPage {questionId}</div>;
}
