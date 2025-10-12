import { supabase } from "@/lib/supabase";
import type { Session, Subscription, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { toast } from "sonner";

interface AuthStore {
  session: Session | null;
  user: User | null;
  isSignedIn: boolean;
  loading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}

// 存储监听器引用以便清理
let authStateChangeListener: { data: { subscription: Subscription } } | null =
  null;

const useAuthStore = create<AuthStore>((set, get) => {
  const store = {
    session: null,
    user: null,
    isSignedIn: false,
    loading: true,
    initialized: false,

    initialize: async () => {
      if (get().initialized) return;

      try {
        set({ loading: true });

        // 获取当前会话
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("获取会话失败:", error);
          toast.error(`获取会话失败: ${error.message}`);
          set({
            loading: false,
            initialized: true,
          });
          return;
        }

        // 设置初始状态
        set({
          session,
          user: session?.user ?? null,
          isSignedIn: !!session,
          loading: false,
          initialized: true,
        });

        // 设置认证状态变化监听器（集中展示登录/登出提示）
        authStateChangeListener = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log("认证状态变化:", event, session?.user?.email);
            set({
              session,
              user: session?.user ?? null,
              isSignedIn: !!session,
              loading: false,
            });
          }
        );
      } catch (error) {
        console.error("初始化认证状态失败:", error);
        const errorMessage =
          error instanceof Error ? error.message : "初始化失败";
        toast.error(`初始化认证状态失败: ${errorMessage}`);
        set({
          loading: false,
          initialized: true,
        });
      }
    },

    setLoading: (loading: boolean) => set({ loading }),

    signOut: async () => {
      try {
        set({ loading: true });

        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error("登出失败:", error);
          toast.error(`登出失败: ${error.message}`);
          set({ loading: false });
          return;
        }

        // 清理状态
        set({
          session: null,
          user: null,
          isSignedIn: false,
          loading: false,
        });

        // 成功登出提示交由 onAuthStateChange 统一处理
      } catch (error) {
        console.error("登出过程中发生错误:", error);
        const errorMessage =
          error instanceof Error ? error.message : "登出失败";
        toast.error(`登出过程中发生错误: ${errorMessage}`);
        set({
          loading: false,
        });
      }
    },
  };

  return store;
});

// 自动初始化
const initializeAuth = async () => {
  const { initialize } = useAuthStore.getState();
  await initialize();
};

// 在模块加载时初始化
initializeAuth();

// 清理函数（在应用卸载时调用）
export const cleanupAuthStore = () => {
  if (authStateChangeListener) {
    authStateChangeListener.data.subscription.unsubscribe();
    authStateChangeListener = null;
  }
};

export default useAuthStore;
