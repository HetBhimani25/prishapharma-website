import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="not-found">
    <div className="not-found__code">
      <span className="not-found__four">4</span>
      <span className="not-found__zero">0</span>
      <span className="not-found__four">4</span>
    </div>
    <h1 className="not-found__title">Page Not Found</h1>
    <p className="not-found__text">
      The page you're looking for doesn't exist or has been moved. Let us help you find what you need.
    </p>
    <div className="not-found__actions">
      <Link to="/" className="btn btn-primary">
        <Home size={16} /> Back to Home
      </Link>
      <Link to="/products" className="btn btn-outline">
        <ArrowLeft size={16} /> Browse Products
      </Link>
    </div>
  </div>
);

export default NotFound;
