import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Dashboard from "./Home";
import Login from "./Login";
import Admin from "./Admin";
import Register from "./Register";
import Inventory from "./Inventory";
import AddProduct from "./AddProduct";
import ProductItem from "./ProductItem";
import ProductList from "./ProductList";
import repository from "./repository"
// import AdminRegister from "./components/AdminRegister";
// import AdminProfile from "./components/AdminProfile";
 import Category from "./Category";
 import AddCategory from "./AddCategory";
 import UpdateCategory from "./UpdateCategory";
 import Cart from './Cart';
 import CartItem from './CartItem';
 import Checkout from './Checkout';
// import MedicineTypes from "./components/MedicineTypes";
// import AddType from "./components/AddType";
// import UpdateType from "./components/UpdateType";
 
// import AddMedicine from "./components/AddMedicine";
 import UpdateProduct from "./UpdateProduct.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/addproduct" element={<AddProduct />} />
      <Route exact path="/addcategory" element={<AddCategory />} />
      <Route exact path="/categories" element={<Category />} />
      <Route exact path="/updatecategory" element={<UpdateCategory />} />
      <Route exact path="/inventory" element={<Inventory />} />
      <Route exact path="/updateproduct" element={<UpdateProduct />} />
      <Route exact path="/productitem" element={<ProductItem />} />
      <Route exact path="/productlist" element={<ProductList />} />
      <Route exact path="/cartitem" element={<CartItem /> }/>
      <Route exact path="/cart" element={<Cart /> }/>
      <Route exact path="/checkout" element={<Checkout /> }/>
       {/* <Route exact path="/" element={<Home />} />
        
         <Route exact path="/register" element={<AdminRegister />} />
        <Route exact path="/profile" element={<AdminProfile />} />
        <Route exact path="/categories" element={<MedicineCategory />} />
        <Route exact path="/addcategory" element={<AddCategory />} />
        
        <Route exact path="/types" element={<MedicineTypes />} />
        <Route exact path="/addtype" element={<AddType />} />
        <Route exact path="/updatetype" element={<UpdateType />} />
       
        <Route exact path="/addmedicine" element={<AddMedicine />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;