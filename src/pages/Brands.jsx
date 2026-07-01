import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionHeading from '../components/SectionHeading';
import BrandCard from '../components/BrandCard';
import brandsData from '../data/brands.json';

const Brands = () => (
  <div>
    <PageHeader
      title="Our Brands"
      subtitle="We are proud to distribute products from India's most trusted and certified pharmaceutical companies."
      breadcrumbs={[{ label: 'Brands' }]}
    />

    <section className="section section--gray">
      <div className="container">
        <SectionHeading label="Partner Brands" title="Trusted Pharmaceutical Companies" subtitle="Click on any brand to browse their products in our catalogue." />
        <div className="brands-grid">
          {brandsData.map((brand, i) => (
            <motion.div key={brand.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container" style={{ textAlign: 'center' }}>
        <SectionHeading label="Our Standards" title="Why We Choose These Partners" subtitle="Every brand in our portfolio meets our strict quality, compliance and reliability criteria." />
        <div className="brands-standards-grid">
          {[
            { title: 'GMP Certified', desc: 'All partner manufacturers comply with Good Manufacturing Practice standards.' },
            { title: 'Quality Tested', desc: 'Products are tested and verified before being added to our catalogue.' },
            { title: 'Regulatory Approved', desc: 'All brands hold valid Drug License and regulatory approvals from CDSCO.' },
          ].map((item, i) => (
            <div key={i} className="brand-standard-card">
              <h3 className="brand-standard-card__title">{item.title}</h3>
              <p className="brand-standard-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Brands;
