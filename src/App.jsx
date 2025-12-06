import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg"

import Pagination from "./Pagination";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { use } from "react";
import Orders from "./Orders";
import { ToastContainer } from "react-toastify";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";

function App() {

 let Cartitems = useSelector( globalState => globalState.cart);
 
 let cartCount = Cartitems.reduce( (total, item) => total + item.quantity,0);

  return (
    <>
      <ToastContainer />

      <BrowserRouter>

        {/* Simple Navigation */}
       
        <Link to="/home">Home</Link>
         <Link to="/veg">Veg Items</Link>
            <Link to="/nonveg">Non Veg</Link>
      
            <Link to="/cart">Cart {cartCount}</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/register">Registration</Link>
            <Link to="/login">Login</Link>

          
        {/* Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
            <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders/>}></Route>
          <Route path="/register" element={<RegistrationForm/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
