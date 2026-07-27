"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useAppKitAccount,
  useAppKitEvents,
  useAppKitNetwork,
} from "@reown/appkit/react";
import { useClientMounted } from "@/hooks/useClientMount";

interface ServerSession {
  data: { accountAddress: string; chainId: string };
}

export const ServerSessionInfo = () => {
  const mounted = useClientMounted();
  const { isConnected } = useAppKitAccount();
  const { caipNetwork } = useAppKitNetwork();
  const events = useAppKitEvents();

  const [session, setSession] = useState<ServerSession | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/siwx/sessions", { credentials: "include" });
      const data = (await res.json()) as { sessions: ServerSession[] };
      setSession(data.sessions?.[0] ?? null);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    refresh();
  }, [mounted, isConnected, caipNetwork?.caipNetworkId, events.data, refresh]);

  if (!mounted) return null;

  return (
    <section>
      <h2>Server says</h2>
      {loading ? (
        <pre>Loading…</pre>
      ) : session ? (
        <pre>
          <span className="badge-ok">Authenticated</span>
          {"\n"}
          Address: {session.data.accountAddress}
          {"\n"}
          Chain: {session.data.chainId}
        </pre>
      ) : (
        <pre>
          <span className="badge-bad">Not authenticated</span>
        </pre>
      )}
      <button onClick={() => refresh()}>Refresh</button>
    </section>
  );
};
