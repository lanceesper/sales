// ============================================
// Jumia - Checkout JS Flow
// ============================================

import {
  initStore,
  getCart,
  getDeliveryStations,
  clearCart,
  formatPrice,
  getCartCount
} from '/js/store.js';

import {
  renderHeader,
  renderFooter,
  updateCartBadge,
  showToast
} from '/js/components.js';

let isMpesaVerified = false;
let selectedCounty = 'Nairobi';
let selectedFee = 150;

document.addEventListener('DOMContentLoaded', async () => {
  await initStore();
  renderHeader('cart');
  renderCheckoutPage();
  renderFooter();
});

function renderCheckoutPage() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const cart = getCart();
  if (!cart || cart.length === 0) {
    showToast('Your cart is empty! Redirecting to cart...', 'error');
    setTimeout(() => {
      window.location.href = '/cart.html';
    }, 1500);
    return;
  }

  // Breadcrumb
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'checkout-breadcrumb';
  breadcrumb.innerHTML = `
    <a href="/">Home</a>
    <span class="separator">›</span>
    <a href="/cart.html">Shopping Cart</a>
    <span class="separator">›</span>
    <span class="current">Checkout</span>
  `;
  main.appendChild(breadcrumb);

  // Main layout
  const layout = document.createElement('div');
  layout.className = 'checkout-layout';

  const leftCol = document.createElement('div');
  leftCol.className = 'checkout-main';

  const rightCol = document.createElement('div');
  rightCol.className = 'checkout-sidebar';

  layout.appendChild(leftCol);
  layout.appendChild(rightCol);
  main.appendChild(layout);

  // Render Left Column (Details and Payment)
  renderDetailsForm(leftCol, rightCol);
  
  // Render Right Column (Summary)
  renderOrderSummary(rightCol, cart);

  // Render Success Modal Overlay
  renderSuccessOverlay();
}

