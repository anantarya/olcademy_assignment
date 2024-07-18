import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const handleIncrement = (item) => {
        updateQuantity(item, item.quantity + 1);
    };

    const handleDecrement = (item) => {
        const newQuantity = Math.max(1, item.quantity - 1);
        updateQuantity(item, newQuantity);
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. Add some items first.</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <div className="quantity-control">
                                            <button className="inc-dec-btn" onClick={() => handleDecrement(item)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="inc-dec-btn" onClick={() => handleIncrement(item)}>+</button>
                                        </div>
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => removeFromCart(item)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/checkout">
                        <button>Proceed to Checkout</button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default Cart;
