// ============================================
// Jumia — LocalStorage Data Layer
// ============================================

import { seedData } from './seed.js';

const KEYS = {
  products: 'jumia_products',
  categories: 'jumia_categories',
  cart: 'jumia_cart',
  stations: 'jumia_stations',
  announcement: 'jumia_announcement',
};

// --- Helpers ---
function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ==========================================
// Initialization
// ==========================================

export function initStore() {
  if (!localStorage.getItem(KEYS.products) || !localStorage.getItem('jumia_stations_v3_loaded')) {
    seedData();
  }
}

// ==========================================
// Products
// ==========================================

export function getProducts() {
  return load(KEYS.products) || [];
}

export function getProductById(id) {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
}

export function getProductsByCategory(category) {
  return getProducts().filter((p) => p.category === category);
}

export function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return getProducts();
  return getProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function addProduct(productData) {
  const products = getProducts();
  const product = {
    ...productData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  save(KEYS.products, products);
  return product;
}

export function updateProduct(id, updates) {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates };
  save(KEYS.products, products);
  return products[idx];
}

export function deleteProduct(id) {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  save(KEYS.products, filtered);
  return true;
}

// ==========================================
// Categories
// ==========================================

export function getCategories() {
  return load(KEYS.categories) || [];
}

export function addCategory(name) {
  const categories = getCategories();
  if (!categories.includes(name)) {
    categories.push(name);
    save(KEYS.categories, categories);
  }
  return categories;
}

export function deleteCategory(name) {
  let categories = getCategories();
  categories = categories.filter((c) => c !== name);
  save(KEYS.categories, categories);
  return categories;
}

// ==========================================
// Cart
// ==========================================

export function getCart() {
  const cartRaw = load(KEYS.cart) || [];
  return cartRaw.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  }));
}

export function addToCart(productId, quantity = 1) {
  const cart = load(KEYS.cart) || [];
  const existing = cart.find((c) => c.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  save(KEYS.cart, cart);
}

export function removeFromCart(productId) {
  let cart = load(KEYS.cart) || [];
  cart = cart.filter((c) => c.productId !== productId);
  save(KEYS.cart, cart);
}

export function updateCartQuantity(productId, quantity) {
  let cart = load(KEYS.cart) || [];
  if (quantity <= 0) {
    cart = cart.filter((c) => c.productId !== productId);
  } else {
    const existing = cart.find((c) => c.productId === productId);
    if (existing) {
      existing.quantity = quantity;
    }
  }
  save(KEYS.cart, cart);
}

export function getCartCount() {
  const cart = load(KEYS.cart) || [];
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
  const cart = getCart();
  let subtotal = 0;
  let discount = 0;

  cart.forEach((item) => {
    if (!item.product) return;
    const price = item.product.discountedPrice ?? item.product.originalPrice;
    subtotal += price * item.quantity;
    if (item.product.discountedPrice !== null) {
      discount +=
        (item.product.originalPrice - item.product.discountedPrice) *
        item.quantity;
    }
  });

  return {
    subtotal,
    discount,
    total: subtotal,
  };
}

export function clearCart() {
  save(KEYS.cart, []);
}

// ==========================================
// Delivery Stations
// ==========================================

export function getDeliveryStations() {
  return load(KEYS.stations) || [];
}

export function addDeliveryStation(station) {
  const stations = getDeliveryStations();
  stations.push(station);
  save(KEYS.stations, stations);
}

export function removeDeliveryStation(name) {
  let stations = getDeliveryStations();
  stations = stations.filter((s) => s.name !== name);
  save(KEYS.stations, stations);
}

// ==========================================
// Announcements
// ==========================================

export function getAnnouncement() {
  return load(KEYS.announcement) || null;
}

export function setAnnouncement(announcement) {
  save(KEYS.announcement, announcement);
}

// ==========================================
// Utilities
// ==========================================

export function formatPrice(amount) {
  return 'KSh ' + Number(amount).toLocaleString('en-KE');
}

export function calculateDiscount(originalPrice, discountedPrice) {
  if (!originalPrice || !discountedPrice) return 0;
  return Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );
}
