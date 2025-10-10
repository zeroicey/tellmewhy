import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
