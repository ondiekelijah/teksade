// This intializes and connects to our supabase backend
import { createClient } from "@supabase/supabase-js";
import { Database } from "./schematypes";

const supabaseUrl = "https://oulmqklivrbzoqabsrsc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bG1xa2xpdnJiem9xYWJzcnNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NDc5MDksImV4cCI6MTk5MjAyMzkwOX0.o1As-PJkyXy_NvTq49fsmEfNgWEzGZO5dnQaENUbers";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);