import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle, center = true }) => (
  <motion.div
    className={`section-heading${center ? '' : ' section-heading--left'}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {label && <span className="section-heading__label">{label}</span>}
    <h2 className="section-heading__title">{title}</h2>
    {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    <div className="section-heading__accent" />
  </motion.div>
);

export default SectionHeading;
