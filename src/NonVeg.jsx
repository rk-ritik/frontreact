import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchVegProducts } from './store';
import { toast } from 'react-toastify';

function NonVeg() {

  const dispatch = useDispatch();

  // call the think when he page loading 
  useEffect( () => {
    dispatch(fetchVegProducts());
  }, []);

  //After above line execution initial State is ready then only get the items using useSelect 

  // get the veg items from the store
  const {loading, vegItems, error} =  useSelector( (globalState) => globalState.veg );
 
 let VegListItems =  vegItems.map( (item) => (
    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center"> 
      {item.id} {item.name} - ${item.price} 
      <button onClick={() => {dispatch(addToCart(item)); 
                              toast.success(`Product ${item.name} added Successfully`,
                                {
                                  position: "top-center",
                                  closeOnClick: true, 
                                  autoClose: 10000,
                                  pauseOnHover: true,
                                }
                              );
                              }}>
                                
                                 AddToCart </button>
    </li>
 ))





  return (
    <>
    
      <h1 className='headerstyles'> This is Veg section</h1>
      <ul className="list-group container mt-4">
        {VegListItems}
      </ul>
    </>
  )
}

export default NonVeg;