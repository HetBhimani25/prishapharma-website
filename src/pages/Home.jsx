import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import agencyData from '../data/agency.json';
import brandsData from '../data/brands.json';
import SectionHeading from '../components/SectionHeading';
import BrandCard from '../components/BrandCard';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '1400+', label: 'Products Listed' },
  { value: '12+', label: 'Partner Brands' },
  { value: '10k+', label: 'Satisfied Clients' },
];

const Home = () => (
  <div>
    {/* ── Hero ── */}
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero__badge">
              <ShieldCheck size={16} />
              {agencyData.experience} of Trusted Service
            </div>
            <h1 className="hero__title">
              Your Trusted <span>Pharmaceutical</span> Distribution Partner
            </h1>
            <p className="hero__subtitle">{agencyData.description}</p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-primary">
                Browse Products <ArrowRight size={16} />
              </Link>
              <Link to="/catalogues" className="btn btn-outline">
                View Catalogues
              </Link>
            </div>
            <div className="hero__checks">
              {['ISO Certified', 'GMP Compliant', 'PAN Gujarat Supply'].map((item) => (
                <div key={item} className="hero__check">
                  <CheckCircle2 size={16} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero__image-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="hero__glow" />
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80"
              alt="Pharmaceutical products"
              className="hero__image"
              loading="eager"
            />
            <div className="hero__floating-card">
              <div className="hero__floating-icon">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="hero__floating-label">Trusted by</p>
                <p className="hero__floating-value">10,000+ Medical Stores</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Stats Bar ── */}
    <section className="stats-bar">
      <div className="container">
        <div className="stats-bar__grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="stats-bar__value">{s.value}</div>
              <div className="stats-bar__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Partner Brands (12) ── */}
    <section className="section section--gray">
      <div className="container">
        <SectionHeading
          label="Our Partners"
          title="Trusted Pharmaceutical Brands"
          subtitle="We are the authorised Gujarat distributor for 12 leading Indian pharmaceutical companies."
        />
        <div className="brands-home-grid">
          {brandsData.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Minimal Contact Strip ── */}
    <section className="home-contact-strip">
      <div className="container">
        <motion.div
          className="home-contact-strip__inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="home-contact-strip__title">Ready to Partner With Prisha Pharma?</h2>
          <p className="home-contact-strip__sub">Contact us today to discuss bulk orders, product catalogues, and partnership opportunities.</p>
          <div className="home-contact-strip__actions">
            <Link to="/contact" className="btn btn-white">Get In Touch</Link>
            <a href={`tel:${agencyData.phone}`} className="btn btn-ghost-white">
              <Phone size={16} /> {agencyData.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Home;
