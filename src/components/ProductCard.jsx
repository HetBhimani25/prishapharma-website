import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => (
  <motion.div
    className="product-card"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    onClick={() => onClick && onClick(product)}
    role="button"
    tabIndex={0}
    aria-label={`View details for ${product.name}`}
    onKeyDown={(e) => e.key === 'Enter' && onClick && onClick(product)}
  >
    <div className="product-card__image-wrap">
      <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
      <span className="product-card__badge">{product.category}</span>
    </div>
    <div className="product-card__body">
      <p className="product-card__brand">{product.brand}</p>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__desc">{product.description}</p>
      <div className="product-card__footer">
        <span className="product-card__pack">{product.pack}</span>
        <span className="product-card__cta">View Details →</span>
      </div>
    </div>
  </motion.div>
);

export default ProductCard;
