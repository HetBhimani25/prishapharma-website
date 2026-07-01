import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Tag, Building2, Layers } from 'lucide-react';
import agencyData from '../data/agency.json';

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Product details: ${product.name}`}
      >
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className="modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          <img src={product.image} alt={product.name} className="modal__image" />

          <div className="modal__pill-wrap">
            <span className="modal__pill">{product.category}</span>
          </div>

          <div className="modal__body">
            <h2 className="modal__title">{product.name}</h2>
            <p className="modal__desc">{product.description}</p>

            <div className="modal__meta-grid">
              <div className="modal__meta-item">
                <Building2 size={20} className="modal__meta-icon" />
                <div>
                  <span className="modal__meta-label">Brand</span>
                  <span className="modal__meta-value">{product.brand}</span>
                </div>
              </div>
              <div className="modal__meta-item">
                <Package size={20} className="modal__meta-icon" />
                <div>
                  <span className="modal__meta-label">Pack Size</span>
                  <span className="modal__meta-value">{product.pack}</span>
                </div>
              </div>
              <div className="modal__meta-item">
                <Layers size={20} className="modal__meta-icon" />
                <div>
                  <span className="modal__meta-label">Category</span>
                  <span className="modal__meta-value">{product.category}</span>
                </div>
              </div>
              <div className="modal__meta-item modal__meta-item--accent">
                <Tag size={20} className="modal__meta-icon" />
                <div>
                  <span className="modal__meta-label">Product ID</span>
                  <span className="modal__meta-value">#{String(product.id).padStart(4, '0')}</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${agencyData.whatsapp.replace(/\D/g, '')}?text=Hi, I'm interested in ${encodeURIComponent(product.name)} (${product.pack}) from ${product.brand}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal__cta"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
