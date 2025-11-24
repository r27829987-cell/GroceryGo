import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../utils/mockData';
import { formatPrice } from '../utils/formatters';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const product = mockProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <button className="btn btn-success" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.svg';
            }}
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">{product.quantity}</p>
          <div className="mb-3">
            <span className="text-warning">★ {product.rating}</span>
            <span className="text-muted ms-2">({product.reviews} reviews)</span>
          </div>
          <div className="mb-4">
            <span className="display-6 text-success">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-decoration-line-through text-muted ms-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mb-4">{product.description}</p>
          <div className="mb-4">
            {product.availability ? (
              <p className="text-success">In Stock ({product.inStock} available)</p>
            ) : (
              <p className="text-danger">Out of Stock</p>
            )}
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-success btn-lg flex-grow-1"
              onClick={() => {
                addToCart(product, 1);
                alert(t('common.success'));
              }}
              disabled={!product.availability}
            >
              {t('product.addToCart')}
            </button>
            <button className="btn btn-outline-secondary btn-lg">♥</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
