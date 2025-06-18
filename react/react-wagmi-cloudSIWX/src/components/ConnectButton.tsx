import { Button } from '@shopify/polaris';
import { useAppKit, useAppKitAccount, useAppKitState, useDisconnect } from '@reown/appkit/react';
import { useEffect, useState, useRef } from 'react';

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { isConnected, address, status } = useAppKitAccount();
  const { initialized } = useAppKitState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const { disconnect } = useDisconnect();
  const hasDisconnected = useRef(false);

  useEffect(() => {
    if (status === 'disconnected' || status === 'connected') {
      setHasLoaded(true);
    }
  }, [status]);

  useEffect(() => {
    if (initialized && !hasDisconnected.current) {
      console.log("Disconnecting");
      hasDisconnected.current = true;
      disconnect();
    }
  }, [initialized, disconnect]);

  const handleClick = () => {
    open();
  };

  return (
    <Button
      onClick={handleClick}
      variant={isConnected ? "plain" : "primary"}
      disabled={!hasLoaded}
    >
      {!hasLoaded ? 'Loading...' : 
       isConnected ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
    </Button>
  );
}; 
