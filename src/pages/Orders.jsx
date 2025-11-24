import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { mockOrders, mockProducts } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';

const Orders = () => {
  const { t } = useTranslation();
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState(() => {
    // prefer user-specific orders if available, otherwise use mockOrders
    try {
      if (user && user.orders && user.orders.length) return user.orders.slice();
      const guest = localStorage.getItem('guest_orders');
      if (guest) return JSON.parse(guest);
    } catch (e) {
      // ignore
    }
    return mockOrders.slice();
  });

  useEffect(() => {
    // when user changes (login), sync orders from user
    if (user && user.orders) setOrders(user.orders.slice());
  }, [user]);

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger',
    };
    return statusMap[status] || 'secondary';
  };

  const getStatusTimeline = (status) => {
    const steps = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(status);
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      label: step.charAt(0).toUpperCase() + step.slice(1),
    }));
  };

  const cancelOrder = (orderId) => {
    const ok = window.confirm('Are you sure you want to cancel this order?');
    if (!ok) return;
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled', cancelledDate: new Date().toISOString().split('T')[0] } : o));
      // persist
      if (user && updateUser) {
        updateUser({ orders: next });
      } else {
        localStorage.setItem('guest_orders', JSON.stringify(next));
      }
      return next;
    });
  };

  if (mockOrders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '80px' }}>📋</div>
        <h2 className="mt-3">{t('orders.empty') || 'No Orders Yet'}</h2>
        <p className="text-muted">{t('orders.emptyDesc') || 'Start shopping to place your first order'}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('orders.title') || 'My Orders'}</h1>
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="card-title mb-0">Order #{order.id}</h6>
                    <small className="text-muted">{order.date}</small>
                  </div>
                  <span className={`badge bg-${getStatusBadge(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <hr />
                <div className="mb-3">
                  <strong>{order.items.length} items</strong> - {formatPrice(order.total)}
                </div>

                <button
                  className="btn btn-outline-success btn-sm w-100 mb-3"
                  onClick={() =>
                    setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                  }
                >
                  {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                </button>

                {expandedOrderId === order.id && (
                  <div>
                    <hr />
                    <h6>Items</h6>
                    <ul className="list-unstyled mb-3">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-center">
                          {typeof item === 'string' ? (
                            <small>{item}</small>
                          ) : (
                            <>
                              {/* Thumbnail + link if productId exists */}
                              {item.productId ? (
                                <Link to={`/products/${item.productId}`} className="me-2 d-flex align-items-center text-decoration-none">
                                  {(() => {
                                    const p = mockProducts.find((pp) => pp.id === item.productId);
                                    return p ? (
                                      <img src={p.image} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} className="me-2" />
                                    ) : (
                                      <div style={{ width: 48, height: 48 }} className="me-2 bg-light" />
                                    );
                                  })()}
                                  <div>
                                    <strong className="d-block">{item.name}</strong>
                                    <small className="text-muted">
                                      {item.quantity ? `× ${item.quantity}` : ''} {item.price ? `— ${formatPrice(item.price)}` : ''}
                                    </small>
                                  </div>
                                </Link>
                              ) : (
                                <div>
                                  <strong>{item.name}</strong>
                                  {item.quantity ? ` × ${item.quantity}` : ''}
                                  {item.price ? ` — ${formatPrice(item.price)}` : ''}
                                </div>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>

                    <h6>Delivery Timeline</h6>
                    <div className="timeline">
                      {getStatusTimeline(order.status).map((step, idx) => (
                        <div key={step.step} className="d-flex mb-2">
                          <div className="me-2" style={{ minWidth: '30px' }}>
                            <div
                              className={`rounded-circle d-flex align-items-center justify-content-center ${
                                step.completed ? 'bg-success text-white' : 'bg-light text-muted'
                              }`}
                              style={{ width: '30px', height: '30px', fontSize: '12px' }}
                            >
                              {step.completed ? '✓' : idx + 1}
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <strong>{step.label}</strong>
                            {step.completed && <small className="text-success ms-2">✓ Completed</small>}
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.status === 'delivered' && (
                      <div className="alert alert-success mt-3 mb-0">
                        <small>
                          <strong>Delivered on:</strong> {order.deliveredDate}
                        </small>
                      </div>
                    )}

                    {order.status !== 'cancelled' && ['pending', 'confirmed'].includes(order.status) && (
                      <div className="mt-3">
                        <button className="btn btn-danger btn-sm" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                      </div>
                    )}
                    {order.status === 'cancelled' && (
                      <div className="alert alert-warning mt-3 mb-0">
                        <small>
                          <strong>Cancelled on:</strong> {order.cancelledDate || 'N/A'}
                        </small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
