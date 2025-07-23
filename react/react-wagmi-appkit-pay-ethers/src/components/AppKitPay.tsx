import { baseUSDC, pay, baseSepoliaETH } from '@reown/appkit-pay'

import './AppKitPay.css';
import { useState } from 'react';

export const AppKitPay = () => {
  const [result, setResult] = useState<any>(null);
  
    const handlePay = async (amount: number) => {
      // Check docs to Configure a custom paymentAsset
     /// https://docs.reown.com/appkit/react/payments/pay-with-exchange
      const recipientAddress = (document.querySelector('input[name="recipientAddress"]') as HTMLInputElement)?.value || '';
      
      if (!recipientAddress) {
        alert('Please enter a recipient address');
        return;
      }
      console.log("recipientAddress:", recipientAddress);
      
      // open resolves when the modal closes, but onSuccess/onError handle the actual payment result
      const res = await pay({
        recipient: recipientAddress,
        amount: amount,
        paymentAsset: baseSepoliaETH
      })
      setResult(res);
      
      if (res.success) {
        console.log("Payment successful: "+ res.result);
      } else {
        console.error("Payment error: "+ res.error);
      }
    };


  return (
    <div className="container">
        <div className="card">
            <img src="/donut1.webp" alt="Single Donut" className="donut-image" />
            <div className="content">
                <div className="title">Single Donut</div>
                <p>A delicious glazed donut, perfect for a quick treat.</p>
                <div className="price">$1.00</div>
            </div>
            <button onClick={() => handlePay(0.001)}>Pay with Crypto</button>
        </div>
        <div className="card">
        <img src="/donut2.jpg" alt="Single Donut" className="donut-image" />
            <div className="content">
                <div className="title">Box of Donuts</div>
                <p>6 donuts perfect for sharing with friends or colleagues.</p>
                <div className="price">$10.00</div>
            </div>
            <button onClick={() => handlePay(0.0010)}>Pay with Crypto</button>
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
        {(result?.success || result?.error) && (
          <section>
            <h2>Payment Status</h2>
            {result?.success && (
              <p>Payment successful</p>
            )}
            {result?.error && (
              <p>Payment error</p>
            )}
          </section>
        )}
    </div> 
  )
}
