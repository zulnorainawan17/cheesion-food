/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  Check,
  RotateCcw,
  ShoppingBag,
  Grid,
  Settings,
  AlertCircle,
  Eye,
  DollarSign
} from 'lucide-react';
import { MenuItem, Order, RestaurantConfig } from '../types';
import { INITIAL_MENU_ITEMS } from '../initialData';

interface AdminPanelProps {
  menuItems: MenuItem[];
  categories: string[];
  orders: Order[];
  config: RestaurantConfig;
  onUpdateMenuItems: (items: MenuItem[]) => void;
  onUpdateCategories: (categories: string[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateConfig: (config: RestaurantConfig) => void;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onSetAdminLoggedIn: (loggedIn: boolean) => void;
  initialEditItemId?: string | null;
  onClearInitialEditItemId?: () => void;
}

export default function AdminPanel({
  menuItems,
  categories,
  orders,
  config,
  onUpdateMenuItems,
  onUpdateCategories,
  onUpdateOrders,
  onUpdateConfig,
  onClose,
  isAdminLoggedIn,
  onSetAdminLoggedIn,
  initialEditItemId,
  onClearInitialEditItemId
}: AdminPanelProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminLoggedIn);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'orders' | 'settings'>('menu');

  // Form states for adding/editing items
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState(categories[1] || 'Burgers');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState('');
  const [newItemTags, setNewItemTags] = useState('');

  // Form states for categories
  const [newCategoryName, setNewCategoryName] = useState('');

  // Confirmation states
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [deletingCategoryName, setDeletingCategoryName] = useState<string | null>(null);
  const [showSettingsSuccess, setShowSettingsSuccess] = useState(false);

  // Password submission
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passcode === '1717') {
      setIsAuthenticated(true);
      onSetAdminLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode! Please check with the administrator.');
    }
  };

  // Menu item actions
  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newItemPrice);
    if (!newItemName.trim() || isNaN(priceNum)) return;

    let finalImage = newItemImage.trim();
    if (!finalImage) {
      const catLower = newItemCategory.toLowerCase();
      if (catLower.includes('pizza')) {
        finalImage = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
      } else if (catLower.includes('shawarma') || catLower.includes('wrap')) {
        finalImage = 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80';
      } else if (catLower.includes('fries') || catLower.includes('side')) {
        finalImage = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80';
      } else if (catLower.includes('drink') || catLower.includes('beverage') || catLower.includes('juice')) {
        finalImage = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80';
      } else {
        // default burger
        finalImage = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80';
      }
    }

    const tagsArray = newItemTags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    if (editingItem) {
      // Edit existing
      const updated = menuItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: newItemName,
              price: priceNum,
              category: newItemCategory,
              description: newItemDesc,
              image: finalImage,
              tags: tagsArray
            }
          : item
      );
      onUpdateMenuItems(updated);
    } else {
      // Add new
      const newItem: MenuItem = {
        id: `m-${Date.now()}`,
        name: newItemName,
        price: priceNum,
        category: newItemCategory,
        description: newItemDesc,
        image: finalImage,
        tags: tagsArray
      };
      onUpdateMenuItems([newItem, ...menuItems]);
    }

    resetItemForm();
  };

  const startEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsAddingItem(true);
    setNewItemName(item.name);
    setNewItemPrice(item.price.toString());
    setNewItemCategory(item.category);
    setNewItemDesc(item.description);
    setNewItemImage(item.image);
    setNewItemTags(item.tags?.join(', ') || '');
  };

  useEffect(() => {
    if (initialEditItemId && isAuthenticated) {
      const item = menuItems.find(it => it.id === initialEditItemId);
      if (item) {
        startEditItem(item);
        setActiveTab('menu');
        if (onClearInitialEditItemId) {
          onClearInitialEditItemId();
        }
      }
    }
  }, [initialEditItemId, isAuthenticated, menuItems]);

  const handleDeleteItem = (id: string) => {
    setDeletingItemId(id);
  };

  const handleResetMenu = () => {
    localStorage.removeItem('chession_deleted_menu_items');
    onUpdateMenuItems(INITIAL_MENU_ITEMS);
    setShowResetConfirm(false);
  };

  const handleClearMenu = () => {
    const allIds = menuItems.map(it => it.id);
    localStorage.setItem('chession_deleted_menu_items', JSON.stringify(allIds));
    onUpdateMenuItems([]);
    setShowClearConfirm(false);
  };

  const resetItemForm = () => {
    setEditingItem(null);
    setIsAddingItem(false);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemCategory(categories[1] || 'Burgers');
    setNewItemDesc('');
    setNewItemImage('');
    setNewItemTags('');
  };

  // Category actions
  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();
    const name = newCategoryName.trim();
    if (!name || categories.some(c => c.toLowerCase() === name.toLowerCase())) return;

    onUpdateCategories([...categories, name]);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (catName: string) => {
    if (catName === 'All') return;
    setDeletingCategoryName(catName);
  };

  // Order management
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    onUpdateOrders(updated);
  };

  // Settings update
  const [settingPhone, setSettingPhone] = useState(config.phone);
  const [settingWhatsapp, setSettingWhatsapp] = useState(config.whatsapp);
  const [settingAddress, setSettingAddress] = useState(config.address);
  const [settingHours, setSettingHours] = useState(config.openingHours);
  const [settingCharges, setSettingCharges] = useState(config.deliveryCharges.toString());

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    const chargesNum = parseFloat(settingCharges);
    if (isNaN(chargesNum)) return;

    onUpdateConfig({
      phone: settingPhone,
      whatsapp: settingWhatsapp,
      address: settingAddress,
      openingHours: settingHours,
      deliveryCharges: chargesNum
    });
    setShowSettingsSuccess(true);
    setTimeout(() => {
      setShowSettingsSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" id="admin-panel-overlay">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Admin Window Frame */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden animate-scale-up border border-purple-100" id="admin-panel-window">
        
        {/* Header Block */}
        <div className="px-6 py-5 border-b border-purple-100 flex justify-between items-center bg-[#5c1d9b] text-white" id="admin-header">
          <div className="flex items-center space-x-3">
            <Unlock className="h-5 w-5 text-[#facc15]" />
            <div>
              <h3 className="text-lg font-display font-bold">Chession Management Core</h3>
              <p className="text-[10px] text-purple-200 font-mono">Role: Authorized Administrator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            id="admin-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Auth Gate Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F5F3FF] to-white" id="admin-auth-gate">
            <div className="max-w-md w-full bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-purple-100 space-y-6">
              <div className="text-center space-y-2">
                <div className="h-14 w-14 rounded-full bg-[#5c1d9b]/10 text-[#5c1d9b] flex items-center justify-center mx-auto">
                  <Lock className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-display font-extrabold text-[#2D1B4D]">Enter Admin Passcode</h4>
                <p className="text-xs text-purple-400 font-sans">
                  Please enter your secure 4-digit passcode to manage Cheesion Core.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4" id="admin-login-form">
                <div>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-mono text-center text-lg tracking-widest bg-white"
                    placeholder="••••"
                  />
                </div>

                {authError && (
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-sans font-medium flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full font-sans font-bold text-sm transition-all cursor-pointer shadow-lg shadow-purple-100"
                  >
                    Verify Credentials / تصدیق کریں
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* --- AUTHENTICATED ADMIN DASHBOARD --- */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0" id="admin-dashboard-layout">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-purple-50/50 border-r border-purple-100 flex flex-row md:flex-col p-2 md:p-4 gap-1 overflow-x-auto md:overflow-x-visible" id="admin-sidebar">
              <button
                onClick={() => { setActiveTab('menu'); resetItemForm(); }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'menu' ? 'bg-[#5c1d9b] text-white shadow-md shadow-purple-900/10' : 'text-purple-900/70 hover:bg-purple-100/60 hover:text-[#5c1d9b]'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Manage Menu</span>
              </button>

              <button
                onClick={() => { setActiveTab('categories'); }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'categories' ? 'bg-[#5c1d9b] text-white shadow-md shadow-purple-900/10' : 'text-purple-900/70 hover:bg-purple-100/60 hover:text-[#5c1d9b]'
                }`}
              >
                <Grid className="h-4 w-4" />
                <span>Categories</span>
              </button>

              <button
                onClick={() => { setActiveTab('orders'); }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shrink-0 relative ${
                  activeTab === 'orders' ? 'bg-[#5c1d9b] text-white shadow-md shadow-purple-900/10' : 'text-purple-900/70 hover:bg-purple-100/60 hover:text-[#5c1d9b]'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>Orders Log</span>
                {orders.filter(o => o.status === 'Pending').length > 0 && (
                  <span className="h-4 min-w-4 px-1 bg-[#facc15] text-[#2D1B4D] text-[9px] font-extrabold rounded-full flex items-center justify-center absolute top-2 right-2 animate-bounce">
                    {orders.filter(o => o.status === 'Pending').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('settings'); }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'settings' ? 'bg-[#5c1d9b] text-white shadow-md shadow-purple-900/10' : 'text-purple-900/70 hover:bg-purple-100/60 hover:text-[#5c1d9b]'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Restaurant Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  onSetAdminLoggedIn(false);
                  onClose();
                }}
                className="flex items-center space-x-2.5 px-4 py-3 rounded-full text-xs font-sans font-bold transition-all cursor-pointer text-rose-600 hover:bg-rose-50 hover:text-rose-700 shrink-0 mt-auto md:mt-4"
              >
                <Lock className="h-4 w-4" />
                <span>Log Out Admin</span>
              </button>
            </div>

            {/* Core Work Area */}
            <div className="flex-1 overflow-y-auto min-h-0 p-6 bg-white" id="admin-workplace">
              
              {/* --- TAB 1: MANAGE MENU --- */}
              {activeTab === 'menu' && (
                <div className="space-y-6" id="admin-menu-workplace">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" id="menu-tab-actions">
                    <div>
                      <h4 className="text-base font-display font-extrabold text-[#2D1B4D]">Chession Menu Library</h4>
                      <p className="text-xs text-purple-400 font-sans mt-0.5">Edit prices, upload food visual templates, and manage categories.</p>
                    </div>
                    {!isAddingItem && (
                      <div className="flex flex-wrap gap-2" id="menu-tab-buttons">
                        <button
                          onClick={() => setIsAddingItem(true)}
                          className="px-4 py-2 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full text-xs font-sans font-bold flex items-center space-x-1.5 cursor-pointer shadow-md shadow-purple-100"
                        >
                          <Plus className="h-4 w-4 text-[#facc15]" />
                          <span>Add New Food / نیا کھانا ڈالیں</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowResetConfirm(true);
                            setShowClearConfirm(false);
                          }}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-sans font-bold flex items-center space-x-1.5 cursor-pointer shadow-md shadow-amber-100"
                          title="Reset to original default menu"
                        >
                          <RotateCcw className="h-4 w-4 text-white" />
                          <span>Reset Defaults / مینو ری سیٹ</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowClearConfirm(true);
                            setShowResetConfirm(false);
                          }}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-sans font-bold flex items-center space-x-1.5 cursor-pointer shadow-md shadow-rose-100"
                          title="Delete all menu items"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                          <span>Clear All / سب ختم کریں</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action Confirmation Banner */}
                  {showResetConfirm && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-start space-x-2.5">
                        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-bold text-xs text-amber-900">Are you sure you want to load default menu?</h5>
                          <p className="text-[11px] text-amber-700 font-sans mt-0.5">This will restore original system items and overwrite any current changes.</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={handleResetMenu}
                          className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-[11px] rounded-full cursor-pointer shadow-sm"
                        >
                          Yes, Reset / ہاں، ری سیٹ کریں
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="px-4 py-1.5 bg-white border border-amber-300 text-amber-800 font-sans font-semibold text-[11px] rounded-full cursor-pointer hover:bg-amber-100/50"
                        >
                          No, Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {showClearConfirm && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-start space-x-2.5">
                        <Trash2 className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-bold text-xs text-rose-900">Are you sure you want to delete ALL menu items?</h5>
                          <p className="text-[11px] text-rose-700 font-sans mt-0.5">Warning: This will completely empty your menu library. You will have to add items manually.</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={handleClearMenu}
                          className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold text-[11px] rounded-full cursor-pointer shadow-sm"
                        >
                          Yes, Delete All / ہاں، سب مٹا دیں
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="px-4 py-1.5 bg-white border border-rose-300 text-rose-800 font-sans font-semibold text-[11px] rounded-full cursor-pointer hover:bg-rose-100/50"
                        >
                          No, Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {deletingItemId && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-start space-x-2.5">
                        <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-bold text-xs text-rose-900">
                            Are you sure you want to delete "{menuItems.find(it => it.id === deletingItemId)?.name}"?
                          </h5>
                          <p className="text-[11px] text-rose-700 font-sans mt-0.5">This item will be permanently removed from your menu list.</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            if (deletingItemId) {
                              const deletedSaved = localStorage.getItem('chession_deleted_menu_items');
                              const deletedIds: string[] = deletedSaved ? JSON.parse(deletedSaved) : [];
                              if (!deletedIds.includes(deletingItemId)) {
                                deletedIds.push(deletingItemId);
                                localStorage.setItem('chession_deleted_menu_items', JSON.stringify(deletedIds));
                              }
                              onUpdateMenuItems(menuItems.filter((item) => item.id !== deletingItemId));
                              setDeletingItemId(null);
                            }
                          }}
                          className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold text-[11px] rounded-full cursor-pointer shadow-sm"
                        >
                          Yes, Delete / ہاں، مٹا دیں
                        </button>
                        <button
                          onClick={() => setDeletingItemId(null)}
                          className="px-4 py-1.5 bg-white border border-rose-300 text-rose-800 font-sans font-semibold text-[11px] rounded-full cursor-pointer hover:bg-rose-100/50"
                        >
                          No, Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {isAddingItem ? (
                    /* Add / Edit Form */
                    <form onSubmit={handleSaveItem} className="bg-purple-50/30 p-6 rounded-[2rem] border border-purple-100/40 space-y-4 animate-fade-in" id="item-form">
                      <h5 className="font-display font-bold text-sm text-[#2D1B4D]">
                        {editingItem ? `Editing: ${editingItem.name}` : 'Create New Menu Item'}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-bold text-purple-400 uppercase mb-1">Food Name *</label>
                          <input
                            type="text"
                            required
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans"
                            placeholder="e.g. Mighty Jalapeno Burger"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-bold text-purple-400 uppercase mb-1">Price (Rs.) *</label>
                          <input
                            type="number"
                            required
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans"
                            placeholder="e.g. 480"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-sans font-bold text-purple-400 uppercase mb-1">Category *</label>
                          <select
                            value={newItemCategory}
                            onChange={(e) => setNewItemCategory(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans"
                          >
                            {categories.filter(c => c !== 'All').map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-bold text-purple-400 uppercase mb-1">Image URL (Optional)</label>
                          <input
                            type="text"
                            value={newItemImage}
                            onChange={(e) => setNewItemImage(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans"
                            placeholder="Optional. Standard image will be chosen by default."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-purple-400 uppercase mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={newItemDesc}
                          onChange={(e) => setNewItemDesc(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans"
                          placeholder="A delicious description..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-purple-400 uppercase mb-1">Tags (Comma separated)</label>
                        <input
                          type="text"
                          value={newItemTags}
                          onChange={(e) => setNewItemTags(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans"
                          placeholder="e.g. Spicy, Hot, Best Seller"
                        />
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-lg shadow-green-100"
                        >
                          {editingItem ? 'Save Updates' : 'Publish Dish'}
                        </button>
                        <button
                          type="button"
                          onClick={resetItemForm}
                          className="px-6 py-2.5 border-2 border-purple-100 hover:bg-purple-50 text-purple-900/70 bg-white rounded-full text-xs font-sans font-bold transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Items Table */
                    <div className="border border-purple-100 rounded-[2rem] overflow-auto shadow-xl shadow-purple-900/5 bg-white max-h-[500px]" id="menu-table-wrapper">
                      <table className="w-full text-left border-collapse" id="menu-table">
                        <thead className="sticky top-0 z-10 bg-white">
                          <tr className="bg-purple-50 border-b border-purple-100 text-xs font-sans font-bold text-[#2D1B4D]">
                            <th className="p-4">Dish</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-50 text-sm font-sans text-purple-950/80">
                          {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    referrerPolicy="no-referrer"
                                    className="h-10 w-10 rounded-xl object-cover shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <h5 className="font-display font-bold text-[#2D1B4D] truncate">{item.name}</h5>
                                    <p className="text-[10px] text-purple-400 truncate max-w-xs">{item.description}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 bg-purple-100/60 text-[#5c1d9b] text-xs font-bold rounded-full">
                                  {item.category}
                                </span>
                              </td>
                              <td className="p-4 font-bold text-[#2D1B4D]">
                                {item.sizes && item.sizes.length > 0 ? (
                                  <div className="flex flex-col space-y-0.5 text-xs">
                                    {item.sizes.map((s) => (
                                      <span key={s.name} className="text-purple-900 font-semibold block">
                                        {s.name}: Rs. {s.price}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  `Rs. ${item.price}`
                                )}
                              </td>
                              <td className="p-4 text-right space-x-2 shrink-0">
                                <button
                                  onClick={() => startEditItem(item)}
                                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-[#5c1d9b] bg-purple-50 hover:bg-purple-100 rounded-full transition-all cursor-pointer border border-purple-100"
                                  title="Edit Dish"
                                >
                                  <Edit2 className="h-3 w-3" />
                                  <span>Edit / تبدیل</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-full transition-all cursor-pointer border border-rose-100"
                                  title="Delete Dish"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span>Delete / مٹائیں</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB 2: CATEGORIES --- */}
              {activeTab === 'categories' && (
                <div className="space-y-6" id="admin-categories-workplace">
                  <div>
                    <h4 className="text-base font-display font-extrabold text-[#2D1B4D]">Manage Menu Categories</h4>
                    <p className="text-xs text-purple-400 font-sans mt-0.5">Add or remove custom food groups on the customer navigation bar.</p>
                  </div>

                  {/* Add Category Form */}
                  <form onSubmit={handleAddCategory} className="flex space-x-3 max-w-md" id="category-form">
                    <input
                      type="text"
                      required
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                      placeholder="e.g. Specialty Shakes"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full text-xs font-sans font-bold flex items-center space-x-1 cursor-pointer shadow-md shadow-purple-100"
                    >
                      <Plus className="h-4 w-4 text-[#facc15]" />
                      <span>Add</span>
                    </button>
                  </form>

                  {deletingCategoryName && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-start space-x-2.5">
                        <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-bold text-xs text-rose-900">Are you sure you want to delete category "{deletingCategoryName}"?</h5>
                          <p className="text-[11px] text-rose-700 font-sans mt-0.5">Associated menu items won't be deleted but will stay uncategorized.</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            onUpdateCategories(categories.filter((c) => c !== deletingCategoryName));
                            setDeletingCategoryName(null);
                          }}
                          className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold text-[11px] rounded-full cursor-pointer shadow-sm"
                        >
                          Yes, Delete / ہاں، مٹا دیں
                        </button>
                        <button
                          onClick={() => setDeletingCategoryName(null)}
                          className="px-4 py-1.5 bg-white border border-rose-300 text-rose-800 font-sans font-semibold text-[11px] rounded-full cursor-pointer hover:bg-rose-100/50"
                        >
                          No, Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Categories Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" id="categories-grid-list">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className="p-4 bg-purple-50/30 rounded-2xl border border-purple-100/40 flex justify-between items-center"
                      >
                        <span className="text-sm font-sans font-semibold text-[#2D1B4D]">{cat}</span>
                        {cat !== 'All' ? (
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-1.5 text-purple-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                            title="Delete category"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">System</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 3: ORDERS LOG --- */}
              {activeTab === 'orders' && (
                <div className="space-y-6" id="admin-orders-workplace">
                  <div>
                    <h4 className="text-base font-display font-extrabold text-[#2D1B4D]">Simulated Order Logs</h4>
                    <p className="text-xs text-purple-400 font-sans mt-0.5">Monitor and process incoming checkout requests live in this session.</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-purple-200 rounded-[2rem] bg-purple-50/10 space-y-2">
                      <AlertCircle className="h-8 w-8 text-purple-300 mx-auto" />
                      <h5 className="font-display font-bold text-sm text-[#2D1B4D]">No Orders Logged</h5>
                      <p className="text-xs text-purple-400 font-sans">Checkout items in your cart to see real-time orders arrive here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4" id="orders-cards-list">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-purple-50/20 p-5 rounded-[2rem] border border-purple-100/40 flex flex-col md:flex-row justify-between gap-4 animate-fade-in"
                          id={`order-log-${order.id}`}
                        >
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#5c1d9b] bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                                #{order.id}
                              </span>
                              <span className={`text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full ${
                                order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {order.status}
                              </span>
                              <span className="text-[10px] text-purple-400 font-mono">
                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="text-xs space-y-1 text-purple-950/70 font-sans">
                              <p><strong className="text-[#2D1B4D]">Customer:</strong> {order.customerName} ({order.customerPhone})</p>
                              <p><strong className="text-[#2D1B4D]">Type:</strong> {order.orderType} {order.tableNumber ? `| Table: ${order.tableNumber}` : ''}</p>
                              {order.customerAddress && (
                                <p className="truncate"><strong className="text-[#2D1B4D]">Address:</strong> {order.customerAddress}</p>
                              )}
                              {order.notes && (
                                <p className="text-[#5c1d9b] bg-purple-50 p-2.5 rounded-xl italic">"{order.notes}"</p>
                              )}
                            </div>

                            {/* Ordered Items List */}
                            <div className="border-t border-purple-100/60 pt-2 mt-2">
                              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-purple-400">Basket Items:</p>
                              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                                {order.items.map((item, i) => (
                                  <span key={i} className="text-xs text-purple-950 font-semibold bg-white px-2 py-1 rounded-lg border border-purple-100">
                                    {item.quantity}x {item.menuItem.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Order Actions */}
                          <div className="flex flex-col justify-between items-end md:w-44 border-l border-purple-100 md:pl-4">
                            <span className="text-base font-display font-extrabold text-[#2D1B4D]">
                              Rs. {order.totalAmount}
                            </span>

                            <div className="w-full space-y-1 mt-3">
                              <p className="text-[10px] text-purple-400 text-left font-sans">Change Status:</p>
                              <div className="grid grid-cols-2 gap-1">
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}
                                  disabled={order.status !== 'Pending'}
                                  className="py-1 px-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-40 text-[10px] font-sans font-bold rounded-full transition-colors cursor-pointer"
                                >
                                  Prepare
                                </button>
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                                  disabled={order.status !== 'Preparing'}
                                  className="py-1 px-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-40 text-[10px] font-sans font-bold rounded-full transition-colors cursor-pointer"
                                >
                                  Deliver
                                </button>
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, 'Cancelled')}
                                  disabled={order.status === 'Delivered' || order.status === 'Cancelled'}
                                  className="col-span-2 py-1 px-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-40 text-[10px] font-sans font-bold rounded-full transition-colors cursor-pointer"
                                >
                                  Cancel Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB 4: RESTAURANT CONFIG --- */}
              {activeTab === 'settings' && (
                <div className="space-y-6" id="admin-settings-workplace">
                  <div>
                    <h4 className="text-base font-display font-extrabold text-[#2D1B4D]">Restaurant Settings & WhatsApp Integration</h4>
                    <p className="text-xs text-purple-400 font-sans mt-0.5">Control contact phone numbers, delivery rates, opening schedule, and branding metadata.</p>
                  </div>

                  {showSettingsSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-2.5 animate-fade-in max-w-xl">
                      <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-xs font-sans font-bold text-emerald-800">
                        Settings updated successfully! / سیٹنگز کامیابی سے اپ ڈیٹ ہو گئیں۔
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl bg-purple-50/20 p-6 rounded-[2rem] border border-purple-100/40" id="settings-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans font-bold text-[#2D1B4D] uppercase mb-1">Direct Call Hotline</label>
                        <input
                          type="tel"
                          required
                          value={settingPhone}
                          onChange={(e) => setSettingPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-[#2D1B4D] uppercase mb-1">WhatsApp Phone (No spaces/signs) *</label>
                        <input
                          type="tel"
                          required
                          value={settingWhatsapp}
                          onChange={(e) => setSettingWhatsapp(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans font-mono bg-white"
                          placeholder="e.g. 923001234567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-[#2D1B4D] uppercase mb-1">DHA Branch Address</label>
                      <input
                        type="text"
                        required
                        value={settingAddress}
                        onChange={(e) => setSettingAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans font-bold text-[#2D1B4D] uppercase mb-1">Opening Hours Schedule</label>
                        <input
                          type="text"
                          required
                          value={settingHours}
                          onChange={(e) => setSettingHours(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-[#2D1B4D] uppercase mb-1">Home Delivery Fee (Rs.)</label>
                        <input
                          type="number"
                          required
                          value={settingCharges}
                          onChange={(e) => setSettingCharges(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] text-sm font-sans bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-lg shadow-purple-100"
                    >
                      Save Configuration
                    </button>
                  </form>

                  {/* Backup & Sync Section */}
                  <div className="mt-8 pt-8 border-t border-purple-100 max-w-xl space-y-4" id="backup-sync-section">
                    <div>
                      <h4 className="text-sm font-display font-extrabold text-[#2D1B4D]">Backup & Sync Menu / مینو کا بیک اپ اور مطابقت پذیری</h4>
                      <p className="text-[11px] text-purple-400 font-sans mt-0.5">
                        Transfer your customized menu from this development app to the live (shared) site, or copy it to send to the developer.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Export Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const dataToExport = {
                            menuItems,
                            categories,
                            config
                          };
                          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
                          const downloadAnchor = document.createElement('a');
                          downloadAnchor.setAttribute("href", dataStr);
                          downloadAnchor.setAttribute("download", `chession_menu_backup_${new Date().toISOString().split('T')[0]}.json`);
                          document.body.appendChild(downloadAnchor);
                          downloadAnchor.click();
                          downloadAnchor.remove();
                        }}
                        className="py-3 px-4 bg-white hover:bg-purple-50 text-[#5c1d9b] border-2 border-[#5c1d9b] rounded-2xl text-xs font-sans font-bold cursor-pointer transition-all flex items-center justify-center space-x-2"
                      >
                        <span>📥 Download Backup File</span>
                      </button>

                      {/* Copy Code Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const dataToExport = {
                            menuItems,
                            categories
                          };
                          navigator.clipboard.writeText(JSON.stringify(dataToExport, null, 2))
                            .then(() => alert("Menu configuration copied to clipboard! You can paste it in the chat with the AI developer to save it permanently. / مینو کنفیگریشن کاپی ہو گئی ہے۔"))
                            .catch(() => alert("Failed to copy to clipboard."));
                        }}
                        className="py-3 px-4 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-2xl text-xs font-sans font-bold cursor-pointer transition-all flex items-center justify-center space-x-2"
                      >
                        <span>📋 Copy Menu Data Code</span>
                      </button>
                    </div>

                    {/* Import Section */}
                    <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50 space-y-2">
                      <label className="block text-xs font-sans font-bold text-[#2D1B4D] uppercase">Upload Backup File / مینو فائل لوڈ کریں</label>
                      <p className="text-[10px] text-purple-400 font-sans">Select a backup .json file to restore or sync your menu items onto this site.</p>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const parsed = JSON.parse(event.target?.result as string);
                              if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
                                onUpdateMenuItems(parsed.menuItems);
                                if (parsed.categories && Array.isArray(parsed.categories)) {
                                  onUpdateCategories(parsed.categories);
                                }
                                if (parsed.config) {
                                  onUpdateConfig(parsed.config);
                                }
                                alert("Success! Menu items and categories imported and synced successfully. / مینو کامیابی سے لوڈ ہو گیا۔");
                                window.location.reload();
                              } else {
                                alert("Invalid backup file format. / ناموزوں فائل فارمیٹ۔");
                              }
                            } catch (err) {
                              alert("Error parsing backup file. / فائل پڑھنے میں غلطی۔");
                            }
                          };
                          reader.readAsText(file);
                        }}
                        className="w-full text-xs text-purple-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-100 file:text-[#5c1d9b] hover:file:bg-purple-200 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
