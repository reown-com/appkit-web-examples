import { Verifier } from "bip322-js";

export async function verifyBip122({
  message,
  signature,
  address,
}: {
  message: string;
  signature: string;
  address: string;
}): Promise<boolean> {
  try {
    return Verifier.verifySignature(address, message, signature);
  } catch {
    return false;
  }
}
