// ============================================
// Jumia — Shared UI Components
// ============================================

import {
  getAnnouncement,
  setAnnouncement,
  getCartCount,
  formatPrice,
  calculateDiscount,
  searchProducts,
} from './store.js';

// ==========================================
// Header
// ==========================================

export function renderHeader(activePage = 'home') {
  const header = document.getElementById('site-header');
  if (!header) return;

  const announcement = getAnnouncement();
  const cartCount = getCartCount();

  const announcementHTML =
    announcement && announcement.active
      ? `<div class="announcement-bar" id="announcement-bar">
          <div class="announcement-inner">
            <span class="announcement-text">${announcement.text}</span>
            <button class="announcement-close" id="announcement-close" aria-label="Close announcement">&times;</button>
          </div>
        </div>`
      : '';

  header.innerHTML = `
    ${announcementHTML}

    <div class="top-bar">
      <div class="top-bar-inner container">
        <div class="top-bar-left">
          <a href="#">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FEC20C"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Sell on Jumia
          </a>
        </div>
        <div class="top-bar-center">
          <a href="#">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            JUMIA PAY
          </a>
          <a href="#">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 10h22"/></svg>
            JUMIA DELIVERY
          </a>
          <a href="#">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            LUXE
          </a>
        </div>
        <div class="top-bar-right"></div>
      </div>
    </div>

    <header class="main-header">
      <div class="header-inner container">
        <button class="hamburger-btn" aria-label="Menu" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-primary); margin-right: -8px;">☰</button>
        <a href="/" class="logo" id="logo-link">
          <img src="https://cdn.brandfetch.io/idDVEIJONY/w/2800/h/469/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1668154920215" alt="Jumia" class="logo-img" style="height: 20px; width: auto;" />
        </a>

        <div class="header-search" id="header-search">
          <input
            type="text"
            class="search-input"
            id="search-input"
            placeholder="Search products, brands and categories"
            autocomplete="off"
          />
          <button class="search-btn" id="search-btn" aria-label="Search">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span class="search-btn-text">Search</span>
          </button>
          <div class="search-results" id="search-results"></div>
        </div>

        <div class="header-actions">
          <div class="header-action" id="account-action">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="header-action-text">My Account</span>
            <svg class="chevron-down" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            <div class="header-dropdown">
              <a href="#">My Account</a>
              <a href="#">Orders</a>
              <a href="#">Saved Items</a>
              <a href="#">Recently Viewed</a>
            </div>
          </div>

          <div class="header-action" id="help-action">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span class="header-action-text">Help</span>
            <svg class="chevron-down" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            <div class="header-dropdown">
              <a href="#">Help Center</a>
              <a href="#">Place an Order</a>
              <a href="#">Track an Order</a>
              <a href="#">Returns & Refunds</a>
              <a href="#">Contact Us</a>
            </div>
          </div>

          <div class="cart-link" id="cart-link" aria-label="Cart" title="${cartCount > 0 ? cartCount + ' item(s) on cart' : 'Nothing on cart'}" style="cursor: default;">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-link-text">Cart</span>
            <span class="cart-badge" id="cart-badge">${cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  `;

  // --- Event Listeners ---

  // Close announcement
  const closeBtn = document.getElementById('announcement-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const bar = document.getElementById('announcement-bar');
      if (bar) {
        bar.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => bar.remove(), 300);
      }
      const current = getAnnouncement();
      if (current) {
        setAnnouncement({ ...current, active: false });
      }
    });
  }

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResultsEl = document.getElementById('search-results');

  let debounceTimer;

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
          searchResultsEl.classList.remove('visible');
          return;
        }
        const results = searchProducts(query).slice(0, 6);
        if (results.length === 0) {
          searchResultsEl.innerHTML = `<div class="search-no-results">No products found for "${query}"</div>`;
        } else {
          searchResultsEl.innerHTML = results
            .map(
              (p) => `
              <a href="/product.html?id=${p.id}" class="search-result-item">
                <img src="${p.images[0]}" alt="${p.name}" class="search-result-img" loading="lazy" />
                <div class="search-result-info">
                  <div class="search-result-name">${p.name}</div>
                  <div class="search-result-price">${formatPrice(p.discountedPrice ?? p.originalPrice)}</div>
                </div>
              </a>`
            )
            .join('');
        }
        searchResultsEl.classList.add('visible');
      }, 250);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length >= 2) {
        searchResultsEl.classList.add('visible');
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#header-search')) {
        searchResultsEl.classList.remove('visible');
      }
    });

    // Enter key triggers search page (placeholder for future)
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          searchResultsEl.classList.remove('visible');
          // For now, scroll to first matching category section
        }
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        searchResultsEl.classList.remove('visible');
      }
    });
  }
}

