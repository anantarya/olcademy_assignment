// Menu.js
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../components/api";
import "../styles/Shop.css";

function Shop() {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    const fetchProductItems = async () => {
      try {
        const products = await fetchProducts("fragrances");
        setProductItems(products);
      } catch (error) {
      }
    };

    fetchProductItems();
  }, []);

  return (
    <div className="menu">
      <h1 className="menuTitle">All Perfumes</h1>
      <div className="menuList">
        {productItems.map((menuItem) => (
          <ProductCard
            key={menuItem.id}
            image={menuItem.thumbnail} // Assuming 'thumbnail' contains the main image URL
            name={menuItem.title}
            price={menuItem.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
