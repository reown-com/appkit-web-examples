import { verifyMessage } from "viem";

export async function verifyEip155({
  message,
  signature,
  address,
}: {
  message: string;
  signature: string;
  address: string;
}): Promise<boolean> {
  try {
    return await verifyMessage({
      message,
      signature: signature as `0x${string}`,
      address: address as `0x${string}`,
    });
  } catch {
    return false;
  }
}
