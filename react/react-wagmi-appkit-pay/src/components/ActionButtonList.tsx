
import { useDisconnect, useAppKit, useAppKitAccount  } from '@reown/appkit/react'
import { usePay } from '@reown/appkit-pay/react';
//import { baseETH, baseSepoliaETH, baseUSDC } from '@reown/appkit-pay'
import { baseSepoliaETH } from '@reown/appkit-pay'


export const ActionButtonList = () => {
    const handleSuccess = (data: any) => {
      console.log("Payment successful:", data);
    };

    const handleError = (error: any) => {
      console.error("Payment error:", error);
    };
    
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { open } = useAppKit(); // AppKit hook to open the modal
    const { address } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
    const { open: openPay, isPending, isSuccess, data, error } = usePay({
      onSuccess: handleSuccess, 
      onError: handleError,
    });

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

    const handlePay = async () => {
      // Configure a custom paymentAsset
     /*  const paymentAssetDetails = {
        network: 'eip155:8453', // Base Mainnet
        asset: 'native', // Or USDC in Base: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
        metadata: {
            name: 'Ethereum', // Or 'USD Coin'
            symbol: 'ETH',    // Or 'USDC'
            decimals: 18      // Or 6 for USDC
        },

      } as const; */


      // open resolves when the modal closes, but onSuccess/onError handle the actual payment result
      await openPay({ 
        paymentAsset: baseSepoliaETH,
        recipient: address || '',
        amount: 10
      });
    };


  return (
     (
    <div >
        <button onClick={() => open()}>Open</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={handlePay}>AppKit Pay</button>
        {isSuccess || isPending || error && (
          <section>
            <h2>Payment Status</h2>
          {isSuccess && (
            <p>Payment successful: {data}</p>
          )}
          {isPending && (
            <p>Payment pending: {data}</p>
          )}
          {error && (
            <p>Payment error: {error}</p>
          )}
          </section>
        )}
    </div>
    
    )
  )
}
