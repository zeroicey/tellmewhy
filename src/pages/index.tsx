import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Question = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  content: string | null;
};

export default function IndexPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  async function getQuestions() {
    const { data } = await supabase.from("questions").select("*");
    setQuestions(data ?? []);
  }

  useEffect(() => {
    getQuestions();
    return () => {};
  }, []);

  return (
    <div>
      <ul>
        {questions.map((question) => {
          return <li key={question.id}>{question.title}</li>;
        })}
      </ul>
    </div>
  );
}
