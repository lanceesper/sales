// ============================================
// Jumia - Shopping Cart Page
// ============================================

import {
  initStore,
  getProductById,
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartCount,
  clearCart,
  formatPrice,
  calculateDiscount,
  getProducts
} from '/js/store.js';

import {
  renderHeader,
  renderFooter,
  updateCartBadge,
  showToast,
  renderProductCard
} from '/js/components.js';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  await initStore();
  renderHeader('cart');
  renderCartPage();
  renderFooter();
});

// --- Main Cart Render ---
function renderCartPage() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const cart = getCart();
  const totalItems = getCartCount();

  const page = document.createElement('div');
  page.className = 'cart-page';

  if (!cart || cart.length === 0) {
    page.innerHTML = renderEmptyCart();
    renderRecentlyViewed(page, cart);
    renderAlsoViewed(page, cart);
    main.appendChild(page);
    return;
  }

  const layout = document.createElement('div');
  layout.className = 'cart-layout';

  // Left: items list
  const itemsList = document.createElement('div');
  itemsList.className = 'cart-items-list';
  itemsList.id = 'cart-items-list';

  // Inside the items list, add the Cart (N) header first
  const itemsHeader = document.createElement('div');
  itemsHeader.className = 'cart-items-header';
  itemsHeader.innerHTML = `<h2>Cart (${totalItems})</h2>`;
  itemsList.appendChild(itemsHeader);

  cart.forEach(cartItem => {
    const product = getProductById(cartItem.productId);
    if (product) {
      itemsList.appendChild(buildCartItemRow(product, cartItem.quantity));
    }
  });

  layout.appendChild(itemsList);

  // Right: summary
  layout.appendChild(buildCartSummary(cart));

  page.appendChild(layout);

  // Clear cart section
  const clearSection = document.createElement('div');
  clearSection.className = 'clear-cart-section';
  clearSection.innerHTML = `<button class="clear-cart-btn" id="clear-cart-btn">🗑️ Clear Cart</button>`;
  page.appendChild(clearSection);

  // Recently Viewed section
  renderRecentlyViewed(page, cart);

  // Customers who viewed this also viewed section
  renderAlsoViewed(page, cart);

  main.appendChild(page);

  // Clear cart handler
  requestAnimationFrame(() => {
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearCart();
        updateCartBadge();
        showToast('Cart cleared');
        renderCartPage();
      });
    }
  });
}

// --- Build Cart Item Row ---
function buildCartItemRow(product, quantity) {
  const row = document.createElement('div');
  row.className = 'cart-item';
  row.dataset.productId = product.id;

  const hasDiscount = product.discountedPrice !== null && product.discountedPrice !== undefined;
  const unitPrice = hasDiscount ? product.discountedPrice : product.originalPrice;
  const maxQty = product.unitsAvailable;
  const imgSrc = product.images && product.images.length > 0 ? product.images[0] : '';
  const discountPct = hasDiscount ? calculateDiscount(product.originalPrice, product.discountedPrice) : 0;

  row.innerHTML = `
    <div class="cart-item-image">
      <img src="${imgSrc}" alt="${product.name}" />
    </div>
    <div class="cart-item-main">
      <div class="cart-item-name"><a href="/product.html?id=${product.id}">${product.name}</a></div>
      <div class="cart-item-variation">Variation: Standard</div>
      <div class="cart-item-stock">In Stock</div>
      <div class="cart-item-express">JUMIA <span>★</span> EXPRESS</div>
      <button class="cart-item-remove-btn" data-id="${product.id}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 4px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        Remove
      </button>
    </div>
    <div class="cart-item-right">
      <div class="cart-item-price-block">
        <div class="cart-item-current-price">${formatPrice(unitPrice)}</div>
        ${hasDiscount ? `
          <div class="cart-item-original-price-row">
            <span class="cart-item-old-price">${formatPrice(product.originalPrice)}</span>
            <span class="cart-item-discount">-${discountPct}%</span>
          </div>
        ` : ''}
      </div>
      <div class="cart-qty-selector">
        <button class="cart-qty-minus" data-id="${product.id}" aria-label="Decrease" ${quantity <= 1 ? 'disabled' : ''}>−</button>
        <span class="cart-qty-val">${quantity}</span>
        <button class="cart-qty-plus" data-id="${product.id}" aria-label="Increase" ${quantity >= maxQty ? 'disabled' : ''}>+</button>
      </div>
    </div>
  `;

  // Event handlers
  requestAnimationFrame(() => {
    // Quantity minus
    const minusBtn = row.querySelector('.cart-qty-minus');
    minusBtn.addEventListener('click', () => {
      const newQty = quantity - 1;
      if (newQty < 1) return;
      updateCartQuantity(product.id, newQty);
      updateCartBadge();
      refreshCart();
    });

    // Quantity plus
    const plusBtn = row.querySelector('.cart-qty-plus');
    plusBtn.addEventListener('click', () => {
      const newQty = quantity + 1;
      if (newQty > maxQty) return;
      updateCartQuantity(product.id, newQty);
      updateCartBadge();
      refreshCart();
    });

    // Remove
    const removeBtn = row.querySelector('.cart-item-remove-btn');
    removeBtn.addEventListener('click', () => {
      row.classList.add('removing');
      setTimeout(() => {
        removeFromCart(product.id);
        updateCartBadge();
        showToast('Item removed from cart');
        refreshCart();
      }, 300);
    });
  });

  return row;
}

