import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import SingleProduct from "./pages/SingleProduct";
import Contact from "./pages/Contact";
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserProfile from "./components/UserProfile";
import MyOrders from "./components/MyOrders";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop/:title" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Login />} />
        <Route path="/orders" element={user ? <MyOrders /> : <Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
