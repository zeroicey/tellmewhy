import { Loader2 } from "lucide-react";

export default function IndexPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader2 className="animate-spin" size={48} />
      这个是一个首页一打开的而已
    </div>
  );
}
