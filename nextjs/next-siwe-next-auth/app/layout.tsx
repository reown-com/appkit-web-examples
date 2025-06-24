import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { cookieToInitialState } from 'wagmi';

import { wagmiAdapter } from './config';
import AppKitProvider from './context';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookie = headersList.get('cookie');
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookie);
  return (
    <html lang='en'>
      <body>
        <AppKitProvider initialState={initialState}>
          {children}
        </AppKitProvider>
      </body>
    </html>
  );
}
