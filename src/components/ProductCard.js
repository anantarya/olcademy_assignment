import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css"; // Import the CSS file

function ProductCard({id, image, name, price, rating, brand }) {
  return (
    <Link to={`/shop/${name}`} className="menu-link">
      <div className="product-card">
        <div className="product-front">
          <div className="shadow" />
          <img src={image} alt={name} />
          <div className="image_overlay" />
          <div className="view-details">View details</div>
          <div className="stats-container">
            <div className="product-info">
              <span className="product-name">{name}</span>
              <span className="product-price">${price}</span>
            </div>
            <div className="product-options">
              <strong>RATING</strong>
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
