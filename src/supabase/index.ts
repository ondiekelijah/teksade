// This intializes and connect to our supabase backend
import { createClient } from "@supabase/supabase-js";
import { Database } from "./schematypes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
