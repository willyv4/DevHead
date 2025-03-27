import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ymkqhqoykdqczyvavbyy.supabase.co";
const supabaseKey = process.env.DEVHEAD_DB_API_KEY ?? "";
console.log("🔍 supabaseKey", supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
