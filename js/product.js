// ============================================
// Jumia — Product Detail Page
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

// --- Image Gallery (Left Column) ---
function buildGallery() {
  const gallery = document.createElement('div');
  gallery.className = 'product-gallery';

  const images = currentProduct.images || [];
  const mainSrc = images[0] || '';

  gallery.innerHTML = `
    <div class="main-image-container">
      <img id="main-product-image" src="${mainSrc}" alt="${currentProduct.name}" class="fade-in" />
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
    <div class="share-product">
      <span class="share-label">SHARE THIS PRODUCT</span>
      <div class="share-icons">
        <a href="#" class="share-icon" aria-label="Share on Facebook">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a href="#" class="share-icon" aria-label="Share on Twitter">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
        </a>
        <a href="#" class="share-icon" aria-label="Share on WhatsApp">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
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

// --- Product Info (Center Column) — includes Add to Cart ---
function buildProductInfo() {
  const info = document.createElement('div');
  info.className = 'product-info';

  const hasDiscount = currentProduct.discountedPrice !== null && currentProduct.discountedPrice !== undefined;
  const displayPrice = hasDiscount ? currentProduct.discountedPrice : currentProduct.originalPrice;
  const discountPct = hasDiscount ? calculateDiscount(currentProduct.originalPrice, currentProduct.discountedPrice) : 0;

  // Stock status
  let stockHTML = '';
  const units = currentProduct.unitsAvailable;
  const outOfStock = units === 0;
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

  // Deal badge
  const dealBadgeHTML = hasDiscount && discountPct >= 15
    ? `<span class="deal-badge">Anniversary deal</span>`
    : '';

  // Quantity selector
  const maxQty = currentProduct.unitsAvailable;

  info.innerHTML = `
    ${dealBadgeHTML}

    <div class="product-title-row">
      <h1 class="product-title">${currentProduct.name}</h1>
      <button class="wishlist-btn" aria-label="Add to wishlist" id="wishlist-btn">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </button>
    </div>

    <div class="product-brand">Brand: <a href="/?brand=${encodeURIComponent(currentProduct.brand)}">${currentProduct.brand}</a> | <a href="/?category=${encodeURIComponent(currentProduct.category)}">Similar products from ${currentProduct.brand}</a></div>

    <div class="product-price-section">
      <span class="product-current-price">${formatPrice(displayPrice)}</span>
      ${hasDiscount ? `<span class="product-original-price">${formatPrice(currentProduct.originalPrice)}</span>` : ''}
      ${hasDiscount ? `<span class="product-discount-pct">-${discountPct}%</span>` : ''}
    </div>

    <div class="product-stock">${stockHTML}</div>

    <div class="product-shipping-line">
      + shipping from <strong>${formatPrice(170)}</strong> to your location
    </div>

    <div class="product-rating-section">
      <div class="star-rating">${starsHTML}</div>
      <span class="rating-count" id="scroll-to-reviews">(${currentProduct.reviewCount} verified ratings)</span>
    </div>

    <div class="product-cart-section">
      <button class="add-to-cart-btn" id="add-to-cart-btn" ${outOfStock ? 'disabled' : ''}>
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
        <span>${outOfStock ? 'Out of Stock' : 'Add to cart'}</span>
      </button>
    </div>

    <div class="product-promotions">
      <h3>PROMOTIONS</h3>
      <ul>
        <li>Easy and safer payments via the JumiaPay App.</li>
        <li>Free delivery on your first order</li>
        <li>Easy returns within 7 days</li>
        <li>Pay on delivery available</li>
      </ul>
    </div>
  `;

  // Event listeners
  requestAnimationFrame(() => {
    // Scroll to reviews on click
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

    // Add to cart
    const addBtn = info.querySelector('#add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (outOfStock) return;
        addToCart(currentProduct.id);
        updateCartBadge();
        showToast('Added to cart!');
        // Button animation
        addBtn.style.transform = 'scale(0.95)';
        setTimeout(() => { addBtn.style.transform = ''; }, 150);
      });
    }

    // Wishlist button
    const wishlistBtn = info.querySelector('#wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        if (wishlistBtn.classList.contains('active')) {
          wishlistBtn.querySelector('svg').setAttribute('fill', '#E74C3C');
          wishlistBtn.querySelector('svg').setAttribute('stroke', '#E74C3C');
          showToast('Added to wishlist!', 'info');
        } else {
          wishlistBtn.querySelector('svg').setAttribute('fill', 'none');
          wishlistBtn.querySelector('svg').setAttribute('stroke', 'currentColor');
        }
      });
    }
  });

  return info;
}

// --- Delivery & Returns Sidebar (Right Column) ---
function buildSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'product-sidebar';

  const stations = getDeliveryStations();

  // Delivery & Returns card
  const deliveryCard = document.createElement('div');
  deliveryCard.className = 'sidebar-card';

  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 3);
  const estDate2 = new Date();
  estDate2.setDate(estDate2.getDate() + 5);
  const estDateStr = estDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'long' });
  const estDateStr2 = estDate2.toLocaleDateString('en-KE', { day: 'numeric', month: 'long' });

  deliveryCard.innerHTML = `
    <div class="sidebar-card-header">DELIVERY & RETURNS</div>

    <div class="delivery-location">
      <div class="delivery-location-label">Choose your location</div>
      <div class="delivery-selects">
        <select id="delivery-region" class="delivery-select">
          <option value="nairobi">Nairobi</option>
          <option value="mombasa">Mombasa</option>
          <option value="kisumu">Kisumu</option>
          <option value="nakuru">Nakuru</option>
          <option value="eldoret">Eldoret</option>
        </select>
        <select id="delivery-station" class="delivery-select">
          ${stations.map((s, i) => `<option value="${i}">${s.name}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="delivery-options" id="delivery-options">
      ${renderDeliveryOptions(stations[0], estDateStr, estDateStr2)}
    </div>
  `;

  sidebar.appendChild(deliveryCard);

  // Seller Information card
  const sellerCard = document.createElement('div');
  sellerCard.className = 'sidebar-card';
  sellerCard.innerHTML = `
    <div class="sidebar-card-header">SELLER INFORMATION</div>
    <div class="seller-info">
      <div class="seller-name">Jumia Official Store</div>
      <div class="seller-stats">
        <div class="seller-stat">
          <span class="seller-stat-value">94%</span>
          <span class="seller-stat-label">Seller Score</span>
        </div>
        <div class="seller-stat">
          <span class="seller-stat-value">1.2K</span>
          <span class="seller-stat-label">Followers</span>
        </div>
      </div>
      <button class="seller-follow-btn">Follow</button>
      <div class="seller-performance">
        <div class="seller-perf-row">
          <span class="seller-perf-label">Order Fulfillment Rate</span>
          <span class="seller-perf-value good">Excellent</span>
        </div>
        <div class="seller-perf-row">
          <span class="seller-perf-label">Quality Score</span>
          <span class="seller-perf-value good">Excellent</span>
        </div>
        <div class="seller-perf-row">
          <span class="seller-perf-label">Customer Rating</span>
          <span class="seller-perf-value good">Very Good</span>
        </div>
      </div>
    </div>
  `;
  sidebar.appendChild(sellerCard);

  // Event handlers
  requestAnimationFrame(() => {
    const stationSelect = deliveryCard.querySelector('#delivery-station');
    stationSelect.addEventListener('change', (e) => {
      selectedStationIndex = parseInt(e.target.value);
      const optionsEl = deliveryCard.querySelector('#delivery-options');
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 2 + Math.floor(Math.random() * 3));
      const newDate2 = new Date();
      newDate2.setDate(newDate2.getDate() + 4 + Math.floor(Math.random() * 3));
      const dateStr = newDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'long' });
      const dateStr2 = newDate2.toLocaleDateString('en-KE', { day: 'numeric', month: 'long' });
      optionsEl.innerHTML = renderDeliveryOptions(stations[selectedStationIndex], dateStr, dateStr2);
    });

    // Follow button
    const followBtn = sellerCard.querySelector('.seller-follow-btn');
    if (followBtn) {
      followBtn.addEventListener('click', () => {
        followBtn.classList.toggle('following');
        followBtn.textContent = followBtn.classList.contains('following') ? 'Following' : 'Follow';
      });
    }
  });

  return sidebar;
}

