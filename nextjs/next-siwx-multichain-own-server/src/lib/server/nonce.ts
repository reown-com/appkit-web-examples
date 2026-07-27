import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NONCE_TTL_MS } from "./env";

/**
 * Stateless nonce: `${random}.${exp}.${hmac(random|exp|chainId|address)}`.
 * Server verifies the HMAC at /verify time without needing a store.
 */
export function issueNonce(chainId: string, address: string): string {
  const random = randomBytes(16).toString("hex");
  const exp = Date.now() + NONCE_TTL_MS;
  const sig = signNonce(random, exp, chainId, address);
  return `${random}.${exp}.${sig}`;
}

export function verifyNonce(
  nonce: string,
  chainId: string,
  address: string,
): boolean {
  const parts = nonce.split(".");
  if (parts.length !== 3) return false;
  const [random, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  const expected = signNonce(random, exp, chainId, address);
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function signNonce(
  random: string,
  exp: number,
  chainId: string,
  address: string,
): string {
  const secret = process.env.SIWX_SECRET;
  if (!secret) throw new Error("SIWX_SECRET is missing");
  return createHmac("sha256", secret)
    .update(`${random}|${exp}|${chainId}|${address}`)
    .digest("hex");
}
