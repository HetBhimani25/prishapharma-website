import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BrandCard = ({ brand }) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Link
      to={`/products?brand=${encodeURIComponent(brand.name)}`}
      className="brand-card"
      aria-label={`View products by ${brand.name}`}
    >
      <div className="brand-card__logo-wrap">
        <img src={brand.logo} alt={brand.name} className="brand-card__logo" loading="lazy" />
      </div>
      <h3 className="brand-card__name">{brand.name}</h3>
      {brand.description && <p className="brand-card__desc">{brand.description}</p>}
      <div className="brand-card__cta">
        View Products <ArrowRight size={12} />
      </div>
    </Link>
  </motion.div>
);

export default BrandCard;
