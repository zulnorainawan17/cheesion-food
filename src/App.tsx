/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Heart,
  SlidersHorizontal,
  Plus,
  ShoppingBag,
  Check,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Trash2,
  AlertCircle,
  Unlock,
  Edit2
} from 'lucide-react';

import { MenuItem, CartItem, Order, Review, RestaurantConfig } from './types';
import { INITIAL_MENU_ITEMS, INITIAL_CATEGORIES, INITIAL_REVIEWS, DEFAULT_CONFIG } from './initialData';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import CartModal from './components/CartModal';
import QrCodeModal from './components/QrCodeModal';
import AdminPanel from './components/AdminPanel';

const CATEGORY_MAPPING: Record<string, string> = {
  'all': 'All',
  'appetizers': 'Appetizers',
  'burgers': 'Burgers',
  'pizza': 'Pizza',
  'shawarma': 'Shawarma',
  'wraps': 'Wraps',
  'fries': 'Fries',
  'wings': 'Wings',
  'sandwiches': 'Sandwiches',
  'bbq': 'BBQ',
  'rolls': 'Rolls & Platter',
  'rolls & platter': 'Rolls & Platter',
  'deals': 'Deals',
  'beverages': 'Beverages',
  'desserts': 'Desserts'
};

export default function App() {
  // --- Persistent States from LocalStorage ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('chession_menu_items');
    if (saved) {
      return JSON.parse(saved) as MenuItem[];
    }
    return [...INITIAL_MENU_ITEMS];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('chession_categories');
    if (saved) {
      return JSON.parse(saved) as string[];
    }
    return [...INITIAL_CATEGORIES];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('chession_reviews');
    if (saved) {
      const parsed = JSON.parse(saved) as Review[];
      // Filter out legacy default reviews ('r1', 'r2', 'r3')
      return parsed.filter(r => r.id !== 'r1' && r.id !== 'r2' && r.id !== 'r3');
    }
    return INITIAL_REVIEWS;
  });

  const [config, setConfig] = useState<RestaurantConfig>(() => {
    const saved = localStorage.getItem('chession_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.address === 'Commercial Area Phase 1, DHA, Lahore, Pakistan' || parsed.phone === '+92 300 1234567') {
        return DEFAULT_CONFIG;
      }
      return parsed;
    }
    return DEFAULT_CONFIG;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('chession_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('chession_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('chession_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // --- UI Controls ---
  const [activeSection, setActiveSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [itemConfirmDeleteId, setItemConfirmDeleteId] = useState<string | null>(null);
  const [adminEditItemId, setAdminEditItemId] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('chession_admin_logged_in') === 'true';
  });

  const handleSetAdminLoggedIn = (loggedIn: boolean) => {
    setIsAdminLoggedIn(loggedIn);
    localStorage.setItem('chession_admin_logged_in', loggedIn ? 'true' : 'false');
  };

  // --- Filtering & Search ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [maxPrice, setMaxPrice] = useState(3000);

  // --- Selected sizes for menu items ---
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});



  const [dataInitialized, setDataInitialized] = useState(false);

  // Sync from server on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [menuRes, catRes, configRes] = await Promise.all([
          fetch('/api/menu').then(r => r.ok ? r.json() : null),
          fetch('/api/categories').then(r => r.ok ? r.json() : null),
          fetch('/api/config').then(r => r.ok ? r.json() : null)
        ]);

        if (menuRes && Array.isArray(menuRes)) {
          setMenuItems(menuRes);
          localStorage.setItem('chession_menu_items', JSON.stringify(menuRes));
        }
        if (catRes && Array.isArray(catRes)) {
          setCategories(catRes);
          localStorage.setItem('chession_categories', JSON.stringify(catRes));
        }
        if (configRes && typeof configRes === 'object' && configRes !== null) {
          setConfig(configRes);
          localStorage.setItem('chession_config', JSON.stringify(configRes));
        }
      } catch (err) {
        console.error('Failed to load server data:', err);
      } finally {
        setDataInitialized(true);
      }
    };

    loadData();
  }, []);

  // Sync to localStorage & Server API (Admin only)
  useEffect(() => {
    localStorage.setItem('chession_menu_items', JSON.stringify(menuItems));
    if (dataInitialized && isAdminLoggedIn) {
      fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItems)
      }).catch(err => console.error('Failed to save menu to server:', err));
    }
  }, [menuItems, dataInitialized, isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('chession_categories', JSON.stringify(categories));
    if (dataInitialized && isAdminLoggedIn) {
      fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories)
      }).catch(err => console.error('Failed to save categories to server:', err));
    }
  }, [categories, dataInitialized, isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('chession_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('chession_config', JSON.stringify(config));
    if (dataInitialized && isAdminLoggedIn) {
      fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      }).catch(err => console.error('Failed to save config to server:', err));
    }
  }, [config, dataInitialized, isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('chession_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('chession_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('chession_orders', JSON.stringify(orders));
  }, [orders]);

  // Set default slider max based on items
  useEffect(() => {
    if (menuItems.length > 0) {
      // Set to 3000 as explicitly requested
      setMaxPrice(3000);
    }
  }, [menuItems]);

  // Handle active navigation scrolling indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'about', 'gallery', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // navbar buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // --- Cart Handlers ---
  const handleAddToCart = (menuItem: MenuItem, selectedSize?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.menuItem.id === menuItem.id && item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      const finalSize = selectedSize || (menuItem.sizes && menuItem.sizes.length > 0 ? menuItem.sizes[0].name : undefined);
      let finalPrice = menuItem.price;
      if (finalSize && menuItem.sizes) {
        const foundSize = menuItem.sizes.find(s => s.name === finalSize);
        if (foundSize) {
          finalPrice = foundSize.price;
        }
      }

      const itemWithPrice = {
        ...menuItem,
        price: finalPrice
      };

      return [...prev, { menuItem: itemWithPrice, quantity: 1, selectedSize: finalSize }];
    });
  };

  const handleUpdateQuantity = (menuItemId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      handleRemoveFromCart(menuItemId, selectedSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.menuItem.id === menuItemId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (menuItemId: string, selectedSize?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.menuItem.id === menuItemId && item.selectedSize === selectedSize))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // --- Favorite Handlers ---
  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // --- Order Placement ---
  const handlePlaceOrder = (newOrderData: Omit<Order, 'id' | 'createdAt'>) => {
    const orderId = `CH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...newOrderData,
      id: orderId,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // --- Add Customer Review ---
  const handleAddReview = (newReviewData: { name: string; rating: number; comment: string }) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: newReviewData.name,
      rating: newReviewData.rating,
      comment: newReviewData.comment,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&w=120&q=80`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  // --- Menu Filtration Calculations ---
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const trimmedQuery = searchQuery.trim().toLowerCase();
      const itemCat = (item.category || '').trim().toLowerCase();
      const activeCat = (activeCategory || 'All').trim().toLowerCase();
      const matchesCategory = activeCat === 'all' || itemCat === activeCat;
      const matchesSearch = !trimmedQuery ||
                            (item.name || '').toLowerCase().includes(trimmedQuery) ||
                            (item.description || '').toLowerCase().includes(trimmedQuery) ||
                            itemCat.includes(trimmedQuery) ||
                            (item.tags && item.tags.some(tag => (tag || '').toLowerCase().includes(trimmedQuery)));
      const matchesFavorite = !showOnlyFavorites || favorites.includes(item.id);
      const matchesPrice = item.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesFavorite && matchesPrice;
    });
  }, [menuItems, activeCategory, searchQuery, showOnlyFavorites, favorites, maxPrice]);

  const maxPriceLimit = 3000;

  const totalCartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F3FF] text-[#2D1B4D] font-sans selection:bg-purple-200 selection:text-purple-900" id="app-root-container">
      
      {/* 1. Navbar */}
      <Navbar
        cartCount={totalCartItemsCount}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => {
          setShowOnlyFavorites(true);
          handleScrollToSection('menu');
        }}
        isAdminMode={isAdminOpen}
        onToggleAdminMode={() => setIsAdminOpen(true)}
        onOpenQrCode={() => setIsQrOpen(true)}
        activeSection={activeSection}
        onNavigate={handleScrollToSection}
      />

      {isAdminLoggedIn && (
        <div className="bg-[#facc15] text-[#2D1B4D] px-4 py-3.5 text-center font-sans text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-3 shadow-md border-b border-amber-400/30 sticky top-20 z-40 animate-fade-in" id="admin-active-sticky-banner">
          <span className="flex items-center gap-1.5">
            <Unlock className="h-4 w-4 text-[#5c1d9b] shrink-0 animate-pulse" />
            <span>⚡ <strong>ADMIN ACTIVE:</strong> You can delete any food item directly from cards below or manage everything in the console!</span>
          </span>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3.5 py-1 bg-[#5c1d9b] text-white hover:bg-[#3b0764] rounded-full text-[10px] font-black cursor-pointer shadow-xs transition-all uppercase"
            >
              Open Control Console
            </button>
            <button
              onClick={() => handleSetAdminLoggedIn(false)}
              className="px-3.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-[10px] font-black cursor-pointer shadow-xs transition-all uppercase"
            >
              Exit Admin Mode
            </button>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <Hero
        config={config}
        onExploreMenu={() => handleScrollToSection('menu')}
      />

      {/* 3. Dynamic Menu catalog and filter */}
      <section id="menu" className="py-24 bg-gradient-to-b from-[#F5F3FF] to-white/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16" id="menu-section-header">
            <span className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#5c1d9b]">
              Gourmet Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#2D1B4D] mt-2 tracking-tight">
              Browse Chession Fast Food Menu
            </h2>
            <div className="h-1.5 w-16 bg-[#5c1d9b] mx-auto mt-4 rounded-full" />
          </div>

          {/* Search, Filter Slider, & Favorites Toggles Row */}
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white mb-10 space-y-6 shadow-xl shadow-purple-900/5" id="filters-panel">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search Field */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-purple-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Zinger burger, Crown crust pizza, Seekh kababs..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-[#2D1B4D] placeholder-purple-400/70 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all font-sans text-sm"
                  id="search-input-field"
                />
              </div>

              {/* Price Filter Slider */}
              <div className="md:col-span-4 flex flex-col justify-center px-2">
                <div className="flex justify-between text-xs font-sans font-bold text-[#2D1B4D] mb-2">
                  <span className="flex items-center space-x-1">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#5c1d9b]" />
                    <span>Price Range:</span>
                  </span>
                  <span className="text-[#5c1d9b]">Rs. 200 - Rs. {maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max={maxPriceLimit}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#5c1d9b] cursor-pointer h-1.5 bg-purple-100 rounded-lg"
                  id="price-range-slider"
                />
              </div>

              {/* Favorites Filter Toggle */}
              <div className="md:col-span-2">
                <button
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  className={`w-full py-3 px-4 rounded-2xl font-sans font-bold text-xs border transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                    showOnlyFavorites
                      ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                      : 'bg-white border-purple-100 text-[#2D1B4D] hover:bg-purple-50'
                  }`}
                  id="toggle-favs-only-btn"
                >
                  <Heart className={`h-4 w-4 ${showOnlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{showOnlyFavorites ? 'Show All' : 'My Favorites'}</span>
                </button>
              </div>

            </div>

            {/* Category label with mobile horizontal scroll indicator */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-sans font-bold text-purple-900/60 uppercase tracking-wider">Select Category / کیٹیگری منتخب کریں</span>
              <span className="text-[10px] font-sans font-bold text-[#5c1d9b] bg-purple-50 px-2 py-0.5 rounded-full md:hidden animate-pulse">
                Swipe left-right to see more ➔
              </span>
            </div>

            {/* Category horizontal scrolling pills */}
            <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar" id="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold tracking-wide shrink-0 transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#5c1d9b] text-white shadow-lg shadow-purple-100 border border-[#5c1d9b]'
                      : 'bg-white text-[#2D1B4D] hover:bg-purple-50 border border-purple-50'
                  }`}
                  id={`cat-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat === 'All' ? '🍽️ All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Display Grid */}
          {filteredMenuItems.length === 0 ? (
            <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2rem] border border-dashed border-purple-200 space-y-4" id="empty-menu-alert">
              <span className="text-4xl">🍕</span>
              <h4 className="text-lg font-display font-bold text-[#2D1B4D]">No Food Items Match Filters</h4>
              <p className="text-sm text-purple-400 font-sans max-w-sm mx-auto">
                Try widening your search query, increasing the price filter range, or browsing other fast food categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setMaxPrice(maxPriceLimit);
                  setShowOnlyFavorites(false);
                }}
                className="px-5 py-2.5 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-xl text-xs font-sans font-bold transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              id="menu-cards-grid"
            >
              {filteredMenuItems.map((item) => {
                const isFav = favorites.includes(item.id);
                
                // Determine selected size and corresponding display price
                const activeSize = selectedSizes[item.id] || (item.sizes && item.sizes.length > 0 ? item.sizes[0].name : undefined);
                const displayPrice = item.sizes && activeSize
                  ? (item.sizes.find(s => s.name === activeSize)?.price || item.price)
                  : item.price;

                const isInCart = cartItems.find(ci => ci.menuItem.id === item.id && ci.selectedSize === activeSize);

                return (
                  <div
                    key={item.id}
                    className="relative group bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-5 flex flex-col gap-3 shadow-xl shadow-purple-900/5 hover:bg-white transition-all duration-300 justify-between transform hover:-translate-y-1"
                    id={`menu-item-card-${item.id}`}
                  >
                    {itemConfirmDeleteId === item.id && (
                      <div className="absolute inset-0 bg-rose-950/95 backdrop-blur-sm rounded-[2rem] p-6 flex flex-col justify-center items-center text-center z-50 animate-fade-in text-white gap-4">
                        <AlertCircle className="h-10 w-10 text-rose-400 animate-bounce" />
                        <div className="space-y-1">
                          <h5 className="font-display font-extrabold text-xs text-white">Delete this item?</h5>
                          <p className="text-[10px] text-rose-200 font-sans">کیا آپ واقعی اس مینو آئٹم کو مٹانا چاہتے ہیں؟</p>
                        </div>
                        <div className="flex gap-2 w-full max-w-[200px]">
                          <button
                            onClick={() => {
                              // Save to deleted items list in localStorage
                              const deletedSaved = localStorage.getItem('chession_deleted_menu_items');
                              const deletedIds: string[] = deletedSaved ? JSON.parse(deletedSaved) : [];
                              if (!deletedIds.includes(item.id)) {
                                deletedIds.push(item.id);
                                localStorage.setItem('chession_deleted_menu_items', JSON.stringify(deletedIds));
                              }

                              setMenuItems(prev => {
                                const updated = prev.filter(it => it.id !== item.id);
                                localStorage.setItem('chession_menu_items', JSON.stringify(updated));
                                return updated;
                              });
                              setItemConfirmDeleteId(null);
                            }}
                            className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-sans font-bold cursor-pointer transition-all shadow-md"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setItemConfirmDeleteId(null)}
                            className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Item Image with floating badges & actions */}
                    <div className="relative aspect-4/3 overflow-hidden bg-purple-50 rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                      />

                      {/* Floating action buttons */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                        {isAdminLoggedIn && (
                          <>
                            {/* Admin Edit Button */}
                            <button
                              onClick={() => {
                                setAdminEditItemId(item.id);
                                setIsAdminOpen(true);
                              }}
                              className="p-2 rounded-full bg-purple-50/95 backdrop-blur-md text-[#5c1d9b] hover:text-white hover:bg-[#5c1d9b] hover:scale-110 active:scale-95 shadow-md border border-purple-100 transition-all cursor-pointer animate-fade-in"
                              title="Edit Food Item / کھانا تبدیل کریں"
                              id={`item-card-admin-edit-${item.id}`}
                            >
                              <Edit2 className="h-4.5 w-4.5" />
                            </button>

                            {/* Admin Delete Button */}
                            <button
                              onClick={() => setItemConfirmDeleteId(item.id)}
                              className="p-2 rounded-full bg-rose-50/95 backdrop-blur-md text-rose-500 hover:text-white hover:bg-rose-600 hover:scale-110 active:scale-95 shadow-md border border-rose-100 transition-all cursor-pointer animate-fade-in"
                              title="Delete Food Item / کھانا حذف کریں"
                              id={`item-card-admin-delete-${item.id}`}
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </>
                        )}

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="p-2 rounded-full bg-white/95 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-95 shadow-md border border-slate-50 transition-all cursor-pointer"
                          id={`item-card-fav-${item.id}`}
                        >
                          <Heart className={`h-4.5 w-4.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Category Badge */}
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#5c1d9b]/90 backdrop-blur-md text-[#facc15] font-sans text-[10px] font-extrabold rounded-full uppercase tracking-widest shadow-xs">
                        {item.category}
                      </span>

                      {/* Customized Tags (if any) */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-[#facc15] text-[#2D1B4D] font-sans text-[9px] font-bold rounded-lg shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Content & Text */}
                    <div className="flex-1 flex flex-col justify-between gap-3">
                      <div className="space-y-1">
                        <h4 className="text-base font-display font-bold text-[#2D1B4D] group-hover:text-[#5c1d9b] transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-purple-400 font-sans leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Size Selector for items with multiple sizes */}
                      {item.sizes && item.sizes.length > 0 && (
                        <div className="flex gap-1.5 mt-1 bg-purple-50/50 p-1 rounded-xl border border-purple-100/30">
                          {item.sizes.map((sz) => {
                            const isSelected = activeSize === sz.name;
                            return (
                              <button
                                key={sz.name}
                                onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: sz.name }))}
                                className={`flex-1 py-1 px-2.5 rounded-lg text-[10px] font-sans font-extrabold transition-all cursor-pointer text-center ${
                                  isSelected
                                    ? 'bg-[#5c1d9b] text-white shadow-xs'
                                    : 'bg-white text-purple-900/70 hover:bg-purple-100/40 hover:text-[#5c1d9b]'
                                }`}
                              >
                                {sz.name}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Price & Buy controls */}
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-base font-display font-extrabold text-[#5c1d9b]">
                          Rs. {displayPrice}
                        </span>

                        <button
                          onClick={() => handleAddToCart(item, activeSize)}
                          className={`py-2 px-4 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all flex items-center space-x-1.5 ${
                            isInCart
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-[#5c1d9b] hover:bg-[#3b0764] text-white shadow-lg shadow-purple-100'
                          }`}
                          id={`item-card-add-${item.id}`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Added ({isInCart.quantity})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5 text-[#facc15]" />
                              <span>Add to Basket</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. About Us Section */}
      <AboutUs />

      {/* 5. Image Gallery Section */}
      <Gallery />

      {/* 6. Customer Testimonials Reviews */}
      <Reviews
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* 7. Contact Info Branch Location Map */}
      <Contact config={config} />

      {/* 8. Elegant Brand Footer */}
      <footer className="bg-brand-purple-dark text-purple-100 py-16 border-t border-purple-950" id="brand-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12" id="footer-grid">
            
            {/* Column 1: Info */}
            <div className="space-y-4" id="footer-col-1">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-brand-purple flex items-center justify-center border border-purple-800">
                  <span className="text-lg">🍽️</span>
                </div>
                <span className="text-lg font-display font-extrabold text-white tracking-wider">
                  CHESSION FAST FOOD
                </span>
              </div>
              <p className="text-xs text-purple-300 font-sans leading-relaxed">
                Experience gourmet luxury dining fast-tracked to your doorstep. The ultimate standard for premium burgers, crust pizzas, and grilled coal BBQ.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4" id="footer-col-2">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Navigation</h4>
              <div className="flex flex-col space-y-2 text-xs font-sans text-purple-300">
                <button onClick={() => handleScrollToSection('home')} className="hover:text-brand-yellow text-left cursor-pointer">Home</button>
                <button onClick={() => handleScrollToSection('menu')} className="hover:text-brand-yellow text-left cursor-pointer">Browse Menu</button>
                <button onClick={() => handleScrollToSection('about')} className="hover:text-brand-yellow text-left cursor-pointer">Our Story</button>
                <button onClick={() => handleScrollToSection('gallery')} className="hover:text-brand-yellow text-left cursor-pointer">Kitchen Gallery</button>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-4" id="footer-col-3">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Direct Contact</h4>
              <div className="space-y-2 text-xs font-sans text-purple-300">
                <p className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-brand-yellow shrink-0" />
                  <span>{config.phone}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Clock className="h-3.5 w-3.5 text-brand-yellow shrink-0" />
                  <span>Daily: {config.openingHours}</span>
                </p>
                <p className="flex items-start space-x-2 leading-relaxed">
                  <MapPin className="h-3.5 w-3.5 text-brand-yellow shrink-0 mt-0.5" />
                  <span>{config.address}</span>
                </p>
              </div>
            </div>

            {/* Column 4: WhatsApp ordering */}
            <div className="space-y-4" id="footer-col-4">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Order Now</h4>
              <p className="text-xs text-purple-300 font-sans leading-relaxed">
                Connect directly with Chession cooks to place an order via WhatsApp or voice call.
              </p>
              <a
                href={`https://wa.me/${config.whatsapp}?text=Hello!%20I%20would%20like%20to%20order%20delicious%20food.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-md shadow-emerald-950/20"
              >
                <MessageSquare className="h-3.5 w-3.5 text-white fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          <div className="border-t border-purple-950 mt-12 pt-6 text-center flex flex-col sm:flex-row justify-between items-center text-[10px] text-purple-400 font-sans gap-2" id="footer-copyright">
            <p>© {new Date().getFullYear()} Chession Fast Food. All Rights Reserved.</p>
            <p>Designed with pristine layout, typography pairing & custom Glassmorphism panels.</p>
          </div>
        </div>

        {/* Bottom Bar: Status */}
        <div className="mt-8 h-10 bg-purple-950/50 text-white flex items-center px-8 justify-between text-[9px] font-mono tracking-widest uppercase border-t border-purple-900/60">
          <div className="flex gap-6">
            <span>Location: {config.address.split(',')[0]}</span>
            <span>Status: <span className="text-[#facc15] font-bold">Online</span></span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsAdminOpen(true)} className="hover:text-[#facc15] transition-all cursor-pointer">Admin Panel</button>
            <span>v1.2 Premium</span>
          </div>
        </div>
      </footer>

      {/* --- FLOATING OVERLAY MODALS --- */}
      
      {/* A. Cart Modal overlay */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        config={config}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* B. QR Code Modal overlay */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        appUrl={window.location.href}
      />

      {/* C. Admin Management Panel Gate & Screen */}
      {isAdminOpen && (
        <AdminPanel
          menuItems={menuItems}
          categories={categories}
          orders={orders}
          config={config}
          onUpdateMenuItems={setMenuItems}
          onUpdateCategories={setCategories}
          onUpdateOrders={setOrders}
          onUpdateConfig={setConfig}
          onClose={() => {
            setIsAdminOpen(false);
            setAdminEditItemId(null);
          }}
          isAdminLoggedIn={isAdminLoggedIn}
          onSetAdminLoggedIn={handleSetAdminLoggedIn}
          initialEditItemId={adminEditItemId}
          onClearInitialEditItemId={() => setAdminEditItemId(null)}
        />
      )}

    </div>
  );
}
