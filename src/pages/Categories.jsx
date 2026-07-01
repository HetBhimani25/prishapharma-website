import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, FlaskConical, Droplets, Syringe, Sparkles, TestTube2, Eye, Wind, Dumbbell, Leaf } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeading from '../components/SectionHeading';
import categoriesData from '../data/categories.json';

const categoryIcons = [Pill, Pill, Droplets, Syringe, Sparkles, TestTube2, Eye, Wind, Dumbbell, Leaf];

const Categories = () => (
  <div>
    <PageHeader
      title="Product Categories"
      subtitle="Browse our complete range of pharmaceutical product categories, from tablets to ayurvedic formulations."
      breadcrumbs={[{ label: 'Categories' }]}
    />

    <section className="section section--gray">
      <div className="container">
        <SectionHeading label="Categories" title="Explore All Categories" subtitle="Click any category to browse its complete product range." />
        <div className="categories-page-grid">
          {categoriesData.map((cat, i) => {
            const Icon = categoryIcons[i] || Pill;
            return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="category-card" aria-label={`Browse ${cat.name}`}>
                  <div className="category-card__icon">
                    <Icon size={28} />
                  </div>
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__desc">{cat.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </div>
);

export default Categories;
