import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockCategories, mockProducts, mockSubscriptions } from '../utils/mockData';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-success text-white py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">{t('home.welcome')}</h1>
          <p className="lead">{t('home.tagline')}</p>
          <Link to="/products" className="btn btn-light btn-lg">
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">{t('home.browseCategories')}</h2>
          <div className="row g-3">
            {mockCategories.map((category) => (
              <div key={category.id} className="col-md-3 col-sm-6">
                <Link to={`/products?category=${category.key}`} className="text-decoration-none">
                  <div className="card h-100 text-center">
                    <div className="card-body">
                      <div style={{ fontSize: '48px' }}>{category.icon}</div>
                      <h5 className="card-title mt-2">{category.name}</h5>
                      <p className="card-text text-muted">{category.count} items</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{t('home.featured')}</h2>
            <Link to="/products" className="btn btn-outline-success">
              View All
            </Link>
          </div>
          <div className="row g-3">
            {mockProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="col-md-3 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">{t('home.subscriptions')}</h2>
          <div className="row g-3">
            {mockSubscriptions.map((sub) => (
              <div key={sub.id} className="col-md-6">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={sub.image}
                        className="img-fluid rounded-start"
                        alt={sub.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{sub.name}</h5>
                        <p className="card-text small">{sub.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <strong className="text-success">₹{sub.price}</strong>
                            <span className="text-muted text-decoration-line-through ms-2">
                              ₹{sub.originalPrice}
                            </span>
                          </span>
                          <span className="badge bg-warning">{sub.savings}</span>
                        </div>
                        <button className="btn btn-success btn-sm mt-2 w-100">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
