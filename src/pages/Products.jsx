import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ChevronUp, ChevronDown, ChevronsUpDown, MessageCircle } from 'lucide-react';
import productsData from '../data/products.json';
import agencyData from '../data/agency.json';
import { getBrandConfig } from '../data/brandConfig';

/* ─────────────────────────────────────────
   Inline Product Detail Modal
───────────────────────────────────────── */
const ProductDetailModal = ({ product, onClose }) => {
  const cfg = getBrandConfig(product.brand);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const whatsappMsg = encodeURIComponent(
    `Hi! I would like to enquire about ${product.name} (${product.pack}) by ${product.brand}.`
  );
  const whatsappNum = agencyData.whatsapp.replace(/\D/g, '');

  return (
    <AnimatePresence>
      <div className="prod-modal-overlay">
        <motion.div
          className="prod-modal-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="prod-modal"
          role="dialog" aria-modal="true" aria-label={`Details: ${product.name}`}
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
        >
          <button className="prod-modal__close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>

          {product.image && (
            <div className="prod-modal__img-wrap">
              <img src={product.image} alt={product.name} className="prod-modal__img" loading="lazy" />
            </div>
          )}

          <div className="prod-modal__body">
            <div className="prod-modal__badges">
              <span className="prod-modal__cat">{product.category}</span>
              <span className={`co-badge ${cfg.badgeClass}`}>{product.brand}</span>
            </div>

            <h2 className="prod-modal__name">{product.name}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', lineHeight: 1.65, marginBottom: '0.5rem' }}>
              {product.description}
            </p>

            <div className="prod-modal__meta-row">
              <div className="prod-modal__meta-item">
                <span className="prod-modal__meta-label">Pack Size</span>
                <span className="prod-modal__meta-value">{product.pack}</span>
              </div>
              <div className="prod-modal__meta-item">
                <span className="prod-modal__meta-label">MRP</span>
                <span className="prod-modal__meta-value prod-modal__meta-value--mrp">₹{product.mrp}</span>
              </div>
              <div className="prod-modal__meta-item">
                <span className="prod-modal__meta-label">Product ID</span>
                <span className="prod-modal__meta-value">#{String(product.id).padStart(4, '0')}</span>
              </div>
            </div>

            {product.composition && product.composition.length > 0 && (
              <div>
                <p className="prod-modal__comp-title">Composition</p>
                <div className="salt-chips">
                  {product.composition.map((salt, i) => (
                    <span key={i} className="salt-chip">{salt}</span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="prod-modal__enquire"
            >
              <MessageCircle size={18} />
              Enquire on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────
   Sort arrow indicator
───────────────────────────────────────── */
const SortArrow = ({ field, sortField, sortDir }) => {
  if (sortField !== field) return <ChevronsUpDown size={12} className="sort-arr" />;
  return sortDir === 'asc'
    ? <ChevronUp size={12} className="sort-arr" />
    : <ChevronDown size={12} className="sort-arr" />;
};

/* ─────────────────────────────────────────
   Highlight helper — wraps matched text in <mark>
───────────────────────────────────────── */
const highlight = (text, query) => {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
};

/* ─────────────────────────────────────────
   Main Products Page
───────────────────────────────────────── */
const Products = () => {
  const location = useLocation();
  const searchRef = useRef(null);

  // State
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pick up ?brand= URL param on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brand = params.get('brand');
    if (brand) setActiveTab(brand);
  }, [location.search]);

  // Keyboard shortcut: press / to focus search
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Brands list
  const brands = useMemo(() => ['All', ...new Set(productsData.map((p) => p.brand))], []);

  // Tab counts (ignores search — just per brand)
  const brandCounts = useMemo(() => {
    const counts = { All: productsData.length };
    brands.slice(1).forEach((b) => {
      counts[b] = productsData.filter((p) => p.brand === b).length;
    });
    return counts;
  }, [brands]);

  // Filtered + sorted products
  const displayProducts = useMemo(() => {
    let result = productsData;

    if (activeTab !== 'All') {
      result = result.filter((p) => p.brand === activeTab);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.composition || []).some((c) => c.toLowerCase().includes(q))
      );
    }

    return [...result].sort((a, b) => {
      let av, bv;
      if (sortField === 'name') { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
      else if (sortField === 'mrp') { av = parseFloat(a.mrp) || 0; bv = parseFloat(b.mrp) || 0; }
      else { av = a[sortField]; bv = b[sortField]; }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [search, activeTab, sortField, sortDir]);

  const handleSort = useCallback((field) => {
    if (['name', 'mrp'].includes(field)) {
      setSortField((prev) => {
        if (prev === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        else { setSortDir('asc'); }
        return field;
      });
    }
  }, []);

  const clearAll = () => { setSearch(''); setActiveTab('All'); };
  const hasFilter = search.trim() !== '' || activeTab !== 'All';

  return (
    <div className="prod-page">
      {/* ── Page Title ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--color-gray-200)', padding: '1.5rem 0 0' }}>
        <div className="container">
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              PRODUCTS
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-gray-900)', marginBottom: '0.25rem' }}>
            Product Catalogue
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-400)', marginBottom: '1rem' }}>
            Browse {productsData.length}+ pharmaceutical products from 4 trusted brands. Click any row for full details.
          </p>
        </div>
      </div>

      {/* ── Sticky Toolbar ── */}
      <div className="prod-sticky">
        <div className="container">
          {/* Search row */}
          <div className="prod-search-row">
            <div className="prod-search-wrap">
              <Search size={16} className="prod-search-icon" />
              <input
                id="product-search"
                ref={searchRef}
                type="search"
                className="prod-search-input"
                placeholder="Search by product name, composition or brand…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search products"
              />
              {search && (
                <button className="prod-search-clr" onClick={() => setSearch('')} aria-label="Clear search">
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="prod-kbd-hint">
              Press <kbd className="prod-kbd">/</kbd> to search
            </div>
          </div>

          {/* Summary strip */}
          <div className="prod-summary">
            <span className="prod-summary__count">{displayProducts.length}</span>
            <span className="prod-summary__label">
              {displayProducts.length === 1 ? 'product' : 'products'} found
            </span>
            {activeTab !== 'All' && (
              <span className="prod-summary__tag">{activeTab}</span>
            )}
            {search && (
              <span className="prod-summary__tag">"{search}"</span>
            )}
            {hasFilter && (
              <button className="prod-summary__clear" onClick={clearAll}>
                Clear filters
              </button>
            )}
          </div>

          {/* Company Tabs */}
          <div className="prod-tabs-bar" role="tablist" aria-label="Filter by brand">
            {brands.map((brand) => (
              <button
                key={brand}
                role="tab"
                aria-selected={activeTab === brand}
                className={`prod-tab${activeTab === brand ? ' active' : ''}`}
                onClick={() => setActiveTab(brand)}
              >
                {brand}
                <span className="prod-tab__count">{brandCounts[brand] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        {displayProducts.length === 0 ? (
          <div className="prod-table-outer">
            <div className="prod-empty">
              <div className="prod-empty__icon">🔍</div>
              <p className="prod-empty__title">No products found</p>
              <p className="prod-empty__sub">
                {search ? `No results for "${search}"` : 'No products in this brand yet.'}
              </p>
              {hasFilter && (
                <button className="prod-empty__btn" onClick={clearAll}>Clear all filters</button>
              )}
            </div>
          </div>
        ) : (
          <div className="prod-table-outer">
            <div className="prod-table-scroll">
              <table className="prod-table">
                <thead>
                  <tr>
                    <th className="col-sr">#</th>
                    <th
                      className={sortField === 'name' ? 'sorted' : ''}
                      onClick={() => handleSort('name')}
                      aria-sort={sortField === 'name' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      Product Name <SortArrow field="name" sortField={sortField} sortDir={sortDir} />
                    </th>
                    <th>Company</th>
                    <th>Pack</th>
                    <th
                      className={`col-mrp${sortField === 'mrp' ? ' sorted' : ''}`}
                      onClick={() => handleSort('mrp')}
                      aria-sort={sortField === 'mrp' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      MRP (₹) <SortArrow field="mrp" sortField={sortField} sortDir={sortDir} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayProducts.map((product, index) => {
                    const cfg = getBrandConfig(product.brand);
                    const compStr = (product.composition || []).join(' + ');
                    return (
                      <tr
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(product)}
                        aria-label={`View details for ${product.name}`}
                      >
                        <td className="col-sr">{index + 1}</td>
                        <td className="col-prod">
                          <div className="prod-name">
                            {highlight(product.name, search)}
                          </div>
                          {compStr && (
                            <div className="prod-comp">
                              {highlight(compStr, search)}
                            </div>
                          )}
                        </td>
                        <td className="col-co">
                          <span className={`co-badge ${cfg.badgeClass}`}>
                            {product.brand}
                          </span>
                        </td>
                        <td className="col-pack">
                          <span className="pack-tag">{product.pack}</span>
                        </td>
                        <td className="col-mrp">₹{product.mrp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
