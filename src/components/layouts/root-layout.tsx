import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "../navbar";
import { cleanupAuthStore } from "@/stores/auth";
import { useEffect } from "react";

export default function RootLayout() {
  // 在组件卸载时清理认证状态监听器
  useEffect(() => {
    return () => {
      cleanupAuthStore();
    };
  }, []);

  return (
    <QueryProvider>
      <Toaster position={"bottom-center"} />
      <main className="w-screen h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </main>
    </QueryProvider>
  );
}
