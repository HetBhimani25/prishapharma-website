import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import BackToTop from '../components/BackToTop';

const MainLayout = () => (
  <div className="app-layout">
    <Navbar />
    <main className="app-main" id="main-content">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

export default MainLayout;
