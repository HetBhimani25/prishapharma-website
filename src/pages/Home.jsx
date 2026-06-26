import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ArrowRight, ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import agencyData from '../data/agency.json';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import categoriesData from '../data/categories.json';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-white pt-20 pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2 space-y-6"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-primary text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Trusted Healthcare Partner
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Empowering Health Through <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                {agencyData.tagline}. We distribute top-quality pharmaceutical products from leading brands with unparalleled reliability and speed.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/products" className="bg-primary hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg shadow-green-200 flex items-center gap-2">
                  Explore Products <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/contact" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-3 rounded-md font-medium transition-colors">
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Medical Laboratory" 
                className="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white divide-x divide-white/20">
            {[
              { value: agencyData.experience, label: 'Experience' },
              { value: '500+', label: 'Products' },
              { value: '50+', label: 'Partner Brands' },
              { value: '10k+', label: 'Happy Clients' },
            ].map((stat, idx) => (
              <div key={idx} className="px-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-green-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Categories</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categoriesData.slice(0, 10).map((category, idx) => (
              <Link 
                key={idx} 
                to={`/products?category=${category}`}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:border-primary border border-gray-100 transition-all group"
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <div className="w-24 h-1 bg-primary rounded-full"></div>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {productsData.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-8 text-center md:hidden">
             <Link to="/products" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Sourcing only from certified and reputable manufacturers to ensure top-notch quality.' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Robust supply chain network ensuring timely and safe delivery of all products.' },
              { icon: Clock, title: '24/7 Support', desc: 'Dedicated customer service team available round the clock to assist you.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">We collaborate with the most reputable pharmaceutical companies to bring you safe and effective healthcare solutions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandsData.map((brand, idx) => (
              <BrandCard key={idx} brand={brand} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
            Join hands with {agencyData.name} for reliable, timely, and quality pharmaceutical distribution.
          </p>
          <Link to="/contact" className="inline-block bg-primary hover:bg-green-600 text-white px-10 py-4 rounded-md font-semibold text-lg transition-colors shadow-lg">
            Get In Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
