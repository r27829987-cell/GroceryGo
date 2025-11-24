import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockProducts } from '../utils/mockData';
import { Link } from 'react-router-dom';

export default function SavedItems() {
  const { user } = useAuth();
  const saved = user?.savedItems || [];

  if (saved.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '80px' }}>💾</div>
        <h2 className="mt-3">No Saved Items</h2>
        <p className="text-muted">Browse products and tap the save icon to keep them here.</p>
        <Link to="/products" className="btn btn-primary mt-3">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Saved Items</h1>
      <div className="row">
        {saved.map((id) => {
          const p = mockProducts.find((m) => m.id === id);
          if (!p) return null;
          return (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={p.image} className="card-img-top" alt={p.name} style={{ height: 160, objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="card-text text-muted small">{p.quantity}</p>
                  <div className="mt-auto">
                    <Link to={`/products/${p.id}`} className="btn btn-sm btn-outline-primary">View</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