function renderDeliveryOptions(station, estDate, estDate2) {
  return `
    <div class="delivery-option">
      <div class="delivery-option-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="7" width="15" height="12" rx="1"/><path d="M17 13h3l2 2v4h-5"/><circle cx="7.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>
      </div>
      <div class="delivery-option-info">
        <div class="delivery-option-title">Pickup Station</div>
        <div class="delivery-option-detail">Delivery Fees <strong>${formatPrice(station.fee)}</strong></div>
        <div class="delivery-option-date">Ready for pickup between <strong>${estDate}</strong> and <strong>${estDate2}</strong></div>
      </div>
      <a href="#" class="delivery-option-details-link">Details</a>
    </div>

    <div class="delivery-option">
      <div class="delivery-option-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
      <div class="delivery-option-info">
        <div class="delivery-option-title">Door Delivery</div>
        <div class="delivery-option-detail">Delivery Fees <strong>${formatPrice(station.fee + 120)}</strong></div>
        <div class="delivery-option-date">Ready for delivery between <strong>${estDate}</strong> and <strong>${estDate2}</strong></div>
      </div>
      <a href="#" class="delivery-option-details-link">Details</a>
    </div>

    <div class="delivery-return-policy">
      <div class="delivery-option-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
      </div>
      <div class="delivery-option-info">
        <div class="delivery-option-title">Return Policy</div>
        <div class="delivery-option-date">Easy Return, Quick Refund.</div>
      </div>
      <a href="#" class="delivery-option-details-link">Details</a>
    </div>
  `;
}

