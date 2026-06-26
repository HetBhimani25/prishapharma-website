import React from 'react';
import { MessageCircle } from 'lucide-react';
import agencyData from '../data/agency.json';

const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${agencyData.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      {/* Optional tooltip */}
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold py-1 px-3 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
