import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { formatPrice, getDiscountPercentage } from '../utils/formatters';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const discount = getDiscountPercentage(product.originalPrice, product.price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    alert(t('common.success'));
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }}
          onClick={() => navigate(`/products/${product.id}`)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder.svg';
          }}
        />
        {discount > 0 && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text small text-muted">{product.quantity}</p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-success fw-bold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-decoration-line-through text-muted small">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <small className="text-warning">★ {product.rating} ({product.reviews})</small>
        <small className="text-muted mt-1">
          {product.availability ? `${product.inStock} in stock` : 'Out of stock'}
        </small>
        <div className="d-flex gap-2 mt-3">
          <input
            type="number"
            className="form-control form-control-sm"
            min="1"
            max={product.inStock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ width: '60px' }}
          />
          <button
            className="btn btn-success btn-sm flex-grow-1"
            onClick={handleAddToCart}
            disabled={!product.availability}
          >
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
