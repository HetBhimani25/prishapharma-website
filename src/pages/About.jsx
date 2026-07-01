import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Building2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionHeading from '../components/SectionHeading';
import teamData from '../data/team.json';

const About = () => {
  const milestones = [
    { year: '2014', event: 'Prisha Pharma founded in Surat, Gujarat with a small team.' },
    { year: '2016', event: 'Expanded to 10+ pharmaceutical brands in our portfolio.' },
    { year: '2018', event: 'Opened state-of-the-art temperature-controlled warehouse.' },
    { year: '2021', event: 'Reached 5,000+ active medical store partnerships.' },
    { year: '2024', event: 'Launched digital product catalogue for streamlined ordering.' },
  ];

  return (
    <div>
      <PageHeader
        title="About Prisha Pharma"
        subtitle="Surat's most trusted pharmaceutical distribution partner, committed to quality and timely delivery."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Agency Introduction */}
      <section className="section section--white">
        <div className="container">
          <div className="about-intro__inner">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                alt="Prisha Pharma team"
                className="about-intro__image"
                loading="lazy"
              />
            </motion.div>
            <motion.div className="about-intro__content" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="about-intro__label">Our Story</span>
              <h2 className="about-intro__title">Built on Trust, Driven by Quality</h2>
              <p className="about-intro__text">
                Prisha Pharma was established with a singular vision — to make premium pharmaceutical products accessible to every medical store across Gujarat. Over the past decade, we have grown from a small local distributor to one of the region's most respected pharmaceutical agencies.
              </p>
              <p className="about-intro__text">
                Our team of dedicated professionals works tirelessly to ensure that every order is fulfilled accurately, every delivery is on time, and every product meets the highest quality standards. We are not just distributors — we are your healthcare supply partners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section--gray">
        <div className="container">
          <SectionHeading label="Purpose" title="Our Mission & Vision" />
          <div className="mission-vision-grid">
            <div className="mv-card">
              <div className="mv-card__icon"><Target size={28} /></div>
              <div>
                <h3 className="mv-card__title">Our Mission</h3>
                <p className="mv-card__text">To provide medical stores and healthcare professionals with seamless access to quality pharmaceutical products through an efficient, transparent, and reliable distribution network, ensuring health reaches every corner of Gujarat.</p>
              </div>
            </div>
            <div className="mv-card">
              <div className="mv-card__icon"><Eye size={28} /></div>
              <div>
                <h3 className="mv-card__title">Our Vision</h3>
                <p className="mv-card__text">To become India's most trusted pharmaceutical distribution partner, known for operational excellence, product integrity, and an unwavering commitment to the health and well-being of every community we serve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading label="Our Journey" title="Milestones That Define Us" />
          <div className="timeline">
            <div className="timeline__line" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="timeline__item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline__dot" />
                <div className="timeline__card">
                  <span className="timeline__year">{m.year}</span>
                  <p className="timeline__event">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section section--gray">
        <div className="container">
          <SectionHeading label="Infrastructure" title="World-Class Facilities" />
          <div className="infra-grid">
            {[
              { icon: Building2, title: 'Modern Office', desc: 'A professionally equipped office space enabling efficient operations and client servicing.' },
              { icon: Users, title: 'Expert Team', desc: 'A team of experienced pharma professionals, logistics experts, and customer care staff.' },
              { icon: Building2, title: 'Certified Warehouse', desc: 'Temperature-controlled, GST-compliant warehouse with advanced inventory management systems.' },
            ].map((item, i) => (
              <div key={i} className="infra-card">
                <div className="infra-card__icon"><item.icon size={28} /></div>
                <h3 className="infra-card__title">{item.title}</h3>
                <p className="infra-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading label="Our People" title="Meet the Team" />
          <div className="team-grid">
            {teamData.map((member, i) => (
              <motion.div
                key={member.id}
                className="team-member"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="team-member__avatar">{member.avatar}</div>
                <h3 className="team-member__name">{member.name}</h3>
                <p className="team-member__role">{member.role}</p>
                <p className="team-member__exp">{member.experience}</p>
                <p className="team-member__bio">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
