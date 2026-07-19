/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, Trash2, MessageSquare, Plus, Minus, AlertCircle, Sparkles, Utensils, Bike, ShoppingBag } from 'lucide-react';
import { CartItem, RestaurantConfig, Order } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (menuItemId: string, quantity: number, selectedSize?: string) => void;
  onRemoveItem: (menuItemId: string, selectedSize?: string) => void;
  onClearCart: () => void;
  config: RestaurantConfig;
  onPlaceOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  config,
  onPlaceOrder
}: CartModalProps) {
  const [orderType, setOrderType] = useState<'Delivery' | 'Dine-In' | 'Takeaway'>('Delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Online/EasyPaisa'>('Cash');
  const [notes, setNotes] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details'>('cart');

  if (!isOpen) return null;

  // Totals Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const deliveryFee = orderType === 'Delivery' ? config.deliveryCharges : 0;
  const totalAmount = subtotal + deliveryFee;

  const handleNextStep = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('details');
  };

  const handlePrevStep = () => {
    setCheckoutStep('cart');
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (orderType === 'Delivery' && !customerAddress.trim()) return;
    if (orderType === 'Dine-In' && !tableNumber.trim()) return;

    // Call onPlaceOrder callback to register the order in state
    onPlaceOrder({
      customerName,
      customerPhone,
      customerAddress: orderType === 'Delivery' ? customerAddress : undefined,
      tableNumber: orderType === 'Dine-In' ? tableNumber : undefined,
      items: cartItems,
      totalAmount,
      orderType,
      status: 'Pending',
      paymentMethod,
      notes: notes.trim() ? notes : undefined
    });

    // Construct the WhatsApp message
    const orderIdStr = `CH-${Math.floor(1000 + Math.random() * 9000)}`;
    let message = `*🍔 CHESSION FAST FOOD - ORDER #${orderIdStr}*\n\n`;
    message += `*Customer Info:*\n`;
    message += `• Name: ${customerName}\n`;
    message += `• Phone: ${customerPhone}\n`;
    message += `• Order Type: ${orderType}\n`;
    
    if (orderType === 'Delivery') {
      message += `• Delivery Address: ${customerAddress}\n`;
    } else if (orderType === 'Dine-In') {
      message += `• Table Number: ${tableNumber}\n`;
    }

    message += `\n*Items Ordered:*\n`;
    cartItems.forEach((item) => {
      const sizeStr = item.selectedSize ? ` [${item.selectedSize}]` : '';
      message += `• ${item.quantity}x ${item.menuItem.name}${sizeStr} (Rs. ${item.menuItem.price * item.quantity})\n`;
    });

    message += `\n*Billing Summary:*\n`;
    message += `• Subtotal: Rs. ${subtotal}\n`;
    if (orderType === 'Delivery') {
      message += `• Delivery Charges: Rs. ${deliveryFee}\n`;
    }
    message += `• *Total Amount: Rs. ${totalAmount}*\n\n`;

    message += `• *Payment Method:* ${paymentMethod}\n`;
    if (notes.trim()) {
      message += `• *Instructions:* ${notes}\n`;
    }

    message += `\n_Thank you for ordering with Chession Fast Food! Please confirm receipt of this order._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset Cart & Close Modal
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4" id="cart-modal-backdrop">
      {/* Dimmed background */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      {/* Main Glassmorphism modal card */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden animate-slide-up border border-purple-100" id="cart-modal-container">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-purple-50 flex justify-between items-center bg-purple-50/50" id="cart-modal-header">
          <div className="flex items-center space-x-2">
            <Utensils className="h-5 w-5 text-[#5c1d9b]" />
            <h3 className="text-xl font-display font-extrabold text-[#2D1B4D]">
              {checkoutStep === 'cart' ? 'My Order Basket' : 'Checkout Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-purple-50 text-purple-400 hover:text-[#5c1d9b] transition-colors cursor-pointer"
            id="cart-modal-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6" id="cart-modal-body">
          {checkoutStep === 'cart' ? (
            /* --- STEP 1: CART OVERVIEW --- */
            cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-4" id="empty-cart-view">
                <div className="h-16 w-16 bg-purple-50 text-[#5c1d9b] rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-display font-bold text-[#2D1B4D]">Your Basket is Empty</h4>
                <p className="text-sm text-purple-400 font-sans max-w-xs mx-auto">
                  Add delicious food items from Chession Fast Food Menu to get started.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#5c1d9b] text-white rounded-full text-sm font-sans font-bold hover:bg-[#3b0764] transition-all cursor-pointer shadow-lg shadow-purple-100"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6" id="cart-items-list-wrapper">
                {/* Items List */}
                <div className="space-y-3" id="cart-items-list">
                  {cartItems.map((item) => {
                    const itemKey = `${item.menuItem.id}-${item.selectedSize || 'default'}`;
                    return (
                      <div
                        key={itemKey}
                        className="flex items-center space-x-3 p-3 bg-purple-50/40 hover:bg-purple-50/80 rounded-[2rem] border border-purple-100/40 transition-colors"
                        id={`cart-item-${itemKey}`}
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          referrerPolicy="no-referrer"
                          className="h-12 w-12 rounded-2xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-display font-bold text-[#2D1B4D] truncate">
                            {item.menuItem.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-xs text-[#5c1d9b] font-sans font-bold">
                              Rs. {item.menuItem.price}
                            </span>
                            {item.selectedSize && (
                              <span className="px-1.5 py-0.5 bg-purple-100 text-[#5c1d9b] text-[9px] font-sans font-bold rounded-md uppercase">
                                {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-2 bg-white rounded-full border border-purple-100 px-2.5 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1, item.selectedSize)}
                            className="p-1 text-purple-400 hover:text-[#5c1d9b] transition-colors cursor-pointer"
                            id={`cart-item-minus-${itemKey}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-sans font-bold text-[#2D1B4D] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1, item.selectedSize)}
                            className="p-1 text-purple-400 hover:text-[#5c1d9b] transition-colors cursor-pointer"
                            id={`cart-item-plus-${itemKey}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => onRemoveItem(item.menuItem.id, item.selectedSize)}
                          className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                          id={`cart-item-remove-${itemKey}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal Display */}
                <div className="pt-4 border-t border-purple-100 flex justify-between items-center">
                  <span className="text-sm font-sans font-semibold text-purple-400">Cart Subtotal</span>
                  <span className="text-lg font-display font-extrabold text-[#2D1B4D]">Rs. {subtotal}</span>
                </div>
              </div>
            )
          ) : (
            /* --- STEP 2: CHECKOUT DETAILS FORM --- */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="checkout-details-form">
              {/* Order Type Toggle */}
              <div>
                <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-2">
                  How would you like your order?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Delivery', 'Dine-In', 'Takeaway'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-2 px-3 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer text-center ${
                        orderType === type
                          ? 'bg-[#5c1d9b] text-white border-[#5c1d9b] shadow-md shadow-purple-900/10'
                          : 'bg-white text-purple-900/70 border-purple-100 hover:bg-purple-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                    placeholder="e.g. Zain Malik"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                    placeholder="e.g. 03001234567"
                  />
                </div>
              </div>

              {/* Conditional Fields based on Order Type */}
              {orderType === 'Delivery' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                    placeholder="House, Street, Sector, DHA Lahore"
                  />
                  <p className="text-[10px] text-[#5c1d9b] font-sans font-semibold flex items-center space-x-1 mt-1.5">
                    <Bike className="h-3.5 w-3.5" />
                    <span>Flat delivery of Rs. {config.deliveryCharges} applies.</span>
                  </p>
                </div>
              )}

              {orderType === 'Dine-In' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-1">
                    Table Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                    placeholder="e.g. Table 5"
                  />
                </div>
              )}

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Cash', 'Online/EasyPaisa'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-3 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer text-center ${
                        paymentMethod === method
                          ? 'bg-[#ca8a04] text-white border-[#ca8a04]'
                          : 'bg-white text-purple-900/70 border-purple-100 hover:bg-purple-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-xs font-sans font-bold text-purple-400 uppercase tracking-wider mb-1">
                  Special Kitchen Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                  placeholder="e.g. Make it extra spicy, double cheese, no onions..."
                />
              </div>

              {/* Final Pricing breakdown */}
              <div className="bg-purple-50/40 p-4 rounded-[2rem] border border-purple-100/40 space-y-1.5 text-sm" id="checkout-pricing-breakdown">
                <div className="flex justify-between text-purple-400 font-sans">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                {orderType === 'Delivery' && (
                  <div className="flex justify-between text-purple-400 font-sans">
                     <span>Delivery Fee</span>
                    <span>Rs. {deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#2D1B4D] font-display font-extrabold text-base pt-1.5 border-t border-purple-100">
                  <span>Grand Total</span>
                  <span className="text-[#5c1d9b]">Rs. {totalAmount}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 py-3 border-2 border-purple-100 hover:border-[#5c1d9b] text-purple-700 hover:text-[#5c1d9b] rounded-full font-sans font-bold text-sm transition-all cursor-pointer bg-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-sans font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-green-100"
                >
                  <MessageSquare className="h-4 w-4 fill-white text-emerald-600" />
                  <span>Send WhatsApp Order</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer (only for Step 1) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-purple-50 bg-purple-50/20 flex flex-col space-y-3" id="cart-modal-footer">
            <div className="flex justify-between items-center text-sm font-sans font-semibold text-[#2D1B4D]">
              <span>Grand Total</span>
              <span className="text-lg font-display font-extrabold text-[#5c1d9b]">
                Rs. {totalAmount}
              </span>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full font-sans font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-100 cursor-pointer"
              id="cart-proceed-checkout-btn"
            >
              <Sparkles className="h-4 w-4 text-[#facc15]" />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
