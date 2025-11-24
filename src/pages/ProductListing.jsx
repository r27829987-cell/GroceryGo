import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockProducts } from '../utils/mockData';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const [priceFilter, setPriceFilter] = useState(1000);
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesPrice = product.price <= priceFilter;
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      (product.description || '').toLowerCase().includes(query);
    return matchesCategory && matchesPrice && matchesQuery;
  });

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t('product.price')}</h5>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1000"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
              />
              <p className="mt-2">Up to ₹{priceFilter}</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              {query
                ? `Search results for "${query}"`
                : category
                ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                : 'All Products'}
            </h2>
            <span className="text-muted">
              Showing {filteredProducts.length} products
            </span>
          </div>
          <div className="row g-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="alert alert-info text-center">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
