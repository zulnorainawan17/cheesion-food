/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MessageSquare, ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { RestaurantConfig } from '../types';

interface HeroProps {
  config: RestaurantConfig;
  onExploreMenu: () => void;
}

export default function Hero({ config, onExploreMenu }: HeroProps) {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello Chession Fast Food! I would like to view the menu and place an order.");
    window.open(`https://wa.me/${config.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:py-40 overflow-hidden bg-gradient-to-b from-[#F5F3FF] via-white to-[#F5F3FF]">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#facc15]/10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content (7 columns) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left" id="hero-content">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-100/80 border border-purple-200 px-4 py-2 rounded-full" id="hero-badge">
              <span className="flex h-2 w-2 rounded-full bg-[#5c1d9b] animate-ping" />
              <span className="text-xs font-sans font-bold tracking-wider text-[#5c1d9b] uppercase">
                Premium Dining Experience
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#2D1B4D] leading-tight" id="hero-headline">
              Fresh Taste, <span className="text-[#5c1d9b]">Fast Service</span>, Premium Experience
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-purple-900/80 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed" id="hero-desc">
              Welcome to <strong className="text-[#5c1d9b] font-semibold">Chession Fast Food</strong>, where luxury culinary craft meets rapid service. Savor our signature flame-grilled burgers, freshly baked crown pizzas, slow-roasted shawarmas, and rich desserts designed for the modern connoisseur.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" id="hero-ctas">
              {/* Explore Menu Button */}
              <button
                onClick={onExploreMenu}
                id="hero-explore-btn"
                className="w-full sm:w-auto px-8 py-4 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full font-sans font-bold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowRight className="h-5 w-5 text-[#facc15]" />
              </button>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppClick}
                id="hero-whatsapp-btn"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full font-sans font-bold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="h-5 w-5 text-white fill-white" />
                <span>WhatsApp Order</span>
              </button>

              {/* Direct Call Button */}
              <a
                href={`tel:${config.phone}`}
                id="hero-call-btn"
                className="w-full sm:w-auto px-6 py-4 border-2 border-purple-200 text-[#5c1d9b] hover:text-[#3b0764] hover:bg-purple-50/50 bg-white rounded-full font-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-100 max-w-lg mx-auto lg:mx-0" id="hero-trust">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center space-x-1 text-[#ca8a04]">
                  <Star className="h-4 w-4 fill-[#facc15] text-[#facc15]" />
                  <span className="font-display font-extrabold text-base text-[#2D1B4D]">4.9</span>
                </div>
                <span className="text-xs text-purple-400 font-sans mt-0.5">Customer Rating</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center space-x-1 text-[#5c1d9b]">
                  <Clock className="h-4 w-4" />
                  <span className="font-display font-extrabold text-base text-[#2D1B4D]">25 Min</span>
                </div>
                <span className="text-xs text-purple-400 font-sans mt-0.5">Average Delivery</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center space-x-1 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-display font-extrabold text-base text-[#2D1B4D]">100%</span>
                </div>
                <span className="text-xs text-purple-400 font-sans mt-0.5">Fresh Ingredients</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Block (5 columns) */}
          <div className="lg:col-span-5 relative flex justify-center" id="hero-visual">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]" id="hero-image-wrapper">
              
              {/* Outer decorative gold ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#facc15]/30 animate-spin-slow" />
              
              {/* Purple back shadow */}
              <div className="absolute inset-6 rounded-full bg-purple-300/15 blur-2xl transform translate-x-4 translate-y-4" />

              {/* Main Food Image Container (Masked inside high-end geometry) */}
              <div className="absolute inset-4 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-purple-50">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                  alt="Chession Signature Zinger Burger"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-115 transition-transform duration-700"
                />
              </div>

              {/* Overlay Glass Badge 1 - Zinger Burger Promo */}
              <div className="absolute -top-4 -right-2 bg-white/80 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-white flex items-center space-x-2 animate-bounce-slow">
                <span className="text-2xl">🍔</span>
                <div>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#5c1d9b]">Best Seller</p>
                  <p className="text-xs font-display font-extrabold text-[#2D1B4D]">Zinger Burger</p>
                </div>
              </div>

              {/* Overlay Glass Badge 2 - Loaded Fries */}
              <div className="absolute -bottom-2 -left-6 bg-white/80 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-white flex items-center space-x-2">
                <span className="text-2xl">🍟</span>
                <div>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#ca8a04]">New Arrival</p>
                  <p className="text-xs font-display font-extrabold text-[#2D1B4D]">Loaded Fries</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
