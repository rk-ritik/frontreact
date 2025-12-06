import React from 'react'

function Addnumbers({num1=0,num2=0})
{
  return (
    <>
      <h2>Number 1: {num1}</h2>
      <h2>Number 2: {num2}</h2>
      <h3>Sum: {num1 + num2}</h3>
    </>
  )
}
export default Addnumbers;