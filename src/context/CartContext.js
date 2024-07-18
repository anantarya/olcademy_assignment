import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const existingItem = cart.find((product) => product.id === item.id);

        if (existingItem) {
            // If the item already exists in the cart, increment its quantity
            updateQuantity(item, existingItem.quantity + 1);
        } else {
            // If the item doesn't exist in the cart, add it with a quantity of 1
            setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item) => {
        setCart((prevCart) => prevCart.filter((product) => product !== item));
    };

    const updateQuantity = (item, newQuantity) => {
        const updatedCart = cart.map((product) =>
            product.id === item.id ? { ...product, quantity: newQuantity } : product
        );
        setCart(updatedCart);
    };


    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
