// This intializes and connects to our supabase backend
import { createClient } from "@supabase/supabase-js";
import { Database } from "./schematypes";

const supabaseUrl = "https://oulmqklivrbzoqabsrsc.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
