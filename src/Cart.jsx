import React, { use, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder, removeFromCart } from './store';
import CuponApply from './CuponApply';
import SendOrderEmail from './SendOrderEmail';
import { useNavigate } from 'react-router-dom';
import confetti from "canvas-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";


import { QRCodeCanvas } from "qrcode.react";


function Cart() {

  //get the cart items from the global state
  let Cartitems = useSelector( globalState => globalState.cart);

  //Gte the cupon state
  // let cuponState = useSelector( globalState => globalState.cupon);  
  
  // this is object destructuring
  let { discount, applied, code,message }  = useSelector( globalState => globalState.cupon);  

   let [percentage,setPercent] = useState(0);
   let GST = 18;

  const allCalculations = useMemo(() => {
      const totalAmount = Cartitems.reduce((t, item) => t + item.price * item.quantity, 0);
       const discountAmount = (totalAmount * percentage) / 100;
       const priceAfterDiscount = totalAmount - discountAmount;
       const gstAmount = (priceAfterDiscount * GST) / 100;

	   console.log("📊 Cart Calculations WITHOUT useMemo:", { totalAmount, discountAmount, priceAfterDiscount, gstAmount });

     return { totalAmount, discountAmount, priceAfterDiscount, gstAmount };
    },[]);

   const { totalAmount, discountAmount, priceAfterDiscount, gstAmount } =  allCalculations;
  
  const couponAmount = applied ? (totalAmount * discount) / 100 : 0;

   let dispatch = useDispatch();
   
   let listItems = Cartitems.map( item => (
    <div>
    <li> {item.id} {item.name} {item.price} {item.quantity}</li>
    <button onClick={ () => {dispatch(removeFromCart(item))
        toast.error(`Product ${item.name} removed suucessfully...`,{
      position: "bottom-left",  closeOnClick: true,  autoClose: 2500,
    })
    }}>Remove</button>
    </div>
   )
  ) 

  //state to hold customer email
  const [customerEmail, setCustomerEmail] = useState('');
  
  let {loading, error,successMessage} = useSelector( globalState=> globalState.orders);
  console.log(successMessage);
  
  let navigate = useNavigate();

  //handle Checkout logics 
  // let handleCheckout = () =>{
  //   const orderData = {
  //     items: Cartitems,
  //     totalAmount: totalAmount,
  //     Orderdate: new Date(), // ✔ today's date
  //   };

  //   dispatch(placeOrder(orderData)); 

  //   navigate("/orders");
  // }

let handleCheckout = () => {
  const orderData = {
    items: Cartitems,
    totalAmount: totalAmount,
    Orderdate: new Date(),
  };

  dispatch(placeOrder(orderData))
    .unwrap()
    .then(() => {

      let timerInterval;

      Swal.fire({
        title: "Order Placed Successfully!",
        html: "Redirecting in <b></b> seconds...",
        icon: "success",
        timer: 10000,
        timerProgressBar: true,

        // 🚀 Run AFTER popup is fully opened
        didOpen: () => {
          // 🎉 Confetti comes AFTER popup opens
          launchConfetti();

          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 100);
        },

        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then(() => {
        navigate("/orders");
      });

    })
    .catch((err) => {
      Swal.fire({
        title: "Order Failed!",
        text: err,
        icon: "error",
      });
    });
};

  
   // above line & below line having big gap 





  const upiID = "9241333130@kotak";
  const payerName = "Raju Rani Store";

  const upiLink = `upi://pay?pa=${upiID}&pn=${payerName}&am=${totalAmount}&cu=INR`;

  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    toast("This is a Good Morning message....");
  }, []);


  return (
    <>
     
      <ul>
        {listItems}
      </ul>
      <CuponApply />
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPercent(10)}>Apply 10% Discount</button>
        <button onClick={() => setPercent(20)} style={{ marginLeft: "10px" }}>
          Apply 20% Discount
        </button>
        <button onClick={() => setPercent(30)} style={{ marginLeft: "10px" }}>
          Apply 30% Discount
        </button>
      </div>

      <h1> Total Amount {totalAmount}</h1>
      <h1> Discount per {percentage}% Discount Amount {discountAmount} </h1>
      <h1> Price After Discount {priceAfterDiscount} </h1>
      <h1> GST (18%) {gstAmount} </h1>
       {applied && <p>Coupon ({code}): -₹{couponAmount.toFixed(2)} - {message}</p>}

       <div className="email-section">
              <h4>📧 Enter your email to receive the order details:</h4>
              <input
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            {/* <SendOrderEmail
        cartItems={Cartitems}
        netAmount={netAmount}
        tax={gst}
        totalAmount={totalAmount}
        customerEmail={customerEmail}
      /> */}


       <button onClick={() => setShowQR(true)}>
        Scanner (Pay Now)
      </button>
      {
        showQR && (
           <div style={{padding:90}}>
           <h2>Scan to Pay</h2>
           <h2>total Amount {totalAmount}</h2>
           <QRCodeCanvas value={upiLink} size={250}/>
           <p> UPI id: {upiID}</p>
           </div>
        )
      }


       <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px"
        }}
      >
        Checkout
      </button>

    </>
  )
}
export default Cart;




function launchConfetti() {
  const myCanvas = document.createElement("canvas");
  myCanvas.id = "confettiCanvas";
  myCanvas.style.position = "fixed";
  myCanvas.style.top = 0;
  myCanvas.style.left = 0;
  myCanvas.style.width = "100%";
  myCanvas.style.height = "100%";
  myCanvas.style.pointerEvents = "none";
  myCanvas.style.zIndex = 999999;   // 🔥 ABOVE SweetAlert
  document.body.appendChild(myCanvas);

  const confettiInstance = confetti.create(myCanvas, { resize: true });
  confettiInstance({
    particleCount: 2000,
    spread: 900,
  });

  // Remove canvas after 1 sec
  setTimeout(() => {
    myCanvas.remove();
  }, 12000);
}