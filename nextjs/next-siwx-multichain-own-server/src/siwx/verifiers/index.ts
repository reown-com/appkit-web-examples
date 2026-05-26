import { verifyBip122 } from "./bip122";
import { verifyEip155 } from "./eip155";
import { verifyTron } from "./tron";

export type VerifyInput = {
  message: string;
  signature: string;
  address: string;
};

export async function verifyForChain(
  chainId: string,
  input: VerifyInput,
): Promise<boolean> {
  const namespace = chainId.split(":")[0];

  switch (namespace) {
    case "eip155":
      return verifyEip155(input);
    case "bip122":
      return verifyBip122(input);
    case "tron":
      return verifyTron(input);
    default:
      return false;
  }
}
