import { Verifier } from "bip322-js";
import { SIWXVerifier } from "./SIWXVerifier";
import { SIWXSession } from "@reown/appkit/react";

export class BIP122Verifier extends SIWXVerifier {
  public readonly chainNamespace = "bip122";

  public async verify(session: SIWXSession): Promise<boolean> {
    try {
      return Promise.resolve(
        Verifier.verifySignature(
          session.data.accountAddress,
          session.message,
          session.signature
        )
      );
    } catch {
      return false;
    }
  }
}
