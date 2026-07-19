/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tags?: string[];
  sizes?: { name: string; price: number }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: CartItem[];
  totalAmount: number;
  orderType: 'Delivery' | 'Dine-In' | 'Takeaway';
  tableNumber?: string;
  status: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
  createdAt: string;
  paymentMethod: 'Cash' | 'Online/EasyPaisa';
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface RestaurantConfig {
  phone: string;
  whatsapp: string;
  address: string;
  openingHours: string;
  deliveryCharges: number;
}
