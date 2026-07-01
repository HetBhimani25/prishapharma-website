import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import agencyData from '../data/agency.json';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const contactCards = [
    { icon: MapPin, label: 'Address', value: agencyData.address, href: null },
    { icon: Phone, label: 'Phone', value: agencyData.phone, href: `tel:${agencyData.phone}` },
    { icon: Mail, label: 'Email', value: agencyData.email, href: `mailto:${agencyData.email}` },
  ];

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, partnerships, or to place an order."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section section--gray">
        <div className="container">
          <div className="contact-layout">
            {/* Info */}
            <div className="contact-info">
              <div>
                <h2 className="contact-info__heading">Let's Start a Conversation</h2>
                <p className="contact-info__subtext">Whether you're a medical store looking to partner with us, or need information about our product catalogue, our team is ready to help.</p>
              </div>

              <div className="contact-cards">
                {contactCards.map((info, i) => (
                  <div key={i} className="contact-card">
                    <div className="contact-card__icon"><info.icon size={20} /></div>
                    <div>
                      <p className="contact-card__label">{info.label}</p>
                      {info.href
                        ? <a href={info.href} className="contact-card__value">{info.value}</a>
                        : <p className="contact-card__value">{info.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${agencyData.whatsapp.replace(/\D/g, '')}?text=Hello! I'd like to enquire about Prisha Pharma's products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-whatsapp"
              >
                <MessageCircle size={20} />
                Chat Directly on WhatsApp
              </a>

              <div className="contact-map">
                <iframe
                  title="Prisha Pharma Location"
                  src={agencyData.mapEmbedUrl}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card">
              {submitted ? (
                <motion.div className="contact-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="contact-success__icon"><Send size={32} /></div>
                  <h3 className="contact-success__title">Message Sent!</h3>
                  <p className="contact-success__text">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    className="contact-success__reset"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', message: '' }); }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="contact-form-card__title">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
                    <div className="contact-form__row">
                      <div className="contact-form__group">
                        <label className="contact-form__label" htmlFor="name">Full Name *</label>
                        <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className="contact-form__input" />
                      </div>
                      <div className="contact-form__group">
                        <label className="contact-form__label" htmlFor="phone">Phone Number *</label>
                        <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" className="contact-form__input" />
                      </div>
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label" htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="contact-form__input" />
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label" htmlFor="message">Message *</label>
                      <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements..." className="contact-form__textarea" />
                    </div>
                    <button type="submit" className="contact-form__submit">
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
