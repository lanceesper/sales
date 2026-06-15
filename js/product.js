// ============================================
// Jumia - Product Detail Page
// ============================================

import {
  initStore,
  getProductById,
  getProductsByCategory,
  addToCart,
  getDeliveryStations,
  formatPrice,
  calculateDiscount
} from '/js/store.js';

import {
  renderHeader,
  renderFooter,
  renderProductCard,
  updateCartBadge,
  showToast
} from '/js/components.js';

// --- State ---
let currentProduct = null;
let currentImageIndex = 0;
let selectedQuantity = 1;
let selectedStationIndex = 0;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  await initStore();
  renderHeader('product');

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    renderNotFound();
    renderFooter();
    return;
  }

  currentProduct = getProductById(productId);

  if (!currentProduct) {
    renderNotFound();
    renderFooter();
    return;
  }

  document.title = `${currentProduct.name} - Jumia`;

  const main = document.getElementById('main-content');
  main.innerHTML = '';

  renderBreadcrumb(main);
  renderProductLayout(main);
  renderDetailsSection(main);
  renderSimilarProducts(main);
  renderFooter();
});

// --- Breadcrumb ---
function renderBreadcrumb(container) {
  const nav = document.createElement('nav');
  nav.className = 'product-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.innerHTML = `
    <a href="/">Home</a>
    <span class="breadcrumb-separator">›</span>
    <a href="/?category=${encodeURIComponent(currentProduct.category)}">${currentProduct.category}</a>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-current">${currentProduct.name}</span>
  `;
  container.appendChild(nav);
}

// --- Main 3-Column Layout ---
function renderProductLayout(container) {
  const layout = document.createElement('div');
  layout.className = 'product-layout';

  layout.appendChild(buildGallery());
  layout.appendChild(buildProductInfo());
  layout.appendChild(buildSidebar());

  container.appendChild(layout);
}

// --- Image Gallery ---
function buildGallery() {
  const gallery = document.createElement('div');
  gallery.className = 'product-gallery';

  const images = currentProduct.images || [];
  const mainSrc = images[0] || '';

  gallery.innerHTML = `
    <div class="main-image-container">
      <img id="main-product-image" src="${mainSrc}" alt="${currentProduct.name}" class="fade-in" />
      <span class="image-zoom-hint">🔍 Hover to zoom</span>
    </div>
    <div class="thumbnail-strip-wrapper">
      <button class="thumb-arrow left" id="thumb-left" aria-label="Scroll thumbnails left">‹</button>
      <div class="thumbnail-strip" id="thumbnail-strip">
        ${images.map((img, i) => `
          <div class="thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
            <img src="${img}" alt="${currentProduct.name} - Image ${i + 1}" />
          </div>
        `).join('')}
      </div>
      <button class="thumb-arrow right" id="thumb-right" aria-label="Scroll thumbnails right">›</button>
    </div>
  `;

  // Thumbnail click handlers
  requestAnimationFrame(() => {
    const thumbs = gallery.querySelectorAll('.thumb');
    const mainImg = gallery.querySelector('#main-product-image');
    const strip = gallery.querySelector('#thumbnail-strip');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.dataset.index);
        if (index === currentImageIndex) return;
        currentImageIndex = index;

        // Fade out
        mainImg.classList.remove('fade-in');
        mainImg.classList.add('fade-out');

        setTimeout(() => {
          mainImg.src = images[index];
          mainImg.classList.remove('fade-out');
          mainImg.classList.add('fade-in');
        }, 250);

        // Update active thumb
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Scroll arrows
    const leftBtn = gallery.querySelector('#thumb-left');
    const rightBtn = gallery.querySelector('#thumb-right');

    leftBtn.addEventListener('click', () => {
      strip.scrollBy({ left: -160, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      strip.scrollBy({ left: 160, behavior: 'smooth' });
    });
  });

  return gallery;
}

// --- Product Info ---
function buildProductInfo() {
  const info = document.createElement('div');
  info.className = 'product-info';

  const hasDiscount = currentProduct.discountedPrice !== null && currentProduct.discountedPrice !== undefined;
  const displayPrice = hasDiscount ? currentProduct.discountedPrice : currentProduct.originalPrice;
  const discountPct = hasDiscount ? calculateDiscount(currentProduct.originalPrice, currentProduct.discountedPrice) : 0;

  // Stock status
  let stockHTML = '';
  const units = currentProduct.unitsAvailable;
  if (units === 0) {
    stockHTML = `<span class="stock-dot stock-out"></span><span class="stock-text-out">Out of stock</span>`;
  } else if (units <= 5) {
    stockHTML = `<span class="stock-dot stock-low"></span><span class="stock-text-low">Only ${units} left — order soon!</span>`;
  } else {
    stockHTML = `<span class="stock-dot stock-in"></span><span class="stock-text-in">In stock</span>`;
  }

  // Stars
  const starsHTML = buildStarsHTML(currentProduct.rating);

  // Estimated delivery
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryStr = deliveryDate.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' });

  info.innerHTML = `
    <h1 class="product-title">${currentProduct.name}</h1>
    <div class="product-brand">Brand: <a href="/?brand=${encodeURIComponent(currentProduct.brand)}">${currentProduct.brand}</a></div>

    <div class="product-price-section">
      <span class="product-current-price">${formatPrice(displayPrice)}</span>
      ${hasDiscount ? `<span class="product-original-price">${formatPrice(currentProduct.originalPrice)}</span>` : ''}
      ${hasDiscount ? `<span class="product-discount-badge">-${discountPct}%</span>` : ''}
    </div>

    <div class="product-stock">${stockHTML}</div>

    <div class="product-rating-section">
      <div class="star-rating">${starsHTML}</div>
      <span class="rating-count" id="scroll-to-reviews">(${currentProduct.reviewCount} verified ratings)</span>
    </div>

    <div class="product-shipping">
      <span class="ship-icon">🚚</span>
      <span>Free delivery by <strong>${deliveryStr}</strong> for orders above KSh 2,000</span>
    </div>

    <div class="product-promotions">
      <h3>🎉 Promotions</h3>
      <ul>
        <li>Free delivery on your first order</li>
        <li>Easy returns within 7 days</li>
        <li>Genuine products guaranteed</li>
        <li>Pay on delivery available</li>
      </ul>
    </div>
  `;

  // Scroll to reviews on click
  requestAnimationFrame(() => {
    const link = info.querySelector('#scroll-to-reviews');
    if (link) {
      link.addEventListener('click', () => {
        const reviewsTab = document.querySelector('[data-tab="reviews"]');
        if (reviewsTab) {
          reviewsTab.click();
          document.querySelector('.product-details-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  return info;
}

// --- Delivery & Cart Sidebar ---
function buildSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'product-sidebar';

  const stations = getDeliveryStations();
  const maxQty = currentProduct.unitsAvailable;
  const outOfStock = maxQty === 0;

  // Delivery card
  const deliveryCard = document.createElement('div');
  deliveryCard.className = 'sidebar-card';

  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 3);
  const estDateStr = estDate.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' });

  deliveryCard.innerHTML = `
    <div class="sidebar-card-header">📦 Delivery &amp; Returns</div>
    <div class="location-selector">
      <label for="delivery-station">Choose pickup station</label>
      <select id="delivery-station">
        ${stations.map((s, i) => `<option value="${i}">${s.name}</option>`).join('')}
      </select>
    </div>
    <div class="station-info" id="station-info">
      ${renderStationInfo(stations[0], estDateStr)}
    </div>
  `;

  sidebar.appendChild(deliveryCard);

  // Cart action card
  const cartCard = document.createElement('div');
  cartCard.className = 'sidebar-card';

  cartCard.innerHTML = `
    <div class="quantity-section">
      <label>Quantity</label>
      <div class="quantity-selector">
        <button id="qty-minus" aria-label="Decrease quantity" ${selectedQuantity <= 1 || outOfStock ? 'disabled' : ''}>−</button>
        <div class="qty-value" id="qty-value">${selectedQuantity}</div>
        <button id="qty-plus" aria-label="Increase quantity" ${selectedQuantity >= maxQty || outOfStock ? 'disabled' : ''}>+</button>
      </div>
    </div>
    <button class="add-to-cart-btn" id="add-to-cart-btn" ${outOfStock ? 'disabled' : ''}>
      <span class="cart-icon">🛒</span>
      <span>${outOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
    </button>
  `;

  sidebar.appendChild(cartCard);

  // Event handlers
  requestAnimationFrame(() => {
    // Station select
    const stationSelect = deliveryCard.querySelector('#delivery-station');
    stationSelect.addEventListener('change', (e) => {
      selectedStationIndex = parseInt(e.target.value);
      const infoEl = deliveryCard.querySelector('#station-info');
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 2 + Math.floor(Math.random() * 3));
      const dateStr = newDate.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' });
      infoEl.innerHTML = renderStationInfo(stations[selectedStationIndex], dateStr);
    });

    // Quantity controls
    const minusBtn = cartCard.querySelector('#qty-minus');
    const plusBtn = cartCard.querySelector('#qty-plus');
    const qtyDisplay = cartCard.querySelector('#qty-value');

    minusBtn.addEventListener('click', () => {
      if (selectedQuantity > 1) {
        selectedQuantity--;
        updateQtyDisplay(qtyDisplay, minusBtn, plusBtn);
      }
    });

    plusBtn.addEventListener('click', () => {
      if (selectedQuantity < maxQty) {
        selectedQuantity++;
        updateQtyDisplay(qtyDisplay, minusBtn, plusBtn);
      }
    });

    // Add to cart
    const addBtn = cartCard.querySelector('#add-to-cart-btn');
    addBtn.addEventListener('click', () => {
      if (outOfStock) return;
      for (let i = 0; i < selectedQuantity; i++) {
        addToCart(currentProduct.id);
      }
      updateCartBadge();
      showToast(`Added ${selectedQuantity > 1 ? selectedQuantity + ' items' : ''} to cart!`);

      // Button animation
      addBtn.style.transform = 'scale(0.95)';
      setTimeout(() => { addBtn.style.transform = ''; }, 150);
    });
  });

  return sidebar;
}

function renderStationInfo(station, estDate) {
  return `
    <div class="station-info-row">
      <span class="station-info-icon">📍</span>
      <div>
        <div class="station-info-label">Pickup Station</div>
        <div class="station-info-value">${station.name}</div>
      </div>
    </div>
    <div class="station-info-row">
      <span class="station-info-icon">💰</span>
      <div>
        <div class="station-info-label">Delivery Fee</div>
        <div class="station-info-value delivery-fee">${formatPrice(station.fee)}</div>
      </div>
    </div>
    <div class="station-info-row">
      <span class="station-info-icon">📅</span>
      <div>
        <div class="station-info-label">Estimated Delivery</div>
        <div class="station-info-value">${estDate}</div>
      </div>
    </div>
    <div class="station-info-row">
      <span class="station-info-icon">🚪</span>
      <div>
        <div class="station-info-label">Door Delivery</div>
        <div class="station-info-value delivery-fee">${formatPrice(station.fee + 100)}</div>
      </div>
    </div>
  `;
}

function updateQtyDisplay(display, minusBtn, plusBtn) {
  display.textContent = selectedQuantity;
  minusBtn.disabled = selectedQuantity <= 1;
  plusBtn.disabled = selectedQuantity >= currentProduct.unitsAvailable;
}

// --- Tabs: Description & Reviews ---
function renderDetailsSection(container) {
  const section = document.createElement('div');
  section.className = 'product-details-section';

  section.innerHTML = `
    <div class="product-tabs" role="tablist">
      <button class="product-tab active" data-tab="description" role="tab" aria-selected="true">Description</button>
      <button class="product-tab" data-tab="reviews" role="tab" aria-selected="false">Reviews (${currentProduct.reviewCount})</button>
    </div>
    <div class="tab-panel active" id="tab-description">${renderDescriptionTab()}</div>
    <div class="tab-panel" id="tab-reviews">${renderReviewsTab()}</div>
  `;

  // Tab switching
  requestAnimationFrame(() => {
    const tabs = section.querySelectorAll('.product-tab');
    const panels = section.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const panel = section.querySelector(`#tab-${tab.dataset.tab}`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  container.appendChild(section);
}

function renderDescriptionTab() {
  return `<div class="product-description">${currentProduct.description || '<p>No description available for this product.</p>'}</div>`;
}

function renderReviewsTab() {
  const reviews = currentProduct.reviews || [];
  const rating = currentProduct.rating || 0;
  const count = currentProduct.reviewCount || 0;

  // Compute breakdown
  const breakdown = [0, 0, 0, 0, 0]; // index 0 = 1-star, index 4 = 5-star
  reviews.forEach(r => {
    const s = Math.min(5, Math.max(1, Math.round(r.rating)));
    breakdown[s - 1]++;
  });

  const maxBar = Math.max(...breakdown, 1);

  return `
    <div class="reviews-container">
      <div class="reviews-summary">
        <div class="reviews-summary-score">${rating.toFixed(1)}</div>
        <div class="reviews-summary-stars">${buildStarsHTML(rating)}</div>
        <div class="reviews-summary-count">${count} verified ratings</div>
        ${[5, 4, 3, 2, 1].map(star => {
          const c = breakdown[star - 1];
          const pct = count > 0 ? (c / count) * 100 : 0;
          return `
            <div class="rating-bar-row">
              <span class="rating-bar-label">${star} ★</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${pct}%"></div></div>
              <span class="rating-bar-count">${c}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div class="reviews-list">
        ${reviews.length > 0 ? reviews.map(r => renderReviewCard(r)).join('') : '<p style="color: var(--text-muted); font-size: 0.9rem;">No reviews yet. Be the first to review this product!</p>'}
        <button class="write-review-btn">✍️ Write a Review</button>
      </div>
    </div>
  `;
}

function renderReviewCard(review) {
  const initial = (review.author || 'A').charAt(0).toUpperCase();
  const dateStr = review.date ? new Date(review.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return `
    <div class="review-card">
      <div class="review-card-header">
        <div class="review-avatar">${initial}</div>
        <div class="review-meta">
          <div class="review-author">${review.author || 'Anonymous'}</div>
          <div class="review-date">${dateStr}</div>
        </div>
        <div class="review-stars">${buildStarsHTML(review.rating)}</div>
      </div>
      <div class="review-text">${review.text || ''}</div>
    </div>
  `;
}

// --- Similar Products ---
function renderSimilarProducts(container) {
  const similar = getProductsByCategory(currentProduct.category)
    .filter(p => p.id !== currentProduct.id)
    .slice(0, 6);

  if (similar.length === 0) return;

  const section = document.createElement('div');
  section.className = 'similar-products-section';

  section.innerHTML = `<h2 class="similar-products-title">Similar Products</h2>`;

  const scroll = document.createElement('div');
  scroll.className = 'similar-products-scroll';
  scroll.innerHTML = similar.map(p => renderProductCard(p)).join('');
  section.appendChild(scroll);
  container.appendChild(section);
}

// --- Not Found ---
function renderNotFound() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="product-not-found">
      <span class="nf-emoji">🔍</span>
      <h2>Product Not Found</h2>
      <p>Sorry, we couldn't find the product you're looking for. It may have been removed or the link is incorrect.</p>
      <a href="/">← Back to Shop</a>
    </div>
  `;
}

// --- Helpers ---
function buildStarsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= full) {
      html += '<span class="star-filled">★</span>';
    } else if (i === full + 1 && half) {
      html += '<span class="star-filled">★</span>';
    } else {
      html += '<span class="star-empty">☆</span>';
    }
  }
  return html;
}
