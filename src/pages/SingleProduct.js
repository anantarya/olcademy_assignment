// SingleProduct.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { fetchProducts } from "../components/api";
import "../styles/SingleProduct.css";

function SingleProduct() {
    const { title } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    // const { cart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!title) {
                    return;
                }

                const response = await fetchProducts("fragrances");

                const productsArray = Array.isArray(response) ? response : [];

                const selectedProduct = productsArray.find(
                    (item) => item.title === title
                );

                if (selectedProduct) {
                    setProduct(selectedProduct);
                } else {
                    console.error("Product not found!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [title]);



    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity: 1 });
        }
    };

    if (!product) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="singleProductContainer">
            <div className="singleProductImages">
                <img src={product.images[0]} alt={product.title} />
                <div className="thumbnailImages">
                    {product.images.map((image, index) => (
                        <img key={index} src={image} alt={`Thumbnail ${index + 1}`} />
                    ))}
                </div>
            </div>
            <div className="singleProductDetails">
                <h2>{product.title}</h2>
                <p className="description">{product.description}</p>
                <div className="infoContainer">
                    <p className="price">Price: ${product.price}</p>
                    <p className="discount">Discount: -{product.discountPercentage}%</p>
                    <p className="rating">Rating: {product.rating}</p>
                    <p className="brand">Brand: {product.brand}</p>
                    <p className="stock">In Stock: {product.stock} units</p>
                </div>
                <div className="cart-btns">

                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                    <Link to="/cart" className="cartLink">
                        <button className="go-to-cart-btn" >Go to Cart <i className="bi bi-arrow-up-right-circle-fill" ></i></button>

                    </Link>


                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
