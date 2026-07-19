/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MessageSquare, MapPin, Clock, Compass } from 'lucide-react';
import { RestaurantConfig } from '../types';

interface ContactProps {
  config: RestaurantConfig;
}

export default function Contact({ config }: ContactProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address)}`;

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#F5F3FF] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="contact-header">
          <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5c1d9b]">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#2D1B4D] mt-2 tracking-tight">
            Visit Us Or Order Direct To Your Door
          </h2>
          <div className="h-1.5 w-16 bg-[#5c1d9b] mx-auto mt-4 rounded-full" id="contact-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
          
          {/* Information Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6" id="contact-info">
            <h3 className="text-2xl font-display font-bold text-[#2D1B4D]">
              Chession Fast Food Headquarters
            </h3>
            <p className="text-purple-900/80 font-sans leading-relaxed">
              Have questions, hosting a dynamic event, or want customized bulk pricing? Reach out to our customer experience champions directly.
            </p>

            <div className="space-y-4 pt-4" id="contact-details-cards">
              {/* Location Card */}
              <div className="flex space-x-4 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300 p-5 cursor-default">
                <div className="p-3 bg-[#5c1d9b] text-[#facc15] rounded-2xl shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-[#2D1B4D]">Our Address</h4>
                  <p className="text-xs text-purple-900/80 font-sans mt-1 leading-relaxed">{config.address}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-sans font-bold text-[#5c1d9b] hover:text-[#3b0764] mt-2"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="flex space-x-4 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300 p-5 cursor-default">
                <div className="p-3 bg-[#facc15] text-[#2D1B4D] rounded-2xl shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-[#2D1B4D]">Opening Hours</h4>
                  <p className="text-xs text-purple-900/80 font-sans mt-1 leading-relaxed">Daily: {config.openingHours}</p>
                  <div className="flex items-center space-x-1 text-[10px] font-sans font-semibold text-emerald-600 mt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Now Open & Sizzling</span>
                  </div>
                </div>
              </div>

              {/* Call Card */}
              <div className="flex space-x-4 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300 p-5 cursor-default">
                <div className="p-3 bg-purple-100 text-[#5c1d9b] rounded-2xl shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-[#2D1B4D]">Direct Phone Hotline</h4>
                  <p className="text-xs text-purple-900/80 font-sans mt-1">Place direct delivery orders via voice call.</p>
                  <a
                    href={`tel:${config.phone}`}
                    className="inline-block text-sm font-display font-bold text-[#5c1d9b] hover:text-[#3b0764] mt-1"
                  >
                    {config.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Map / Visual Card Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="contact-visual-panel">
            <div className="relative rounded-[2rem] overflow-hidden border border-purple-100 shadow-xl aspect-16/10 flex items-center justify-center bg-purple-50" id="contact-map-mock">
              {/* Luxury Styled Location Card Backdrop */}
              <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')" }} />
              
              {/* Stylized vector pins & location UI to make it look premium and beautiful */}
              <div className="relative text-center p-8 z-10 space-y-4 max-w-sm">
                <div className="h-16 w-16 bg-[#5c1d9b] text-[#facc15] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-purple-900/20">
                  <MapPin className="h-8 w-8" />
                </div>
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-purple-100">
                  <h4 className="font-display font-bold text-[#2D1B4D] text-sm">Chession Premier Dining Hub</h4>
                  <p className="text-xs text-purple-400 font-sans mt-1">D.I. Khan Main Branch</p>
                  <p className="text-[10px] text-purple-300 font-sans mt-2">Dine-In • Takeaway • Contact-less Home Delivery</p>
                  
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block w-full py-2.5 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full text-xs font-sans font-bold transition-all duration-200"
                  >
                    Get GPS Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${config.whatsapp}?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20catering%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-sm font-sans font-bold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-green-100"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href={`tel:${config.phone}`}
                className="flex-1 py-3.5 border-2 border-purple-100 hover:border-[#5c1d9b] text-[#5c1d9b] hover:text-[#3b0764] bg-white rounded-full text-sm font-sans font-bold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Phone Hotline</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
