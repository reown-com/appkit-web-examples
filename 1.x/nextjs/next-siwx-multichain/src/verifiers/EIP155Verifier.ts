import { verifyMessage } from "viem";

import { SIWXVerifier } from "./SIWXVerifier";
import { SIWXSession } from "@reown/appkit/react";

export class EIP155Verifier extends SIWXVerifier {
  public readonly chainNamespace = "eip155";

  public async verify(session: SIWXSession): Promise<boolean> {
    try {
      return await verifyMessage({
        message: session.message.toString(),
        signature: session.signature as `0x${string}`,
        address: session.data.accountAddress as `0x${string}`,
      });
    } catch {
      return false;
    }
  }
}
