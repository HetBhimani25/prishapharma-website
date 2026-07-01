import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeading from '../components/SectionHeading';
import galleryData from '../data/gallery.json';

const Gallery = () => {
  const [activeSection, setActiveSection] = useState(galleryData[0].section);
  const [lightboxImage, setLightboxImage] = useState(null);

  const currentImages = galleryData.find((s) => s.section === activeSection)?.images || [];
  const currentIndex = currentImages.findIndex((img) => img.id === lightboxImage?.id);

  const navigateLightbox = (dir) => {
    const newIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
    setLightboxImage(currentImages[newIndex]);
  };

  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="A visual tour of our office, warehouse, delivery operations, and product range."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="section section--gray">
        <div className="container">
          <SectionHeading label="Gallery" title="Behind the Scenes at Prisha Pharma" />

          {/* Tabs */}
          <div className="gallery-tabs">
            {galleryData.map((section) => (
              <button
                key={section.section}
                className={`gallery-tab${activeSection === section.section ? ' active' : ''}`}
                onClick={() => setActiveSection(section.section)}
              >
                {section.section}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              className="gallery-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  className={`gallery-item${i === 0 ? ' gallery-item--large' : ''}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setLightboxImage(img)}
                >
                  <img src={img.url} alt={img.alt} className="gallery-item__img" loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightboxImage.url} alt={lightboxImage.alt} className="lightbox__image" />
              <button className="lightbox__close" onClick={() => setLightboxImage(null)} aria-label="Close lightbox">
                <X size={20} />
              </button>
              <button className="lightbox__nav lightbox__nav--prev" onClick={() => navigateLightbox(-1)} aria-label="Previous image">
                <ChevronLeft size={20} />
              </button>
              <button className="lightbox__nav lightbox__nav--next" onClick={() => navigateLightbox(1)} aria-label="Next image">
                <ChevronRight size={20} />
              </button>
              <p className="lightbox__caption">{lightboxImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
