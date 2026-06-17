// ============================================
// Jumia — Firebase & Local Data Layer
// ============================================

import { seedData } from './seed.js';
import { db } from './firebase.js';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

const KEYS = {
  categories: 'jumia_categories',
  cart: 'jumia_cart',
  stations: 'jumia_stations',
};

let realTimeProducts = [];
let realTimeAnnouncement = null;

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
  return new Promise((resolve) => {
    if (!localStorage.getItem(KEYS.categories) || !localStorage.getItem('jumia_stations_v3_loaded')) {
      seedData();
    }

    // --- INSTANT CACHE LOAD ---
    // Load previously synced data from local storage so the site renders instantly
    const cachedProducts = load('jumia_products_firebase_cache');
    if (cachedProducts && Array.isArray(cachedProducts)) {
      realTimeProducts = cachedProducts;
    }
    const cachedAnnouncement = load('jumia_announcement_firebase_cache');
    if (cachedAnnouncement !== undefined) {
      realTimeAnnouncement = cachedAnnouncement;
    }
    
    // Resolve immediately so the UI never blocks on network requests!
    resolve();

    // --- FIREBASE SYNC ---
    const productsRef = collection(db, 'products');
    onSnapshot(productsRef, async (snapshot) => {
      realTimeProducts = [];
      snapshot.forEach((docSnap) => {
        realTimeProducts.push({ ...docSnap.data(), id: docSnap.id });
      });

      // Migrate local products to Firebase if Firebase is empty
      if (snapshot.empty) {
        const localProductsRaw = localStorage.getItem('jumia_products');
        if (localProductsRaw) {
          const localProducts = JSON.parse(localProductsRaw);
          if (localProducts && localProducts.length > 0) {
            console.log("Migrating local products to Firebase...");
            try {
              const batch = writeBatch(db);
              localProducts.forEach(p => {
                const id = p.id || crypto.randomUUID();
                const pRef = doc(productsRef, id);
                batch.set(pRef, p);
              });
              await batch.commit();
              console.log("Migration successful.");
            } catch(e) {
              console.error("Migration failed:", e);
            }
          }
        }
      }

      // Update cache
      save('jumia_products_firebase_cache', realTimeProducts);
      window.dispatchEvent(new Event('storeUpdated'));
    });

    const announcementRef = collection(db, 'announcements');
    onSnapshot(announcementRef, (snapshot) => {
      realTimeAnnouncement = null;
      snapshot.forEach((docSnap) => {
        realTimeAnnouncement = { ...docSnap.data(), id: docSnap.id };
      });

      // Update cache
      save('jumia_announcement_firebase_cache', realTimeAnnouncement);
      window.dispatchEvent(new Event('storeUpdated'));
    });
  });
}

// ==========================================
// Products (Firebase)
// ==========================================

export function getProducts() {
  return realTimeProducts;
}

export function getProductById(id) {
  return realTimeProducts.find((p) => p.id === id) || null;
}

export function getProductsByCategory(category) {
  return realTimeProducts.filter((p) => p.category === category);
}

export function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return realTimeProducts;
  return realTimeProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export async function addProduct(productData) {
  const id = crypto.randomUUID();
  const product = {
    ...productData,
    id,
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, 'products', id), product);
  return product;
}

export async function updateProduct(id, updates) {
  const existing = getProductById(id);
  if (!existing) return null;
  const updated = { ...existing, ...updates };
  await setDoc(doc(db, 'products', id), updated);
  return updated;
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, 'products', id));
  return true;
}

// ==========================================
// Categories (Local)
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
// Cart (Local)
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
// Delivery Stations (Local)
// ==========================================

export function getDeliveryStations() {
  return load(KEYS.stations) || [];
}

export function addDeliveryStation(station) {
  const stations = getDeliveryStations();
  stations.push(station);
  save(KEYS.stations, stations);
}

export function removeDeliveryStation(nameOrIndex) {
  let stations = getDeliveryStations();
  if (typeof nameOrIndex === 'number' || !isNaN(Number(nameOrIndex))) {
    const idx = parseInt(nameOrIndex, 10);
    if (idx >= 0 && idx < stations.length) {
      stations.splice(idx, 1);
    }
  } else {
    stations = stations.filter((s) => s.name !== nameOrIndex);
  }
  save(KEYS.stations, stations);
}

// ==========================================
// Announcements (Firebase)
// ==========================================

export function getAnnouncement() {
  return realTimeAnnouncement;
}

export async function setAnnouncement(announcement) {
  const id = announcement.id || 'main';
  const updated = { ...announcement, id };
  await setDoc(doc(db, 'announcements', id), updated);
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
