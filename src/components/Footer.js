import React, { useEffect, useState } from "react";
import "../styles/Footer.css";

function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      setIsFooterVisible(isScrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`footer ${isFooterVisible ? 'visible' : 'hidden'}`}>
      <div className="socialMedia">
        <i className="bi bi-instagram"></i>
        <i className="bi bi-twitter"></i>
        <i className="bi bi-facebook"></i>
        <i className="bi bi-linkedin"></i>
      </div>
      <p>&copy; Created by <a href="https://www.linkedin.com/in/anant-arya-30044522a/" className="fw-bold a-link" target="_blank" rel="noopener noreferrer">Anant Arya</a></p>
    </div>
  );
}

export default Footer;
