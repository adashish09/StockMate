import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const closeMenu = () => {
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm" style={{ fontSize: '1.1rem' }}>
      <div className="container-fluid">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3437/3437363.png"
            alt="logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold fs-4">StockMate</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={closeMenu}>
                  <i className="bi bi-box-arrow-in-right me-1"></i>Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/account" onClick={closeMenu}>
                  <i className="bi bi-person-circle me-1"></i>Account
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about-us" onClick={closeMenu}>
                <i className="bi bi-info-circle-fill me-1"></i>About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact-us" onClick={closeMenu}>
                <i className="bi bi-envelope-fill me-1"></i>Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
