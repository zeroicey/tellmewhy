import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "../navbar";
import { cleanupAuthStore } from "@/stores/auth";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    return () => {
      cleanupAuthStore();
    };
  }, []);

  return (
    <QueryProvider>
      <Toaster position={"bottom-center"} />
      <main className="w-full min-h-screen flex flex-col bg-[#f4f6f9]">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </QueryProvider>
  );
}
