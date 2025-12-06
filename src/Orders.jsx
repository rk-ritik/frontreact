import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from './store';

function Orders() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  
   //
   const { ordersDetails, loading, error } = useSelector((globalState) => globalState.allorders);
   console.log(ordersDetails);

  return (
    <>
      <h2>All Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}


      {ordersDetails.map((order) => (
        <div
          key={order._id}
          style={{
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid gray",
          }}
        >
          <h3>Order ID: {order._id}</h3>
          <p>Total Amount: ₹{order.totalAmount}</p>
          <p>Order Date: {new Date(order.Orderdate).toLocaleString()}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} — ₹{item.price} × {item.qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default Orders;