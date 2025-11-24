import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" to="/">
          🛒 GroceryGo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form
            className="d-flex mx-auto w-50"
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchQuery.trim();
              if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
              else navigate('/products');
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder={t('navbar.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                {t('navbar.home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                {t('navbar.categories')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/subscriptions">
                {t('navbar.subscriptions')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                {t('navbar.orders')}
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={toggleLanguage}
              >
                {i18n.language === 'en' ? 'हिंदी' : 'EN'}
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                {t('navbar.cart')}
                {cartItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems}
                  </span>
                )}
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t('login') || 'Login'}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">{t('signup') || 'Sign Up'}</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">{user?.name || user?.email}</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => { logout(); navigate('/'); }}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
