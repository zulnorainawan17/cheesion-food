/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, Heart, Lock, Unlock, QrCode, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
  onOpenQrCode: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  isAdminMode,
  onToggleAdminMode,
  onOpenQrCode,
  activeSection,
  onNavigate
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'About Us', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-purple-100 shadow-sm" id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('home')} id="nav-brand-container">
            <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg shadow-purple-200 transition-transform duration-300 hover:scale-105" id="nav-logo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14ikLjeVHycASTmC9bI39qX7aY6RrhyHVhLmlcYeNZQ&s=10"
                alt="Cheesion Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col" id="nav-brand-text">
              <span className="text-xl font-display font-extrabold tracking-tight text-[#2D1B4D] leading-none">
                CHESSION
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold leading-none mt-1">
                Fast Food Premium
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" id="nav-desktop-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                id={`nav-link-${link.id}`}
                className={`px-4 py-2 rounded-xl text-sm font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-[#5c1d9b] bg-[#5c1d9b]/5'
                    : 'text-purple-900/80 hover:text-[#5c1d9b] hover:bg-purple-50/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions (Favorites, Cart, QR, Admin) */}
          <div className="hidden md:flex items-center space-x-3" id="nav-desktop-actions">
            {/* QR Menu Button */}
            <button
              onClick={onOpenQrCode}
              id="nav-qr-btn"
              title="View QR Code Menu"
              className="p-2.5 rounded-full bg-white border border-purple-100 text-[#5c1d9b] hover:shadow-md hover:bg-purple-50 transition-all duration-200 cursor-pointer"
            >
              <QrCode className="h-5 w-5" />
            </button>

            {/* Favorites Trigger */}
            <button
              onClick={onOpenFavorites}
              id="nav-fav-btn"
              title="My Favorites"
              className="p-2.5 rounded-full bg-white border border-purple-100 text-purple-600 hover:shadow-md hover:bg-rose-50/50 transition-all duration-200 relative cursor-pointer"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white font-sans text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              id="nav-cart-btn"
              title="View Cart"
              className="flex items-center gap-2 bg-[#5c1d9b] text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-purple-200 hover:bg-[#3b0764] transition-all duration-200 cursor-pointer text-sm"
            >
              <ShoppingBag className="h-4 w-4 text-[#facc15]" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#facc15] text-[#2D1B4D] text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Toggle */}
            <button
              onClick={onToggleAdminMode}
              id="nav-admin-btn"
              title={isAdminMode ? 'Exit Admin Panel' : 'Admin Panel Log In'}
              className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isAdminMode
                  ? 'bg-[#facc15] text-[#2D1B4D] border-[#ca8a04] shadow-md shadow-amber-500/10'
                  : 'bg-white text-[#5c1d9b] hover:bg-[#5c1d9b]/5 border-purple-100 hover:shadow-md'
              }`}
            >
              {isAdminMode ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Trigger & Controls */}
          <div className="flex md:hidden items-center space-x-2" id="nav-mobile-controls">
            {/* Favorites Icon */}
            <button
              onClick={onOpenFavorites}
              className="p-2 rounded-lg text-[#5c1d9b] relative"
              id="nav-mobile-fav-btn"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white font-sans text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-lg text-[#5c1d9b] relative"
              id="nav-mobile-cart-btn"
            >
              <ShoppingBag className="h-5 w-5 text-[#5c1d9b]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#facc15] text-[#2D1B4D] font-sans text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#5c1d9b] hover:text-[#3b0764] focus:outline-none"
              id="nav-mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg px-4 pt-2 pb-6 space-y-2" id="nav-mobile-drawer">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-sans font-semibold transition-all ${
                activeSection === link.id
                  ? 'text-[#5c1d9b] bg-[#5c1d9b]/5'
                  : 'text-purple-900 hover:bg-purple-50/50'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-purple-100 flex flex-wrap gap-2" id="nav-mobile-drawer-actions">
            <button
              onClick={() => {
                onOpenQrCode();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-purple-100 text-[#5c1d9b] bg-purple-50/50 text-sm font-semibold w-[48%]"
            >
              <QrCode className="h-4 w-4" />
              <span>QR Menu</span>
            </button>

            <button
              onClick={() => {
                onToggleAdminMode();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold w-[48%] border ${
                isAdminMode
                  ? 'bg-[#facc15] text-[#2D1B4D] border-[#ca8a04]'
                  : 'border-purple-100 text-[#5c1d9b] bg-purple-50/50'
              }`}
            >
              {isAdminMode ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              <span>{isAdminMode ? 'Exit Admin' : 'Admin Area'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
