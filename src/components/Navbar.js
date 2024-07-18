import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Logo from '../assets/perfumelogo.png';
import '../styles/Navbar.css';
import { useContext } from 'react';

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, login,  logout } = useAuth();

  const handleLogout = () => {
    // Handle logout and redirect to home
    logout();
    redirectToHome();
  };

  const redirectToHome = () => {
    // Use this callback for redirection
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <Link to='/'><img src={Logo} alt="Logo" /></Link>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="cartLink">
            <i className="bi bi-bag"></i>
            {cart.length > 0 ? <span className="cartCount">{cart.length}</span> : null}
          </Link>
        </div>
        <div className="userSection">
          {user ? (
            <>
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt="User Avatar" />
                ) : (
                  <i className="bi bi-person"></i>
                )}
              </div>
              <div className="dropdown">
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">My Orders</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <div className="avatar">
              <i className="bi bi-person"></i>
              <div className="dropdown">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
