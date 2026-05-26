import type {
  CaipNetworkId,
  SIWXConfig,
  SIWXMessage,
  SIWXSession,
} from "@reown/appkit";
import { ConnectionController } from "@reown/appkit-controllers";
import { InformalMessenger } from "@reown/appkit-siwx";

const FALLBACK_DOMAIN = "localhost";
const FALLBACK_URI = "http://localhost";

/**
 * SIWX implementation that delegates nonce issuance, signature verification,
 * and session storage to this app's own Next.js API routes.
 *
 * Unlike DefaultSIWX, no client-side verifiers run — the server is the only
 * thing that ever checks signatures.
 */
export class ServerSIWX implements SIWXConfig {
  required = true;

  private readonly messenger: InformalMessenger;

  constructor() {
    this.messenger = new InformalMessenger({
      domain: typeof window === "undefined" ? FALLBACK_DOMAIN : window.location.host,
      uri: typeof window === "undefined" ? FALLBACK_URI : window.location.origin,
      statement: "Sign in to verify wallet ownership.",
      getNonce: async ({ accountAddress, chainId }) => {
        const res = await fetch(
          `/api/siwx/nonce?chainId=${encodeURIComponent(chainId)}&address=${encodeURIComponent(
            accountAddress,
          )}`,
        );
        if (!res.ok) throw new Error("Failed to fetch nonce");
        const { nonce } = (await res.json()) as { nonce: string };
        return nonce;
      },
    });
  }

  createMessage(input: SIWXMessage.Input): Promise<SIWXMessage> {
    return this.messenger.createMessage(input);
  }

  /**
   * Workaround: AppKit's TronAdapter.signMessage() (adapter.ts:146-148) is
   * a stub returning ''. We bypass ConnectionController for Tron and call
   * the injected TronLink (`window.tronWeb.trx.signMessageV2`) directly.
   * Other namespaces fall through to AppKit's default signer.
   */
  async signMessage({
    message,
    chainId,
  }: {
    message: string;
    chainId: string;
    accountAddress: string;
  }): Promise<string> {
    if (chainId.startsWith("tron:")) {
      const trx = (window as unknown as { tronWeb?: { trx?: { signMessageV2?: (m: string) => Promise<string> } } })
        .tronWeb?.trx;
      if (!trx?.signMessageV2) {
        throw new Error(
          "TronLink not available — window.tronWeb.trx.signMessageV2 missing",
        );
      }
      const signature = await trx.signMessageV2(message);
      if (!signature) throw new Error("TronLink returned empty signature");
      return signature;
    }

    const signature = await ConnectionController.signMessage(message);
    if (!signature) throw new Error("Wallet returned empty signature");
    return signature;
  }

  async addSession(session: SIWXSession): Promise<void> {
    console.debug("[ServerSIWX.addSession] sending", {
      dataKeys: Object.keys(session.data ?? {}),
      data: session.data,
      messageLen: session.message?.length,
      signatureLen: session.signature?.length,
    });
    const res = await fetch("/api/siwx/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: session.data,
        message: session.message,
        signature: session.signature,
      }),
      credentials: "include",
    });

    if (!res.ok) {
      const { error } = await safeJson(res);
      throw new Error(error || "Failed to verify signature");
    }
  }

  async getSessions(
    chainId: CaipNetworkId,
    address: string,
  ): Promise<SIWXSession[]> {
    const res = await fetch(
      `/api/siwx/sessions?chainId=${encodeURIComponent(chainId)}&address=${encodeURIComponent(
        address,
      )}`,
      { credentials: "include" },
    );
    if (!res.ok) return [];
    const { sessions } = (await res.json()) as { sessions: SIWXSession[] };
    return sessions ?? [];
  }

  async revokeSession(
    chainId: CaipNetworkId,
    address: string,
  ): Promise<void> {
    await fetch("/api/siwx/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chainId, address }),
      credentials: "include",
    });
  }

  async setSessions(sessions: SIWXSession[]): Promise<void> {
    if (sessions.length === 0) {
      await fetch("/api/siwx/revoke", { method: "POST", credentials: "include" });
      return;
    }
    for (const session of sessions) {
      await this.addSession(session);
    }
  }

  getRequired() {
    return this.required;
  }
}

async function safeJson(res: Response): Promise<{ error?: string }> {
  try {
    return (await res.json()) as { error?: string };
  } catch {
    return {};
  }
}
