import { useState, useEffect } from 'react';
import { baseUSDC, pay } from '@reown/appkit-pay';
import { useAvailableExchanges, usePayUrlActions } from '@reown/appkit-pay/react';
import './AppKitPay.css';

export const AppKitPay = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { data: exchanges, fetch  } = useAvailableExchanges({
      shouldFetchOnInit: false,
      asset: baseUSDC.asset,
      amount: 1,
      network: 'eip155:8453'
    });
    const { getUrl } = usePayUrlActions();


    const handleSuccess = (data: any) => {
      console.log("Payment successful:", data);
      setIsSuccess(true);
    };

    const handleError = (error: any) => {
      console.error("Payment error:", error);
      setIsSuccess(false);
      setErrorMsg(error);
    };
    


    const handlePay = async (amount: number) => {
      // Check docs to Configure a custom paymentAsset
     /// https://docs.reown.com/appkit/react/payments/pay-with-exchange
      const recipientAddress = (document.querySelector('input[name="recipientAddress"]') as HTMLInputElement)?.value || '';
      
      if (!recipientAddress) {
        alert('Please enter a recipient address');
        return;
      }
      
      // Call the pay function to initiate a crypto payment
      // paymentAsset: The token/currency to pay with (using baseSepoliaETH here)
      // recipient: The wallet address that will receive the payment
      // amount: The payment amount in USD
      const result = await pay({ 
        paymentAsset: baseUSDC,
        recipient: recipientAddress,
        amount
      });

      const { success, result: data, error } = result;
      if (success) {
        handleSuccess(data);
      } else {
        handleError(error);
      }
    };
    const handleGetBinanceURL = async () => {
      const recipientAddress = (document.querySelector('input[name="recipientAddress"]') as HTMLInputElement)?.value || '';
      
      if (!recipientAddress) {
        alert('Please enter a recipient address');
        return;
      }
      fetch();
    }

    useEffect(() => {
      console.log("exchanges:", exchanges);
      const getURL = async (address: string) => {
        await getUrl("binance", {
          network: "eip155:8453",
          asset: baseUSDC.asset,
          amount: 10,
          recipient: address || ""
        })
      }
      const recipientAddress = (document.querySelector('input[name="recipientAddress"]') as HTMLInputElement)?.value || '';
      console.log("recipientAddress:", recipientAddress);
      if (exchanges?.some((exchange: { id: string }) => exchange.id === 'binance')) {
        console.log('Binance is available');
      
        getURL(recipientAddress);
      }
    }, [exchanges]);



    useEffect(() => {
      // check ADDRESS env and set the recipient address
      const recipientAddress = import.meta.env.VITE_ADDRESS || "";
      if (recipientAddress) {
        const input = document.querySelector('input[name="recipientAddress"]') as HTMLInputElement;
        if (input) {
          input.value = recipientAddress;
        }
      }
    },[]);
  return (
    <div className="container">
        <div className="card">
            <img src="/donut1.webp" alt="Single Donut" className="donut-image" />
            <div className="content">
                <div className="title">Single Donut</div>
                <p>A delicious glazed donut, perfect for a quick treat.</p>
                <div className="price">$1.00</div>
            </div>
            <button onClick={() => handlePay(1)}>Pay with Crypto</button>
        </div>
        <div className="card">
        <img src="/donut2.jpg" alt="Single Donut" className="donut-image" />
            <div className="content">
                <div className="title">Box of Donuts</div>
                <p>6 donuts perfect for sharing with friends or colleagues.</p>
                <div className="price">$10.00</div>
            </div>
            <button onClick={() => handlePay(10)}>Pay with Crypto</button>
        </div> 
        <div className="card">

            <button onClick={handleGetBinanceURL}>Get Binance URL</button>
        </div> 
        <div className="card" style={{ width: '100%' }}>
            <div className="content">
                <div className="title">Destination Address</div>
                <p>Enter the recipient address for your payment.</p>
                <input 
                    type="text" 
                    name="recipientAddress"
                    placeholder="0x..." 
                    autoComplete="off"
                    data-1p-ignore
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginTop: '10px'
                    }}
                />
            </div>
        </div>
        {(isSuccess || errorMsg) && (
          <section>
            <h2>Payment Status</h2>
            {isSuccess && (
              <p>Payment successful !</p>
            )} else {
              <p>Payment error: {errorMsg}</p>
            }
          </section>
        )}
    </div> 
  )
}
