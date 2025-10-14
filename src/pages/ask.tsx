import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AskPage() {
  // title和content内容的状态控制
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Radio的状态控制
  const [isPublic, setIsPublic] = useState(true);

  // 提交内容的逻辑操作
  const handleAsk = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim() === "") {
      toast.error("标题不能为空！");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("questions")
      .insert([{ title: title, content: content, is_public: isPublic }])
      .select();
    /*键值对：e.target.value这个的意思对应的就是 e就是， target.value就是对应目标的值 */
    console.log(data);
    console.log(error);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    navigate("/questions");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-30 select-none">
      <div className="rounded-xl box-border border-solid border-black shadow-2xl">
        <form className="flex items-center flex-col box-border m-10">
          <div className="mb-5 text-3xl ">Ask page</div>
          <div className="mb-5 text-xl ">Please write down your questions~</div>
          <Input
            type="text"
            placeholder="Please enter the title ~"
            className="w-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Please enter the content ~"
            disabled={loading}
            className="w-200 h-50 px-5 py-3 my-6 inline-block border border-gray-300 rounded-md box-border focus:bg-blue-100 focus:border-gray-700 focus:border-[3px] transition-colors duration-500 ease-in-out"
          />
          <div className="flex gap-x-10">
            <div className="flex items-center mx-5">
              Current Status:
              <span className="inline-block w-20 text-center">
                {isPublic ? "public" : "private"}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>Choice status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choice your ask status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={isPublic ? "public" : "private"}
                  // 这一行的解释：
                  // 1、onValueChange : 就是当我选中一个value值的时候就是 "public" : "private" ，他就会通过 onValueChange 来传回状态
                  // 2、val ： 这个的意思就是 当选中 public 他就是 val= Public的状态， 同样的 private 就是val = private
                  // 3、val === “public” ： 这个的意思就是 当 val = Public的时候，就是true 然后返回数据库的时候就是true了 如果是 val = private的时候呢，那么的话就是 false 了
                  // 4、setIsPublic() ：把这个布尔值的状态进行保存 如果选中 “Public” => setIsPublic(true) ；如果选中 “Private” => setIsPublic(false)
                  onValueChange={(val) => setIsPublic(val === "public")}
                >
                  <DropdownMenuRadioItem value="public">
                    public
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="private">
                    private
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="submit"
              onClick={handleAsk}
              disabled={loading}
              className="bg-blue-400"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Ask"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
