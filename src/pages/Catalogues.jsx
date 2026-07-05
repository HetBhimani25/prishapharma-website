import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, ExternalLink, Phone, MessageCircle, FileText } from 'lucide-react';
import cataloguesData from '../data/catalogues.json';
import agencyData from '../data/agency.json';

const Catalogues = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    cataloguesData.filter(
      (c) =>
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.division.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const totalProducts = cataloguesData.reduce((acc, c) => acc + c.productCount, 0);
  const whatsappNum = agencyData.whatsapp.replace(/\D/g, '');

  return (
    <div>
      {/* ── Hero ── */}
      <section className="cat-page-hero">
        <div className="container">
          <p className="cat-page-hero__eyebrow">Product Catalogues</p>
          <h1 className="cat-page-hero__title">Company-wise Product Lists</h1>
          <p className="cat-page-hero__sub">
            Download or view PDF catalogues for all {cataloguesData.length} pharmaceutical companies we distribute.
            Ideal for quick reference and sharing with your team.
          </p>

          {/* Stats */}
          <div className="cat-hero-stats">
            <div className="cat-hero-stat">
              <div>
                <div className="cat-hero-stat__num">{cataloguesData.length}</div>
                <div className="cat-hero-stat__label">Companies</div>
              </div>
            </div>
            <div className="cat-hero-stat">
              <div>
                <div className="cat-hero-stat__num">{totalProducts.toLocaleString()}+</div>
                <div className="cat-hero-stat__label">Products</div>
              </div>
            </div>
            <div className="cat-hero-stat">
              <div>
                <div className="cat-hero-stat__num">PDF</div>
                <div className="cat-hero-stat__label">Download Ready</div>
              </div>
            </div>
            <div className="cat-hero-stat">
              <div>
                <div className="cat-hero-stat__num">FY 25-26</div>
                <div className="cat-hero-stat__label">Current Year</div>
              </div>
            </div>
          </div>

          {/* Contact Strip */}
          <div className="cat-contact-strip">
            <a href={`tel:${agencyData.phone}`} className="cat-contact-btn">
              <div className="cat-contact-icon cat-contact-icon--call">
                <Phone size={18} />
              </div>
              <div>
                <span className="cat-contact-label">Call Us</span>
                <span className="cat-contact-val">{agencyData.phone}</span>
              </div>
            </a>
            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hi! I would like to request a product catalogue.')}`}
              target="_blank" rel="noopener noreferrer"
              className="cat-contact-btn"
            >
              <div className="cat-contact-icon cat-contact-icon--wa">
                <MessageCircle size={18} />
              </div>
              <div>
                <span className="cat-contact-label">WhatsApp</span>
                <span className="cat-contact-val" style={{ fontFamily: 'var(--font-sans)' }}>Request Catalogue</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Search ── */}
      <div className="container">
        <div className="cat-search-section">
          <div className="cat-search-wrap">
            <Search size={16} className="cat-search-icon" />
            <input
              type="search"
              className="cat-search-input"
              placeholder="Search by company or division…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search catalogues"
            />
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="cat-grid-section">
          <div className="cat-section-head">
            <span className="cat-section-title">All Catalogues</span>
            <span className="cat-section-count">{filtered.length} of {cataloguesData.length}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="cat-empty">No catalogues match your search.</div>
          ) : (
            <div className="cat-grid">
              {filtered.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  className="cat-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  {/* Brand color bar */}
                  <div className={`cat-bar bar-${cat.colorKey}`} />

                  <div className="cat-card-body">
                    <div className="cat-card-head">
                      <div className={`cat-card-icon ic-${cat.colorKey}`}>
                        {cat.company[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="cat-card-company">{cat.company}</p>
                        <p className="cat-card-division">{cat.division}</p>
                      </div>
                    </div>

                    <p className="cat-card-desc">{cat.description}</p>

                    <div className="cat-card-meta">
                      <span className="cat-card-pill">
                        <FileText size={11} />
                        {cat.productCount} products
                      </span>
                      <span className="cat-card-pill cat-card-pill--green">
                        FY {cat.fy}
                      </span>
                    </div>
                  </div>

                  <div className="cat-card-actions">
                    <a
                      href={cat.viewUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="cat-btn-view"
                      onClick={(e) => cat.viewUrl === '#' && e.preventDefault()}
                      title={cat.viewUrl === '#' ? 'PDF not yet available' : 'View PDF online'}
                    >
                      <ExternalLink size={13} />
                      View PDF
                    </a>
                    <a
                      href={cat.pdfUrl}
                      download={cat.pdfUrl !== '#' ? `${cat.company}-catalogue.pdf` : undefined}
                      className="cat-btn-download"
                      onClick={(e) => cat.pdfUrl === '#' && e.preventDefault()}
                      title={cat.pdfUrl === '#' ? 'PDF coming soon' : `Download ${cat.company} catalogue`}
                    >
                      <Download size={13} />
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogues;
