import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ShieldCheck, Truck, Clock, Award, ArrowRight, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import agencyData from '../data/agency.json';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import categoriesData from '../data/categories.json';
import testimonialsData from '../data/testimonials.json';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';
import SectionHeading from '../components/SectionHeading';
import ProductModal from '../components/ProductModal';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Products Listed' },
  { value: '50+', label: 'Partner Brands' },
  { value: '10k+', label: 'Satisfied Clients' },
];

const whyUs = [
  { icon: Award, title: 'Certified Quality', desc: 'All products sourced from certified, GMP-compliant manufacturers for guaranteed quality.' },
  { icon: Truck, title: 'Timely Delivery', desc: 'Robust logistics network ensuring on-time delivery to every corner of Gujarat.' },
  { icon: ShieldCheck, title: 'Verified Sourcing', desc: 'Every product verified for authenticity and quality before reaching your shelves.' },
  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support to address all your pharmaceutical needs.' },
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      {/* Hero */}
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
                <Link to="/contact" className="btn btn-outline">
                  Contact Us
                </Link>
              </div>
              <div className="hero__checks">
                {['ISO Certified', 'GMP Compliant', 'PAN India Supply'].map((item) => (
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

      {/* Stats Bar */}
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

      {/* About Snippet */}
      <section className="section section--white">
        <div className="container">
          <div className="about-snippet__inner">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
                alt="Prisha Pharma office"
                className="about-snippet__image"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="about-snippet__content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="about-snippet__label">Who We Are</span>
              <h2 className="about-snippet__title">Gujarat's Premier Pharma Distribution Agency</h2>
              <p className="about-snippet__text">
                Founded with a mission to make quality pharmaceutical products accessible, Prisha Pharma has grown into one of Surat's most trusted distribution agencies. We partner with India's leading pharmaceutical brands to ensure every medical store gets the right product, on time, every time.
              </p>
              <ul className="about-snippet__checklist">
                {['Direct partnerships with top pharma brands', 'Temperature-controlled warehousing', 'Same-day dispatch for urgent orders', 'Dedicated relationship managers'].map((p, i) => (
                  <li key={i} className="about-snippet__check">
                    <CheckCircle2 size={16} /> {p}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="about-snippet__link">
                Learn More About Us <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="section section--gray">
        <div className="container">
          <SectionHeading label="Our Partners" title="Trusted Pharmaceutical Brands" subtitle="We distribute products from India's most reputable and certified pharmaceutical companies." />
          <div className="brands-grid">
            {brandsData.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading label="Categories" title="Browse by Medicine Category" subtitle="Explore our wide range of pharmaceutical product categories for every medical need." />
          <div className="categories-grid">
            {categoriesData.slice(0, 10).map((cat) => (
              <Link key={cat.id} to={`/products?category=${encodeURIComponent(cat.name)}`} className="category-link">
                <div className="category-link__icon">💊</div>
                <span className="category-link__name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section--gray" style={{ paddingBottom: "7rem" }}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: '3rem' }}>
            <SectionHeading label="Products" title="Featured Products" center={false} />
            <Link to="/products" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="swiper-wrap">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{ 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
            >
              {productsData.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} onClick={setSelectedProduct} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Link to="/products" className="view-all-link--mobile">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading label="Why Us" title="Why Medical Stores Choose Prisha Pharma" subtitle="We go beyond distribution — we are your long-term healthcare supply partner." />
          <div className="why-us-grid">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                className="why-us-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="why-us-card__icon-wrap">
                  <item.icon size={28} />
                </div>
                <h3 className="why-us-card__title">{item.title}</h3>
                <p className="why-us-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--gray">
        <div className="container">
          <SectionHeading label="Testimonials" title="What Our Clients Say" subtitle="Trusted by hundreds of medical stores and pharmacies across Gujarat." />
          <div className="testimonials-grid">
            {testimonialsData.map((t, i) => (
              <motion.div
                key={t.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#F59E0B" />)}
                </div>
                <p className="testimonial-card__review">"{t.review}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__meta">{t.role} · {t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-section__inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-section__title">Ready to Partner With Prisha Pharma?</h2>
            <p className="cta-section__subtitle">Join hundreds of medical stores across Gujarat who trust us for quality, reliability, and timely delivery.</p>
            <div className="cta-section__actions">
              <Link to="/contact" className="btn btn-white">Get In Touch Today</Link>
              <Link to="/products" className="btn btn-ghost-white">Browse Products</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default Home;
