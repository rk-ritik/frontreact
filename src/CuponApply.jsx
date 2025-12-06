import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { applyCoupon } from './store';

function CuponApply() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const handleApply = () => {
    dispatch(applyCoupon(input));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter coupon"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleApply}>Apply Coupon</button>
    </>
  )
}
export default CuponApply