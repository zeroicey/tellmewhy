import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
interface Props {
  answerEditorValue: string;
  setAnswerEditorValue: (answerEditorValue: string) => void;
  handleAnswerSubmit: () => void;
  setAnswerEditorShown: (answerEditorShown: boolean) => void;
}

export default function AnswerEditor({
  answerEditorValue,
  setAnswerEditorValue,
  handleAnswerSubmit,
  setAnswerEditorShown,
}: Props) {
  return (
    <div className="w-full sm:w-[450px] md:w-[600px] lg:w-[800px] bg-white p-2 shadow-md">
      <textarea
        value={answerEditorValue}
        onChange={(e) => setAnswerEditorValue(e.target.value)}
        className="h-200 w-full border-none focus:outline-none focus:ring-0 focus:border-none resize-none"
        placeholder="Leave a comment..."
      />
      <div className="mt-2 flex justify-between items-center sticky bottom-0 bg-white border-t py-2">
        <div>
          <span>Number: {answerEditorValue.length}</span>
        </div>
        <div className="flex justify-center items-center gap-5">
          <ArrowUp
            onClick={() => setAnswerEditorShown(false)}
            className="cursor-pointer"
          />
          <Button className="cursor-pointer" onClick={handleAnswerSubmit}>
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
