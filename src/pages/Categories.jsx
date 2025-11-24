import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../utils/mockData';

const Categories = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Browse Categories</h1>
      <div className="row g-3">
        {mockCategories.map((category) => (
          <div key={category.id} className="col-12">
            <Link
              to={`/products?category=${category.key}`}
              className="text-decoration-none"
            >
              <div className="card p-3 h-100">
                <div className="d-flex align-items-center">
                  <div style={{ fontSize: '48px' }} className="me-3">
                    {category.icon}
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{category.name}</h5>
                    <p className="text-muted mb-0">{category.count} items available</p>
                  </div>
                  <div className="text-success fw-bold">&gt;</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
