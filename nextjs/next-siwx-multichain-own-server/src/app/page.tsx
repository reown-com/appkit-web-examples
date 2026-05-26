import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ServerSessionInfo } from "@/components/ServerSessionInfo";

export default function Home() {
  return (
    <div className="pages">
      <h1>AppKit SIWX Multichain — Own Server</h1>
      <p>EVM · Bitcoin · Tron, all verified by this app&apos;s Next.js API routes.</p>

      <ConnectButton />

      <div className="advice">
        <p>
          The signature is sent to <code>/api/siwx/verify</code>, verified
          server-side, and stored as an HTTP-only JWT cookie.
          <br />
          Default projectId only works on <code>localhost</code> — get your own at{" "}
          <a
            href="https://dashboard.reown.com"
            target="_blank"
            className="link-button"
            rel="noreferrer"
          >
            Reown Dashboard
          </a>
          .
        </p>
      </div>

      <InfoList />
      <ServerSessionInfo />
    </div>
  );
}
