
import React from 'react'
import emailjs from "emailjs-com";
function SendOrderEmail({ cartItems, netAmount, tax, totalAmount, customerEmail }) {
  
  const sendEmail = () => {
  // mapping our data to the template parameters
  let templateParams = {
	  orders: cartItems.map(item => ({
						name: item.name,
						units: item.quantity,
						price: item.price
					})),
	order_id: Date.now(),
  netamount: totalAmount.toFixed(2),
  pkgCharge : 20.00,
  tax: tax.toFixed(2),
  email: customerEmail
}

    emailjs.send("service_2y3z6aj",
                "template_bu6lwea",
                templateParams,
              "5Ala3C4jPVMeMLMpQ")
      .then( (response) => {
        alert("Email sent successfully", response.status, response.text);
      })
  }
  return (
    <>
      <button onClick={sendEmail}>Send Order Email</button>    
    </>
  )
}
export default SendOrderEmail; 