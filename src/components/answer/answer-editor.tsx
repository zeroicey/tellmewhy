import { Button } from "@/components/ui/button";
interface Props {
  answerEditorValue: string;
  setAnswerEditorValue: (answerEditorValue: string) => void;
}

export default function AnswerEditor({ answerEditorValue, setAnswerEditorValue }: Props) {
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
        <Button className="cursor-pointer">Post Comment</Button>
      </div>
    </div>
  )
}
