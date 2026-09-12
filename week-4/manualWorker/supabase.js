const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();


console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY exists:", !!process.env.SUPABASE_KEY);


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

module.exports = supabase;