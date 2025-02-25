export const useCheckout = () =>{
    const loadRazorpay = async (amount) => {
        console.log("amount in frontend",amount);
        const res = await fetch("https://shoopper-server.vercel.app/api/orders/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ amount }),
          body: JSON.stringify({ amount,currency:"INR" }),
        });
    
        const { order } = await res.json();
        console.log("Orders in react",order)
        
        if (!order) {
          alert("Payment failed to initiate.");
          return;
        }
    
        const options = {
          key: "rzp_test_W1njiux8uI153d", // Use Test Key ID
          amount: order.amount,
          currency: order.currency,
          name: "Shopper",
          description: "Test Transaction",
          order_id: order.id,
          handler: async function (response) {
            console.log("handler in react",response);
            // Verify payment on backend
            const verification = await fetch("https://shoopper-server.vercel.app/api/orders/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            console.log("verification res in react",verification);
            const verificationResult = await verification.json();
    
            if (verificationResult.success) {
              alert("Payment successful!");
            } else {
              alert("Payment verification failed!");
            }
          },
          prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      
        // ✅ Enable All Payment Methods
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,  // Enable wallets like Paytm, PhonePe
          emi: true,
          paylater: true,
        },
        
        // ✅ Enable UPI QR Code (Auto Display)
        display: {
          blocks: {
            upi: {
              name: "UPI",
              instruments: [
                { method: "upi" },
                { method: "upi_intent" }, // Open UPI apps like GPay
                { method: "upi_collect" }, // Show QR code for manual scan
              ],
            },
          },
          sequence: ["block.upi"], // Prioritize UPI
        },
        // theme: { color: "#3399cc" },
        // method: {
          // netbanking: true,
        //   card: true,
        //   upi: true, 
        //   wallet: false,
        // },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };

    return{
        loadRazorpay
    }
}