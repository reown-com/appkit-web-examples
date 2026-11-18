import { SIWXSession } from "@reown/appkit";

export abstract class SIWXVerifier {
  public abstract readonly chainNamespace: "eip155" | "solana" | "bip122";

  public shouldVerify(session: SIWXSession): boolean {
    return session.data.chainId.startsWith(this.chainNamespace);
  }

  abstract verify(session: SIWXSession): Promise<boolean>;
}
