import React from 'react';
import { Target, Eye, History, Building, Users } from 'lucide-react';
import agencyData from '../data/agency.json';

const About = () => {
  return (
    <div className="pt-8 pb-20">
      {/* Page Header */}
      <div className="bg-gray-50 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about {agencyData.name}, our mission, vision, and the journey that made us a trusted partner in pharmaceutical distribution.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 space-y-24">
        
        {/* Intro Section */}
        <section className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Medical Team" 
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {agencyData.name} is a premier pharmaceutical distribution agency based in {agencyData.address}. With over {agencyData.experience} of dedicated service, we have established ourselves as a vital link between top pharmaceutical manufacturers and healthcare providers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We specialize in the timely, safe, and efficient distribution of a wide range of medical products, ensuring that quality healthcare is accessible to those who need it most.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
            <div className="bg-green-50 p-4 rounded-full h-fit text-primary shrink-0">
              <Target className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide seamless and reliable distribution of high-quality pharmaceutical products, fostering better health outcomes and building lasting partnerships with healthcare professionals.
              </p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
            <div className="bg-green-50 p-4 rounded-full h-fit text-secondary shrink-0">
              <Eye className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and innovative pharmaceutical distribution network globally, setting industry standards for efficiency, safety, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-16 text-center">
          <Building className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">State-of-the-art Infrastructure</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Our expansive warehouse facilities in {agencyData.address} are equipped with advanced temperature-control systems, ensuring that all pharmaceutical products are stored under optimal conditions to maintain their efficacy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Warehouse" className="rounded-xl h-48 w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Logistics" className="rounded-xl h-48 w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Storage" className="rounded-xl h-48 w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
