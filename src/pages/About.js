import React from "react";
import perfume4 from "../assets/about.jpg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${perfume4})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
          Welcome to our Perfume Shop, where fragrance becomes an art form. As passionate curators of scents, we embark on a journey to elevate your senses. Our online boutique is a haven for perfume enthusiasts, offering a carefully curated collection of exquisite fragrances that transcend the ordinary. Each bottle is a masterpiece, selected for its unique blend, lasting allure, and the emotions it evokes. Founded on the belief that scent is a powerful expression of individuality, we strive to connect you with exceptional aromas that resonate with your personality. Discover a world of olfactory delights at [Your Perfume Shop], where every purchase is an immersive experience in luxury and sophistication.
        </p>
      </div>
    </div>
  );
}

export default About;
