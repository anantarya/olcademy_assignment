// Home.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { fetchProducts } from "../components/api";
import "../styles/Home.css";
import HeroImage from "../components/HeroImage";


function Home() {
  const [featuredProductItems, setFeaturedProductItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Home.js
  useEffect(() => {
    const fetchFeaturedProductItems = async () => {
      try {
        const products = await fetchProducts("fragrances");
        setFeaturedProductItems(products);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProductItems();
  }, []);



  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    navigate(`/menu/${encodeURIComponent(item.title)}`);
  };

  return (
    <div className="home">
      <HeroImage />
      <div className="menuSection">
        <h2>Our Collections</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="menuList">
            {featuredProductItems.map((menuItem, key) => (
              <ProductCard
                key={menuItem.id}
                id={menuItem.id}
                image={menuItem.thumbnail}
                name={menuItem.title}
                price={menuItem.price}
                rating={menuItem.rating}
                brand={menuItem.brand}
                onAddToCart={() => handleAddToCart(menuItem)}
              />
            ))}
          </div>
        )}
        <Link to="/shop">
          <button className="allItemsButton">View All</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