// ==========================================
// Footer
// ==========================================

export function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-top container">
        <div class="footer-col">
          <div class="footer-logo">
            <span class="logo-text">JUMIA</span><span class="logo-star" style="color: var(--accent-primary); font-size: 1rem; margin-left: 1px;">★</span>
          </div>
          <p class="footer-about">
            Jumia is your one-stop online shop for the best deals in Kenya. Quality products, fast delivery, and unbeatable prices.
          </p>
          <div class="footer-socials">
            <a href="#" aria-label="Facebook" class="social-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" class="social-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" class="social-link">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Customer Service</h4>
          <ul class="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Shipping Info</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="#">Flash Sales</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="/admin.html">Seller Dashboard</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">About Jumia</h4>
          <ul class="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Affiliate Program</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p class="footer-copy">&copy; ${new Date().getFullYear()} Jumia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

// ==========================================
// Product Card
// ==========================================

export function renderProductCard(product) {
  const price = product.discountedPrice ?? product.originalPrice;
  const hasDiscount = product.discountedPrice !== null && product.discountedPrice < product.originalPrice;
  const discountPercent = hasDiscount
    ? calculateDiscount(product.originalPrice, product.discountedPrice)
    : 0;

  const starsHTML = renderStars(product.rating);

  return `
    <a href="/product.html?id=${product.id}" class="product-card" id="product-${product.id}">
      <div class="product-card-img-wrap">
        <img
          src="${product.images[0]}"
          alt="${product.name}"
          class="product-card-img"
          loading="lazy"
        />
        ${hasDiscount ? `<span class="product-card-badge">-${discountPercent}%</span>` : ''}
      </div>
      <div class="product-card-body">
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-pricing">
          <span class="product-card-price">${formatPrice(price)}</span>
          ${hasDiscount ? `<span class="product-card-old-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-card-rating">
          ${starsHTML}
          <span class="product-card-review-count">(${product.reviewCount})</span>
        </div>
      </div>
    </a>
  `;
}

// ==========================================
// Star Rating Helper
// ==========================================

function renderStars(rating) {
  let html = '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  for (let i = 0; i < full; i++) {
    html += '<span class="star star-full">★</span>';
  }
  if (half) {
    html += '<span class="star star-half">★</span>';
  }
  for (let i = 0; i < empty; i++) {
    html += '<span class="star star-empty">★</span>';
  }
  return html;
}

// ==========================================
// Category Section
// ==========================================

export function renderCategorySection(categoryName, products) {
  if (!products || products.length === 0) return '';

  const cardsHTML = products.map(renderProductCard).join('');
  const sectionId = `category-${categoryName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;

  return `
    <section class="category-section" id="${sectionId}">
      <div class="category-section-header container">
        <h2 class="category-section-title">${categoryName}</h2>
        <a href="/?category=${encodeURIComponent(categoryName)}" class="category-section-see-all">
          SEE ALL
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </a>
      </div>
      <div class="category-section-row-wrap container">
        <button class="scroll-arrow scroll-arrow-left" aria-label="Scroll left" data-section="${sectionId}">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="category-section-row" id="${sectionId}-row">
          ${cardsHTML}
        </div>
        <button class="scroll-arrow scroll-arrow-right" aria-label="Scroll right" data-section="${sectionId}">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>
  `;
}

// ==========================================
// Cart Badge
// ==========================================

export function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ==========================================
// Toast Notifications
// ==========================================

export function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
