import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockSubscriptions } from '../utils/mockData';
import { formatPrice } from '../utils/formatters';

const Subscriptions = () => {
  const { t } = useTranslation();
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [subscribedPlans, setSubscribedPlans] = useState([]);

  const handleSubscribe = (planId) => {
    if (subscribedPlans.includes(planId)) {
      setSubscribedPlans(subscribedPlans.filter((id) => id !== planId));
    } else {
      setSubscribedPlans([...subscribedPlans, planId]);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>{t('subscriptions.title') || 'Subscription Plans'}</h1>
        <p className="lead text-muted">{t('subscriptions.subtitle') || 'Save more with our weekly & monthly plans'}</p>
      </div>

      <div className="row">
        {mockSubscriptions.map((plan) => (
          <div key={plan.id} className="col-md-4 mb-4">
            <div className={`card h-100 ${plan.popular ? 'border-success border-2' : ''}`}>
              {plan.popular && (
                <div className="card-header bg-success text-white text-center py-2">
                  <span className="badge bg-white text-success">Most Popular</span>
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{plan.name}</h5>
                <p className="text-muted mb-3">{plan.description}</p>

                <div className="mb-3">
                  <div className="display-4 text-success">
                    {formatPrice(plan.price)}
                    <span className="fs-6 text-muted ms-2">/month</span>
                  </div>
                </div>

                <ul className="list-unstyled mb-4 flex-grow-1">
                  {(plan.features || plan.items || []).map((feature, idx) => (
                    <li key={idx} className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      <small>{feature}</small>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn w-100 ${
                    subscribedPlans.includes(plan.id) ? 'btn-outline-danger' : 'btn-success'
                  }`}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {subscribedPlans.includes(plan.id) ? 'Cancel Subscription' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {subscribedPlans.length > 0 && (
        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <div className="card border-success">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Active Subscriptions</h5>
              </div>
              <div className="card-body">
                {subscribedPlans.map((planId) => {
                  const plan = mockSubscriptions.find((p) => p.id === planId);
                  return (
                    <div key={planId} className="mb-3 pb-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{plan.name}</h6>
                          <small className="text-muted">Renews on: 2024-02-15</small>
                        </div>
                        <div className="text-end">
                          <strong className="text-success d-block mb-2">{formatPrice(plan.price)}/month</strong>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleSubscribe(planId)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {subscribedPlans.length === 0 && (
        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <div className="alert alert-info text-center">
              <strong>No active subscriptions</strong>
              <p className="mb-0 mt-2">Choose a plan above to get started with great savings!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