// --- Build Cart Summary ---
function buildCartSummary(cart) {
  const summary = document.createElement('div');
  summary.className = 'cart-summary';
  summary.id = 'cart-summary';

  let subtotal = 0;

  cart.forEach(cartItem => {
    const product = getProductById(cartItem.productId);
    if (!product) return;

    const price = product.discountedPrice ?? product.originalPrice;
    subtotal += price * cartItem.quantity;
  });

  summary.innerHTML = `
    <div class="cart-summary-title">Cart Summary</div>
    <div class="cart-summary-subtotal-row">
      <span class="label">Subtotal</span>
      <span class="value">${formatPrice(subtotal)}</span>
    </div>
    <button class="checkout-btn" id="checkout-btn">
      Checkout (${formatPrice(subtotal)})
    </button>
  `;

  // Checkout button handler
  requestAnimationFrame(() => {
    const checkoutBtn = summary.querySelector('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        window.location.href = '/checkout.html';
      });
    }
  });

  return summary;
}

// --- Render Recently Viewed Section ---
function renderRecentlyViewed(container, cart) {
  const allProducts = getProducts();
  const cartProductIds = cart.map(item => item.productId);
  const recentlyViewedProducts = allProducts
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, 6);

  if (recentlyViewedProducts.length > 0) {
    const rvContainer = document.createElement('div');
    rvContainer.className = 'recently-viewed-container';
    rvContainer.innerHTML = `
      <div class="recently-viewed-header">
        <h2>Recently Viewed</h2>
        <a href="/" class="see-all-link">See All <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="vertical-align: middle;"><path d="M9 18l6-6-6-6"/></svg></a>
      </div>
      <div class="recently-viewed-row">
        ${recentlyViewedProducts.map(renderProductCard).join('')}
      </div>
    `;
    container.appendChild(rvContainer);
  }
}

// --- Render Customers Who Viewed This Also Viewed Section ---
function renderAlsoViewed(container, cart) {
  const allProducts = getProducts();
  const cartProductIds = cart.map(item => item.productId);
  
  // Filter out products in the cart
  const filtered = allProducts.filter(p => !cartProductIds.includes(p.id));
  
  // Take products from index 6 to 12 to ensure no overlap with Recently Viewed
  const alsoViewedProducts = filtered.slice(6, 12);

  if (alsoViewedProducts.length > 0) {
    const rvContainer = document.createElement('div');
    rvContainer.className = 'recently-viewed-container';
    rvContainer.style.marginTop = '16px';
    rvContainer.innerHTML = `
      <div class="recently-viewed-header">
        <h2>Customers who viewed this also viewed</h2>
      </div>
      <div class="recently-viewed-row">
        ${alsoViewedProducts.map(renderProductCard).join('')}
      </div>
    `;
    container.appendChild(rvContainer);
  }
}

// --- Empty Cart ---
function renderEmptyCart() {
  return `
    <div class="cart-empty">
      <span class="cart-empty-icon">🛒</span>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any products yet. Start shopping and discover amazing deals!</p>
      <a href="/" class="continue-shopping-btn">← Continue Shopping</a>
    </div>
  `;
}

// --- Refresh Cart (re-render in place) ---
function refreshCart() {
  renderCartPage();
}
