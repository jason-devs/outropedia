import { createClient } from "@supabase/supabase-js";
import { Database } from "./database";

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY } =
  process.env;

if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Could not find environment variables to create supabase client.",
  );
}

const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export default supabase;
