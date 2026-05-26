import type { Metadata } from "next";

import "./globals.css";
import ContextProvider from "@/context";

export const metadata: Metadata = {
  title: "AppKit SIWX Multichain — Own Server",
  description: "EVM + Bitcoin + Tron SIWX with your own Next.js server",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
