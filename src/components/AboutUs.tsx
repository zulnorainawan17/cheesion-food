/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-[#F5F3FF] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16" id="about-heading-block">
          <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5c1d9b]">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#2D1B4D] mt-2 tracking-tight">
            Crafting Premium Fast Food Masterpieces Since 2018
          </h2>
          <div className="h-1.5 w-16 bg-[#5c1d9b] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Grid (5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4" id="about-visuals">
            <div className="space-y-4">
              <div className="rounded-[1.5rem] overflow-hidden shadow-xl shadow-purple-900/5 h-48 bg-purple-50">
                <img
                  src="https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=400&q=80"
                  alt="Crispy Zinger Burger"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-[1.5rem] overflow-hidden shadow-xl shadow-purple-900/5 h-64 bg-purple-50">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
                  alt="Crown Crust Pizza"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-[1.5rem] overflow-hidden shadow-xl shadow-purple-900/5 h-64 bg-purple-50">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
                  alt="Gourmet Juicy Burger"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-[1.5rem] overflow-hidden shadow-xl shadow-purple-900/5 h-48 bg-purple-50">
                <img
                  src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80"
                  alt="Crispy Buffalo Wings"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text & Pillars (7 columns) */}
          <div className="lg:col-span-7 space-y-8" id="about-text-content">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-[#2D1B4D]">
                The Art of Clean, Luxury & Scrumptious Fast Food
              </h3>
              <p className="text-purple-900/80 font-sans leading-relaxed">
                At Chession Fast Food, we believe fast food shouldn't mean compromise. Founded in D.I. Khan, Pakistan, we have set out to elevate standard quick dining into a premium gourmet event. From hand-crafted daily-ground smash beef to wood-fired crown crust pizzas, we guarantee food that is hot, flavorful, and pristine.
              </p>
              <p className="text-purple-900/80 font-sans leading-relaxed">
                We focus heavily on hygiene, ingredient premium selection, and lightning-fast delivery so that your food arrives looking and tasting like an international culinary work of art.
              </p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4" id="about-pillars">
              {/* Pillar 1 */}
              <div className="flex space-x-4 items-start bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
                <div className="p-3 bg-purple-100 text-[#5c1d9b] rounded-xl shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-[#2D1B4D]">Grade-A Hygiene</h4>
                  <p className="text-xs text-purple-400 font-sans mt-1">Our kitchens are fully certified for cleanliness, sanitization, and contactless handling.</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex space-x-4 items-start bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
                <div className="p-3 bg-rose-50 text-rose-500 rounded-xl shrink-0">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-[#2D1B4D]">Customer Love</h4>
                  <p className="text-xs text-purple-400 font-sans mt-1">Every meal is customized. We accommodate allergies, extra spice, or special requests.</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex space-x-4 items-start bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
                <div className="p-3 bg-amber-50 text-amber-500 rounded-xl shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-[#2D1B4D]">Expert Chefs</h4>
                  <p className="text-xs text-purple-400 font-sans mt-1">Our BBQ masters and artisan pizza bakers have over a decade of high-end experience.</p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex space-x-4 items-start bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-[#2D1B4D]">Exclusive Deals</h4>
                  <p className="text-xs text-purple-400 font-sans mt-1">Carefully designed family bundles and student combos that save wallet and maximize taste.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
