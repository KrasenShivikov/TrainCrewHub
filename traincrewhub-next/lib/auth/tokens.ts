import "server-only";

import { createHash, randomBytes } from "crypto";

export function createPlainToken() {
  return randomBytes(32).toString("base64url");
}

export function hashPlainToken(token: string) {
  return createHash("sha256").update(token).digest("base64url");
}
