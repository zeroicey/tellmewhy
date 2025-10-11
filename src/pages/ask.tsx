import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim() === "") {
      toast.error("标题不能为空！");
      return;
    }
    const { data, error } = await supabase
      .from("questions")
      .insert([{ title: title, content: content }])
      .select();
    /*键值对：e.target.value */
    console.log(data);
    console.log(error);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    navigate("/questions");
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <form className="flex items-center flex-col">
        <div className="mb-5 text-3xl ">this is the ask page</div>
        <Input
          type="text"
          placeholder="请输入标题"
          className="w-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="请输入内容"
          disabled={loading}
          className="w-200 h-50 px-5 py-3 my-2 inline-block border border-gray-300 rounded-md box-border focus:bg-blue-100 focus:border-gray-700 focus:border-[3px] transition-colors duration-500 ease-in-out"
        />
        <Button type="submit" onClick={handleAsk} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}
