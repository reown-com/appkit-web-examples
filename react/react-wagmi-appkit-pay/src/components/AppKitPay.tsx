import { usePay } from '@reown/appkit-pay/react';
import { baseUSDC } from '@reown/appkit-pay';
import './AppKitPay.css';

export const AppKitPay = () => {
    const handleSuccess = (data: any) => {
      console.log("Payment successful:", data);
    };

    const handleError = (error: any) => {
      console.error("Payment error:", error);
    };
    
    const { open: openPay, isPending, isSuccess, data, error } = usePay({
      onSuccess: handleSuccess, 
      onError: handleError,
    });


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
      await openPay({ 
        paymentAsset: baseUSDC,
        recipient: recipientAddress,
        amount
      });
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
        {(isSuccess || isPending || error) && (
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
}
