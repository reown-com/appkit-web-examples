import { useState, useEffect } from "react";

import { ActionButtonList } from "./components/ActionButtonList";
import { PageHeader } from "./components/PageHeader";
import { initializeProvider, initializeModal } from "./config";
import UniversalProvider from "@walletconnect/universal-provider";
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationSnackbar } from "./components/NotificationSnackbar";

import "./App.css";

// SVG Icons as components
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export function App() {
  const [provider, setProvider] = useState<UniversalProvider>();
  const [address, setAddress] = useState<string>();
  const [session, setSession] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const dataProvider = await initializeProvider();
      setProvider(dataProvider);
      console.log("dataProvider", dataProvider);
      initializeModal(dataProvider);

      if (dataProvider.session) {
        // check if there is a session
        console.log("dataProvider.session", dataProvider.session);
        setSession(dataProvider.session);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleDisplayUri = (uri: string) => {
      const modal = initializeModal(provider);
      modal?.open({ uri, view: "ConnectingWalletConnectBasic" });
    };

    const handleConnect = async (session: any) => {
      console.log("session", session);
      setSession(session.session);
      const modal = initializeModal(provider);
      await modal?.close();
    };

    provider?.on("display_uri", handleDisplayUri);
    provider?.on("connect", handleConnect);

    return () => {
      provider?.removeListener("connect", handleConnect);
      provider?.removeListener("display_uri", handleDisplayUri);
    };
  }, [provider]);

  useEffect(() => {
    setAddress(session?.namespaces["sui"]?.accounts?.[0]?.split(":")[2]);
  }, [session]);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-[#111111] text-gray-200 font-sans flex flex-col">
        <PageHeader />

        <main className="flex-grow w-full flex items-center justify-center">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-center">
            <div className="w-full max-w-[400px] h-[814px] flex-col items-center flex-shrink-0">
              <div className="flex flex-col items-center gap-[4px] py-[28px] px-0">
                <h1 className="flex items-center gap-2 text-white text-center font-inter text-32px font-medium leading-tight-plus tracking-tight-xl font-feature-case">
                  <img
                    src="/sui-token.png"
                    alt="SUI Logo"
                    className="w-8 h-8"
                  />
                  <span>SUI</span>
                </h1>
                <div className="text-center text-xs text-gray-400">
                  POWERED BY
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <img
                      src="/reown-small.png"
                      alt="Reown Logo"
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    <span className="text-gray-400 text-xs">&</span>
                    <img
                      src="/walletconnect.png"
                      alt="WalletConnect Logo"
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                  </div>
                </div>
              </div>

              <ActionButtonList
                setSession={setSession}
                session={session}
                provider={provider}
                address={address}
              />
            </div>
          </div>
        </main>

        <footer className="w-full h-[64px] bg-white/2 border-t border-[#2D2D2D] text-xs text-gray-500 flex justify-center items-center">
          <div className="w-[1150px] py-5 px-5 flex items-center justify-between">
            <div className="mb-2 sm:mb-0">
              © {new Date().getFullYear()} reown inc.
            </div>
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <a
                href="#"
                className="hover:text-gray-300 flex h-6 py-0.5 px-1.5 justify-center items-center gap-1"
              >
                <img src="/appkit.png" alt="AppKit" width={14} height={14} />
                <span>Appkit</span>
                <img
                  src="/External Link.png"
                  alt="External Link"
                  width={12}
                  height={12}
                  className="opacity-60"
                />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 flex h-6 py-0.5 px-1.5 justify-center items-center gap-1"
              >
                <img
                  src="/walletkit.png"
                  alt="WalletKit"
                  width={14}
                  height={14}
                />
                <span>WalletKit</span>
                <img
                  src="/External Link.png"
                  alt="External Link"
                  width={12}
                  height={12}
                  className="opacity-60"
                />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 flex h-6 py-0.5 px-1.5 justify-center items-center gap-1"
              >
                <img src="/docs.png" alt="Docs" width={14} height={14} />
                <span>Docs</span>
                <img
                  src="/External Link.png"
                  alt="External Link"
                  width={12}
                  height={12}
                  className="opacity-60"
                />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" aria-label="GitHub" className="hover:text-gray-300">
                <GithubIcon />
              </a>
              <a href="#" aria-label="Discord" className="hover:text-gray-300">
                <DiscordIcon />
              </a>
              <a href="#" aria-label="Telegram" className="hover:text-gray-300">
                <TelegramIcon />
              </a>
            </div>
          </div>
        </footer>

        {/* Notification Snackbar */}
        <NotificationSnackbar />
      </div>
    </NotificationProvider>
  );
}

export default App;
