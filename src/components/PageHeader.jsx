import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ title, subtitle, breadcrumbs = [] }) => (
  <section className="page-header">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {breadcrumbs.length > 0 && (
          <nav className="page-header__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={14} className="page-header__breadcrumb-sep" />
                {crumb.to
                  ? <Link to={crumb.to}>{crumb.label}</Link>
                  : <span className="page-header__breadcrumb-current">{crumb.label}</span>
                }
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        <div className="page-header__accent" />
      </motion.div>
    </div>
  </section>
);

export default PageHeader;
