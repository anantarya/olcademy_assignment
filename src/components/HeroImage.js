import React from "react";
import "../styles/HeroImage.css";
import perfume2 from '../assets/perfume2.jpg'
import { Link } from "react-router-dom";

const HeroImage = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Discover a World of Amazing Fragrances</h1>
                <p className="hero-subtitle">
                    Elevate your senses with our carefully curated collection.
                </p>
                <Link className="hero-button" to='/shop'>Shop Now </Link>
            </div>
            <img
                className="hero-image"
                src={perfume2}
                alt="Hero"
            />
        </div>
    );
};

export default HeroImage;