// --- Tabs: Description & Reviews ---
function renderDetailsSection(container) {
  const section = document.createElement('div');
  section.className = 'product-details-section';

  section.innerHTML = `
    <div class="product-tabs" role="tablist">
      <button class="product-tab active" data-tab="description" role="tab" aria-selected="true">Product Details</button>
      <button class="product-tab" data-tab="specs" role="tab" aria-selected="false">Specifications</button>
      <button class="product-tab" data-tab="reviews" role="tab" aria-selected="false">Customer Feedback (${currentProduct.reviewCount})</button>
    </div>
    <div class="tab-panel active" id="tab-description">${renderDescriptionTab()}</div>
    <div class="tab-panel" id="tab-specs">${renderSpecsTab()}</div>
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
  return `<div class="product-description">
    <h3>Description</h3>
    <p>${currentProduct.description || 'No description available for this product.'}</p>
    <h3>Key Features</h3>
    <ul>
      <li>Brand: ${currentProduct.brand}</li>
      <li>Category: ${currentProduct.category}</li>
      <li>Rating: ${currentProduct.rating}/5 (${currentProduct.reviewCount} reviews)</li>
      ${currentProduct.discountedPrice ? `<li>Save ${formatPrice(currentProduct.originalPrice - currentProduct.discountedPrice)} today!</li>` : ''}
    </ul>
  </div>`;
}

function renderSpecsTab() {
  return `<div class="product-specs">
    <table class="specs-table">
      <tbody>
        <tr><td class="spec-label">SKU</td><td class="spec-value">${currentProduct.id.slice(0, 12).toUpperCase()}</td></tr>
        <tr><td class="spec-label">Brand</td><td class="spec-value">${currentProduct.brand}</td></tr>
        <tr><td class="spec-label">Category</td><td class="spec-value">${currentProduct.category}</td></tr>
        <tr><td class="spec-label">Weight (kg)</td><td class="spec-value">1.5</td></tr>
        <tr><td class="spec-label">Color</td><td class="spec-value">As shown</td></tr>
        <tr><td class="spec-label">Main Material</td><td class="spec-value">Standard</td></tr>
        <tr><td class="spec-label">Production Country</td><td class="spec-value">China</td></tr>
        <tr><td class="spec-label">Warranty Type</td><td class="spec-value">Manufacturer</td></tr>
      </tbody>
    </table>
  </div>`;
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

  return `
    <div class="reviews-container">
      <div class="reviews-summary">
        <div class="reviews-summary-header">VERIFIED RATINGS (${count})</div>
        <div class="reviews-summary-score">${rating.toFixed(1)}/5</div>
        <div class="reviews-summary-stars">${buildStarsHTML(rating)}</div>
        <div class="reviews-summary-count">${count} verified ratings</div>
        ${[5, 4, 3, 2, 1].map(star => {
          const c = breakdown[star - 1];
          const pct = count > 0 ? (c / count) * 100 : 0;
          return `
            <div class="rating-bar-row">
              <span class="rating-bar-label">${star} ★</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${pct}%"></div></div>
              <span class="rating-bar-count">(${c})</span>
            </div>
          `;
        }).join('')}
      </div>
      <div class="reviews-list">
        <div class="reviews-list-header">COMMENTS FROM VERIFIED PURCHASES (${reviews.length})</div>
        ${reviews.length > 0 ? reviews.map(r => renderReviewCard(r)).join('') : '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 20px;">No reviews yet. Be the first to review this product!</p>'}
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
        <div class="review-stars">${buildStarsHTML(review.rating)}</div>
        <span class="review-date">${dateStr}</span>
      </div>
      <div class="review-text">${review.text || ''}</div>
      <div class="review-author-line">
        <div class="review-avatar">${initial}</div>
        <span class="review-author">${review.author || 'Anonymous'}</span>
        <span class="review-verified">✓ Verified Purchase</span>
      </div>
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

  section.innerHTML = `<h2 class="similar-products-title">Customers who viewed this also viewed</h2>`;

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
