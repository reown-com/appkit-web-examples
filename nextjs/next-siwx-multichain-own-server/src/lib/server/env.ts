export function getSecret(): Uint8Array {
  const secret = process.env.SIWX_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SIWX_SECRET is missing or too short. Set it in .env.local (>=16 chars).",
    );
  }
  return new TextEncoder().encode(secret);
}

export const NONCE_TTL_MS = 5 * 60 * 1000;
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const SESSION_COOKIE = "siwx_session";
