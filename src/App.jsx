import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Products from './pages/Products';
import Catalogues from './pages/Catalogues';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="brands" element={<Brands />} />
          <Route path="products" element={<Products />} />
          <Route path="catalogues" element={<Catalogues />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          {/* Legacy redirects */}
          <Route path="about" element={<Navigate to="/" replace />} />
          <Route path="categories" element={<Navigate to="/catalogues" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
