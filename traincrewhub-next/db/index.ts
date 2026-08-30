import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

let client: postgres.Sql | null = null;
let database: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  if (!client) {
    client = postgres(connectionString, {
      max: 10,
      prepare: false
    });
  }

  if (!database) {
    database = drizzle(client, { schema });
  }

  return database;
}

export async function closeDb() {
  if (client) {
    await client.end();
    client = null;
    database = null;
  }
}
