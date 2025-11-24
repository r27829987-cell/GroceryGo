import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';
import SlotPicker from '../components/SlotPicker';

const Checkout = () => {
  const { t } = useTranslation();
  const { cart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    slotDate: null,
    slotTime: null,
    slotCharge: 0,
    paymentMethod: 'card',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSlotSelect = ({ date, slot }) => {
    setFormData((prev) => ({
      ...prev,
      slotDate: date,
      slotTime: slot.time,
      slotCharge: slot.charge,
    }));
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      return formData.firstName && formData.email && formData.address && formData.city && formData.zip;
    }
    if (currentStep === 2) {
      return formData.slotDate && formData.slotTime;
    }
    if (currentStep === 3) {
      return formData.paymentMethod;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (validateStep(4)) {
      // Save order to mock data or API
      navigate('/orders', {
        state: {
          message: 'Order placed successfully!',
        },
      });
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const delivery = formData.slotCharge || 40;
  const total = subtotal + tax + delivery;

  return (
    <div className="container py-5">
      <h1 className="mb-4">{t('checkout.title') || 'Checkout'}</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>Step {step} of 4</h5>
                <div className="progress w-50">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Address */}
              {step === 1 && (
                <div>
                  <h5 className="mb-3">{t('checkout.address') || 'Delivery Address'}</h5>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Full Address"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Slot */}
              {step === 2 && (
                <div>
                  <h5 className="mb-3">{t('checkout.slot') || 'Select Delivery Slot'}</h5>
                  <SlotPicker onSlotSelect={handleSlotSelect} />
                </div>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <div>
                  <h5 className="mb-3">{t('checkout.payment') || 'Payment Method'}</h5>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="card">
                        Credit/Debit Card
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="upi">
                        UPI
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="wallet"
                        name="paymentMethod"
                        value="wallet"
                        checked={formData.paymentMethod === 'wallet'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="wallet">
                        Digital Wallet
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="cod">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div>
                  <h5 className="mb-3">Review Your Order</h5>
                  <div className="mb-3">
                    <strong>Delivery Address:</strong>
                    <p>
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.zip}
                      <br />
                      {formData.phone}
                    </p>
                  </div>
                  <div className="mb-3">
                    <strong>Delivery Slot:</strong>
                    <p>
                      {formData.slotDate} at {formData.slotTime}
                    </p>
                  </div>
                  <div className="mb-3">
                    <strong>Payment Method:</strong>
                    <p className="text-capitalize">{formData.paymentMethod}</p>
                  </div>
                </div>
              )}

              <div className="d-flex gap-3 mt-4">
                {step > 1 && (
                  <button className="btn btn-outline-secondary" onClick={() => setStep(step - 1)}>
                    Previous
                  </button>
                )}
                {step < 4 && (
                  <button className="btn btn-success" onClick={handleNextStep}>
                    Next
                  </button>
                )}
                {step === 4 && (
                  <button className="btn btn-success" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-md-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              {cart.map((item) => (
                <div key={item.id} className="mb-2">
                  <small>
                    {item.quantity}x {item.name}
                  </small>
                  <br />
                  <small className="text-muted">{formatPrice(item.price * item.quantity)}</small>
                </div>
              ))}
              <hr />
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <small>Subtotal</small>
                  <small>{formatPrice(subtotal)}</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small>Tax (5%)</small>
                  <small>{formatPrice(tax)}</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small>Delivery Charge</small>
                  <small>₹{delivery}</small>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span className="text-success">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
