import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>About GroceryGo</h5>
            <p className="small">Fresh groceries at your doorstep with fast delivery</p>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-light-50">Contact</a></li>
              <li><a href="#" className="text-light-50">FAQ</a></li>
              <li><a href="#" className="text-light-50">Careers</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Support</h5>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-light-50">Privacy Policy</a></li>
              <li><a href="#" className="text-light-50">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Connect</h5>
            <p className="small">
              <a href="#" className="text-light-50">Facebook</a> | 
              <a href="#" className="text-light-50"> Twitter</a> | 
              <a href="#" className="text-light-50"> Instagram</a>
            </p>
          </div>
        </div>
        <hr />
        <div className="text-center small text-light-50">
          <p>© 2024 Developed by HK Industries </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
