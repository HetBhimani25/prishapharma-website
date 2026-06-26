import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Pill, Beaker, Tag } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row pointer-events-auto"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-gray-100 rounded-full shadow-sm backdrop-blur-md transition-colors"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center min-h-[300px]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-[400px] object-contain drop-shadow-xl"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                      {product.brand}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Beaker className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Composition / Salt</p>
                      <p className="text-gray-900 font-medium">{product.salt}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <Pill className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Strength</p>
                        <p className="text-gray-900 font-medium">{product.strength}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <Package className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Pack Size</p>
                        <p className="text-gray-900 font-medium">{product.pack}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</p>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
