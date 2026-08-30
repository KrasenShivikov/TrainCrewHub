import "dotenv/config";

import { closeDb } from "@/db";
import { seedDefaultRolesAndPermissions } from "@/lib/auth/default-permissions";

try {
  await seedDefaultRolesAndPermissions();
  console.log("Default roles and permissions seeded.");
} finally {
  await closeDb();
}