function renderDetailsForm(leftCol, rightCol) {
  const stations = getDeliveryStations();
  const counties = [...new Set(stations.map(s => s.county || 'Nairobi'))].sort();
  selectedCounty = counties.includes('Nairobi') ? 'Nairobi' : counties[0];

  // Set initial delivery fee
  const initialStation = stations.find(s => s.county === selectedCounty) || stations[0];
  selectedFee = initialStation ? initialStation.fee : 150;

  const regionOptionsHTML = counties.map(c => `<option value="${c}" ${c === selectedCounty ? 'selected' : ''}>${c}</option>`).join('');

  // Shipping Card
  const shippingCard = document.createElement('div');
  shippingCard.className = 'checkout-card';
  shippingCard.innerHTML = `
    <div class="checkout-card-title">
      <span class="number">1</span> Delivery Details
    </div>
    <form class="checkout-form" id="checkout-details-form">
      <div class="form-grid">
        <div class="form-group full-width">
          <label class="checkout-form-label" for="checkout-name">Recipient's Full Name</label>
          <input type="text" class="checkout-form-input" id="checkout-name" placeholder="e.g. John Doe" required />
        </div>
        <div class="form-group">
          <label class="checkout-form-label" for="checkout-phone">Phone Number (M-Pesa registered)</label>
          <input type="tel" class="checkout-form-input" id="checkout-phone" placeholder="e.g. 0712345678" required />
        </div>
        <div class="form-group">
          <label class="checkout-form-label" for="checkout-phone-alt">Alternative Phone Number (Optional)</label>
          <input type="tel" class="checkout-form-input" id="checkout-phone-alt" placeholder="e.g. 0722334455" />
        </div>
        <div class="form-group">
          <label class="checkout-form-label" for="checkout-county">County / Region</label>
          <select class="checkout-form-select" id="checkout-county">
            ${regionOptionsHTML}
          </select>
        </div>
        <div class="form-group">
          <label class="checkout-form-label" for="checkout-town">Pickup Town / Neighborhood</label>
          <select class="checkout-form-select" id="checkout-town">
            <!-- Populated dynamically -->
          </select>
        </div>
        <div class="form-group full-width">
          <label class="checkout-form-label" for="checkout-notes">Additional Delivery Instructions (Optional)</label>
          <input type="text" class="checkout-form-input" id="checkout-notes" placeholder="e.g. Leave it at the gate if not available" />
        </div>
      </div>
    </form>
  `;
  leftCol.appendChild(shippingCard);

  // Populate initial towns
  const townSelect = shippingCard.querySelector('#checkout-town');
  const countySelect = shippingCard.querySelector('#checkout-county');
  updateTownOptions(townSelect, countySelect.value, stations);

  // County change handler to update delivery fee dynamically!
  countySelect.addEventListener('change', (e) => {
    selectedCounty = e.target.value;
    updateTownOptions(townSelect, selectedCounty, stations);
    
    // Find delivery fee for first station in that county
    const matchedStation = stations.find(s => s.county === selectedCounty);
    selectedFee = matchedStation ? matchedStation.fee : 150;

    // Re-render order summary to update delivery and total cost
    const cart = getCart();
    renderOrderSummary(rightCol, cart);
  });

  // Payment Card
  const paymentCard = document.createElement('div');
  paymentCard.className = 'checkout-card';
  paymentCard.innerHTML = `
    <div class="checkout-card-title">
      <span class="number">2</span> Payment Method & Verification
    </div>
    
    <!-- M-Pesa payment guide instructions banner -->
    <div class="mpesa-banner-container">
      <img src="/mpesa_payment_guide.png" alt="Lipa na M-Pesa Instructions" class="mpesa-banner" />
    </div>

    <!-- Professionally written steps below the image -->
    <div class="mpesa-instructions">
      <h3>Payment Verification Steps</h3>
      <ol>
        <li>Complete the mobile money transfer using the payment instructions shown in the Lipa na M-Pesa banner above.</li>
        <li>Locate the 10-character confirmation reference code in your M-Pesa transaction SMS (e.g., <strong>RGF8X9Y7Z6</strong>).</li>
        <li>Paste this transaction code into the box below and click the verification button to validate your payment. Once confirmed, you can proceed to place your order.</li>
      </ol>
    </div>

    <!-- Verification input box -->
    <div class="mpesa-verification-block">
      <div class="mpesa-verify-title">Enter transaction reference code</div>
      <div class="mpesa-verify-subtitle">Paste your 10-character code below for validation</div>
      <div class="mpesa-input-row">
        <input type="text" class="mpesa-code-input" id="mpesa-code-input" maxlength="10" placeholder="e.g. SFA8T7D5C4" autocomplete="off" />
        <button type="button" class="mpesa-verify-btn" id="mpesa-verify-btn">Verify Payment</button>
      </div>
      <div class="verification-status" id="verification-status"></div>
    </div>
  `;
  leftCol.appendChild(paymentCard);

  // Bind Payment Verification Handlers
  const mpesaInput = paymentCard.querySelector('#mpesa-code-input');
  const verifyBtn = paymentCard.querySelector('#mpesa-verify-btn');
  const statusEl = paymentCard.querySelector('#verification-status');

  verifyBtn.addEventListener('click', () => {
    const code = mpesaInput.value.trim().toUpperCase();

    // Regex check: Mpesa code is alphanumeric, 10 characters
    const mpesaRegex = /^[A-Z0-9]{10}$/;
    if (!mpesaRegex.test(code)) {
      statusEl.className = 'verification-status error';
      statusEl.innerHTML = '❌ Invalid transaction code format. Must be exactly 10 alphanumeric characters (e.g. SFA8T7D5C4).';
      return;
    }

    // Show verification spinner animation (simulating real backend verification)
    verifyBtn.disabled = true;
    mpesaInput.disabled = true;
    verifyBtn.innerHTML = '<span class="verify-spinner"></span>Verifying...';
    statusEl.style.display = 'none';

    setTimeout(() => {
      isMpesaVerified = true;
      verifyBtn.innerHTML = 'Verified ✓';
      verifyBtn.style.background = '#2e7d32';
      statusEl.className = 'verification-status success';
      statusEl.innerHTML = `✓ Payment verified successfully! M-Pesa transaction code: <strong>${code}</strong> is logged.`;
      
      // Enable checkout button in order summary
      const placeBtn = document.getElementById('place-order-btn');
      if (placeBtn) placeBtn.disabled = false;
    }, 1000);
  });
}

