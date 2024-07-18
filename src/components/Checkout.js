// Checkout.js
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ThankYouModal from "./ThankYouModal";
import "../styles/Checkout.css";

function Checkout() {
    const { cart, clearCart, user } = useContext(CartContext);
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

    const [billingInfo, setBillingInfo] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handleBillingInfoChange = (e) => {
        setBillingInfo({
            ...billingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePayment = (paymentOption) => {
        if (user) {
            setSelectedPaymentOption(paymentOption);
            setShowThankYouModal(true);
        } else {
            alert("Please login before proceeding to payment.");
            // You may want to redirect to the login page here
        }
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="billing-info">
                        <h3>Billing Information</h3>
                        <div className="billing-labels">
                            <label>
                                Name:
                                <input type="text" name="name" value={billingInfo.name} onChange={handleBillingInfoChange} />
                            </label>
                            <label>
                                Address:
                                <input type="text" name="address" value={billingInfo.address} onChange={handleBillingInfoChange} />
                            </label>
                            <label>
                                Phone:
                                <input type="text" name="phone" value={billingInfo.phone} onChange={handleBillingInfoChange} />
                            </label>
                        </div>
                    </div>

                    <p>Total: ${totalAmount.toFixed(2)}</p>

                    <div className="payment-options">
                        <h3>Select Payment Option</h3>
                        <label>
                            <input
                                type="radio"
                                value="paypal"
                                checked={selectedPaymentOption === "paypal"}
                                onChange={() => setSelectedPaymentOption("paypal")}
                            />
                            PayPal
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="stripe"
                                checked={selectedPaymentOption === "stripe"}
                                onChange={() => setSelectedPaymentOption("stripe")}
                            />
                            Stripe
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="cash"
                                checked={selectedPaymentOption === "cash"}
                                onChange={() => setSelectedPaymentOption("cash")}
                            />
                            Cash
                        </label>
                    </div>

                    <button onClick={() => handlePayment(selectedPaymentOption)}>Pay Now</button>

                    {showThankYouModal && (
                        <ThankYouModal
                            onClose={() => {
                                setShowThankYouModal(false);
                                setSelectedPaymentOption("");
                                clearCart();
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Checkout;
