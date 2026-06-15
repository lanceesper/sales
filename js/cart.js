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
  getCartTotal,
  clearCart,
  formatPrice
} from '/js/store.js';

import {
  renderHeader,
  renderFooter,
  updateCartBadge,
  showToast
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
    main.appendChild(page);
    return;
  }

  // Page title
  page.innerHTML = `
    <h1 class="cart-page-title">
      <span class="title-icon">🛒</span>
      Shopping Cart
      <span class="item-count">(${totalItems} item${totalItems !== 1 ? 's' : ''})</span>
    </h1>
  `;

  const layout = document.createElement('div');
  layout.className = 'cart-layout';

  // Left: items list
  const itemsList = document.createElement('div');
  itemsList.className = 'cart-items-list';
  itemsList.id = 'cart-items-list';

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
  const itemTotal = unitPrice * quantity;
  const maxQty = product.unitsAvailable;
  const imgSrc = product.images && product.images.length > 0 ? product.images[0] : '';

  row.innerHTML = `
    <div class="cart-item-image">
      <img src="${imgSrc}" alt="${product.name}" />
    </div>
    <div class="cart-item-details">
      <div class="cart-item-name"><a href="/product.html?id=${product.id}">${product.name}</a></div>
      <div class="cart-item-unit-price">Unit price: ${formatPrice(unitPrice)}</div>
    </div>
    <div class="cart-quantity-selector">
      <button class="cart-qty-minus" data-id="${product.id}" aria-label="Decrease" ${quantity <= 1 ? 'disabled' : ''}>−</button>
      <div class="cart-qty-value">${quantity}</div>
      <button class="cart-qty-plus" data-id="${product.id}" aria-label="Increase" ${quantity >= maxQty ? 'disabled' : ''}>+</button>
    </div>
    <div class="cart-item-total">${formatPrice(itemTotal)}</div>
    <button class="cart-item-remove" data-id="${product.id}" aria-label="Remove item">🗑</button>
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
    const removeBtn = row.querySelector('.cart-item-remove');
    removeBtn.addEventListener('click', () => {
      row.classList.add('removing');
      setTimeout(() => {
        removeFromCart(product.id);
        updateCartBadge();
        showToast('Item removed from cart');
        refreshCart();
      }, 350);
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
  let savings = 0;

  cart.forEach(cartItem => {
    const product = getProductById(cartItem.productId);
    if (!product) return;

    const hasDiscount = product.discountedPrice !== null && product.discountedPrice !== undefined;
    const price = hasDiscount ? product.discountedPrice : product.originalPrice;

    subtotal += price * cartItem.quantity;

    if (hasDiscount) {
      savings += (product.originalPrice - product.discountedPrice) * cartItem.quantity;
    }
  });

  const total = subtotal;

  summary.innerHTML = `
    <div class="cart-summary-title">Cart Summary</div>
    <div class="cart-summary-row">
      <span class="label">Subtotal</span>
      <span class="value">${formatPrice(subtotal)}</span>
    </div>
    ${savings > 0 ? `
    <div class="cart-summary-row savings">
      <span class="label">You save</span>
      <span class="value">-${formatPrice(savings)}</span>
    </div>
    ` : ''}
    <div class="cart-summary-row">
      <span class="label">Delivery</span>
      <span class="value" style="color: var(--accent-success);">Calculated at checkout</span>
    </div>
    <div class="cart-summary-divider"></div>
    <div class="cart-summary-total">
      <span class="label">Total</span>
      <span class="value">${formatPrice(total)}</span>
    </div>
    <button class="checkout-btn" id="checkout-btn">
      🔒 Proceed to Checkout
    </button>
    <div class="cart-secure-note">🔐 Secure checkout powered by Jumia</div>
  `;

  // Checkout button handler
  requestAnimationFrame(() => {
    const checkoutBtn = summary.querySelector('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        showToast('Checkout coming soon!');
      });
    }
  });

  return summary;
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
