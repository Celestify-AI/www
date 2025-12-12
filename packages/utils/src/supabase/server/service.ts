import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please create a .env.local file in the project root with your Supabase credentials. See README.md for setup instructions.",
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY environment variable. Please create a .env.local file in the project root with your Supabase credentials. See README.md for setup instructions.",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}
