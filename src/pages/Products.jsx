import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import ProductModal from '../components/ProductModal';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import brandsData from '../data/brands.json';

const ITEMS_PER_PAGE = 8;

const Products = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('category')) setSelectedCategory(params.get('category'));
    if (params.get('brand')) setSelectedBrand(params.get('brand'));
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, [location.search]);

  const filteredProducts = useMemo(() => productsData.filter((p) => {
    const s = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const c = selectedCategory === 'All' || p.category === selectedCategory;
    const b = selectedBrand === 'All' || p.brand === selectedBrand;
    return s && c && b;
  }), [searchTerm, selectedCategory, selectedBrand]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory, selectedBrand]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const hasActiveFilters = selectedCategory !== 'All' || selectedBrand !== 'All' || searchTerm !== '';
  const clearFilters = () => { setSearchTerm(''); setSelectedCategory('All'); setSelectedBrand('All'); };

  return (
    <div>
      <PageHeader
        title="Our Products"
        subtitle="Browse our comprehensive catalogue of quality pharmaceutical products."
        breadcrumbs={[{ label: 'Products' }]}
      />

      <div className="products-page">
        <div className="container">
          {/* Top bar */}
          <div className="products-topbar">
            <div>
              <p className="products-topbar__count">
                {isLoading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
              </p>
              {hasActiveFilters && (
                <button className="products-topbar__clear" onClick={clearFilters}>Clear all filters</button>
              )}
            </div>
            <button className="products-filter-btn" onClick={() => setSidebarOpen(true)}>
              <Filter size={16} /> Filters
              {hasActiveFilters && <span className="products-filter-badge">Active</span>}
            </button>
          </div>

          <div className="products-layout">
            {/* Sidebar overlay */}
            <div className={`products-sidebar-overlay${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />

            {/* Sidebar */}
            <aside className={`products-sidebar${sidebarOpen ? ' open' : ''}`}>
              <div className="sidebar-mobile-header">
                <span className="sidebar-mobile-header__title">Filters</span>
                <button className="sidebar-mobile-header__close" onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">Search</h3>
                <div className="sidebar-search-wrap">
                  <Search size={16} className="sidebar-search-icon" />
                  <input
                    type="search"
                    className="sidebar-search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search products"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">Category</h3>
                <ul className="sidebar-list">
                  <li>
                    <button className={`sidebar-btn${selectedCategory === 'All' ? ' active' : ''}`} onClick={() => setSelectedCategory('All')}>All Categories</button>
                  </li>
                  {categoriesData.map((cat) => (
                    <li key={cat.id}>
                      <button className={`sidebar-btn${selectedCategory === cat.name ? ' active' : ''}`} onClick={() => setSelectedCategory(cat.name)}>{cat.name}</button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__title">Brand</h3>
                <ul className="sidebar-list">
                  <li>
                    <button className={`sidebar-btn${selectedBrand === 'All' ? ' active' : ''}`} onClick={() => setSelectedBrand('All')}>All Brands</button>
                  </li>
                  {brandsData.map((brand) => (
                    <li key={brand.id}>
                      <button className={`sidebar-btn${selectedBrand === brand.name ? ' active' : ''}`} onClick={() => setSelectedBrand(brand.name)}>{brand.name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Grid */}
            <div className="products-content">
              {isLoading ? (
                <div className="products-grid">
                  {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="products-grid">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button className="pagination__nav" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page">
                        <ChevronLeft size={16} />
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`pagination__page${currentPage === i + 1 ? ' active' : ''}`}
                          onClick={() => setCurrentPage(i + 1)}
                          aria-label={`Page ${i + 1}`}
                          aria-current={currentPage === i + 1 ? 'page' : undefined}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button className="pagination__nav" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="products-empty">
                  <p className="products-empty__text">No products found</p>
                  <button className="products-empty__clear" onClick={clearFilters}>Clear all filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default Products;
