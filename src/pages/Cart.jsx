import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const Cart = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '80px' }}>🛒</div>
        <h2 className="mt-3">{t('cart.empty')}</h2>
        <Link to="/products" className="btn btn-success btn-lg mt-3">
          {t('cart.continueShopping')}
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const delivery = 40;
  const total = subtotal + tax + delivery;

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('cart.title')}</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                        />
                        {item.name}
                      </div>
                    </td>
                    <td>{formatPrice(item.price)}</td>
                    <td>
                      <div className="input-group" style={{ width: '100px' }}>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="fw-bold">{formatPrice(item.price * item.quantity)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>{t('cart.subtotal')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>{t('cart.tax')}</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>{t('cart.delivery')}</span>
                <span>₹{delivery}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>{t('cart.total')}</span>
                <span className="text-success">{formatPrice(total)}</span>
              </div>
              <Link to="/checkout" className="btn btn-success w-100">
                {t('cart.checkout')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
