import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.error("Please set your DATABASE_URL in .env file");
}

const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("Migrating database...");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Database migrated successfully");
  } catch (e) {
    console.log("Error migrating database");
    console.log(e);
  }
};

// Uncomment this line to run migrations
// migrateDb();

export default db;
