import TronWeb from "tronweb";

/**
 * Verifies a Tron-signed message and checks that the recovered address
 * matches the expected base58 address (e.g. `TXyz...`).
 *
 * TronLink signs with `tronWeb.trx.signMessageV2`, which uses the
 * "TRON Signed Message:" prefix. We recover via `verifyMessageV2`.
 */
export async function verifyTron({
  message,
  signature,
  address,
}: {
  message: string;
  signature: string;
  address: string;
}): Promise<boolean> {
  try {
    const recovered: string = await TronWeb.Trx.verifyMessageV2(
      message,
      signature,
    );
    return recovered === address;
  } catch {
    return false;
  }
}
