import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

if (!process.env.DRIZZLE_API_KEY) {
  console.error("Please set your DRIZZLE_API_KEY in .env file");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config;