function updateTownOptions(townSelect, county, stations) {
  const filtered = stations.filter(s => s.county === county);
  townSelect.innerHTML = filtered.map(s => `<option value="${s.name}">${s.name} (${s.town})</option>`).join('');
}

function renderOrderSummary(rightCol, cart) {
  rightCol.innerHTML = '';

  let subtotal = 0;
  cart.forEach(item => {
    const p = getProductById(item.productId);
    if (!p) return;
    const price = p.discountedPrice ?? p.originalPrice;
    subtotal += price * item.quantity;
  });

  const total = subtotal + selectedFee;

  const card = document.createElement('div');
  card.className = 'checkout-card checkout-summary-card';
  card.innerHTML = `
    <div class="checkout-card-title">Order Summary</div>
    
    <!-- Item list with thumbnails -->
    <div class="summary-items-list">
      ${cart.map(item => {
        const p = getProductById(item.productId);
        if (!p) return '';
        const price = p.discountedPrice ?? p.originalPrice;
        const img = p.images && p.images.length > 0 ? p.images[0] : '';
        return `
          <div class="summary-item-row">
            <div class="summary-item-thumb">
              <img src="${img}" alt="${p.name}" />
            </div>
            <div class="summary-item-details">
              <div class="summary-item-name">${p.name}</div>
              <div class="summary-item-qty-price">Qty: ${item.quantity} | ${formatPrice(price)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Pricing Summary -->
    <div class="summary-pricing-block">
      <div class="summary-price-row">
        <span class="label">Items Subtotal</span>
        <span class="value">${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-price-row">
        <span class="label">Delivery Cost (${selectedCounty})</span>
        <span class="value">${formatPrice(selectedFee)}</span>
      </div>
      <div class="summary-price-row total">
        <span class="label">Order Total</span>
        <span class="value">${formatPrice(total)}</span>
      </div>
    </div>

    <!-- Main Place Order Button -->
    <button class="place-order-btn" id="place-order-btn" ${!isMpesaVerified ? 'disabled' : ''}>
      Place Order (${formatPrice(total)})
    </button>
  `;

  rightCol.appendChild(card);

  // Place Order handler
  const placeBtn = card.querySelector('#place-order-btn');
  placeBtn.addEventListener('click', () => {
    // Check validation of delivery forms
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();

    if (!name || !phone) {
      showToast('Please fill out all the required Delivery Details!', 'error');
      return;
    }

    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit phone number!', 'error');
      return;
    }

    if (!isMpesaVerified) {
      showToast('Please verify your M-Pesa transaction reference code first!', 'error');
      return;
    }

    // Trigger overlay modal
    const overlay = document.getElementById('success-overlay');
    const refEl = document.getElementById('success-order-ref');
    
    // Generate order reference
    const refCode = `JUMIA-${Math.floor(100000 + Math.random() * 900000)}`;
    refEl.textContent = refCode;

    overlay.classList.add('visible');
    
    // Clear cart in store & header count
    clearCart();
    updateCartBadge();

    // Start redirect countdown
    let count = 5;
    const noteEl = document.getElementById('success-redirect-note');
    const interval = setInterval(() => {
      count--;
      noteEl.innerHTML = `You will be redirected to the homepage in <strong>${count}</strong> seconds.`;
      if (count === 0) {
        clearInterval(interval);
        window.location.href = '/';
      }
    }, 1000);
  });
}

function renderSuccessOverlay() {
  let overlay = document.getElementById('success-overlay');
  if (overlay) return;

  overlay = document.createElement('div');
  overlay.className = 'success-overlay';
  overlay.id = 'success-overlay';
  overlay.innerHTML = `
    <div class="success-card">
      <div class="success-icon-wrap">
        <svg class="success-icon" width="44" height="44" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for shopping with Jumia. Your delivery is being scheduled, and you will receive a confirmation call shortly.</p>
      
      <div class="order-ref-box">
        <div class="order-ref-label">Order Reference Number</div>
        <div class="order-ref-value" id="success-order-ref">JUMIA-783921</div>
      </div>

      <div class="success-redirect-note" id="success-redirect-note">
        You will be redirected to the homepage in <strong>5</strong> seconds.
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
