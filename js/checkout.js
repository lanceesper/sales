// ============================================
// Jumia - Checkout JS Flow
// ============================================

import {
  initStore,
  getCart,
  getDeliveryStations,
  clearCart,
  formatPrice,
  getCartCount,
  getProductById
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
      <span class="number">2</span> Payment Method
    </div>
    
    <div class="mpesa-stk-payment-box">
      <div class="mpesa-stk-header">
        <span class="mpesa-logo-badge">Lipa na M-Pesa</span>
        <span class="mpesa-payment-type">Automated STK Push</span>
      </div>
      <div class="mpesa-stk-body">
        <p>A secure prompt (STK Push) will be sent automatically to your mobile phone once you click "Place Order".</p>
        <div class="mpesa-mirror-alert">
          <svg class="phone-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          <span>Payment prompt will be sent to: <strong id="mpesa-mirror-phone">the phone number specified above</strong></span>
        </div>
        <p class="mpesa-stk-note">Please ensure your phone is unlocked, active, and has sufficient funds to complete the payment.</p>
      </div>
    </div>
  `;
  leftCol.appendChild(paymentCard);

  // Dynamic phone mirroring
  const phoneInput = document.getElementById('checkout-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      const mirror = document.getElementById('mpesa-mirror-phone');
      if (mirror) {
        mirror.textContent = val ? val : 'the phone number specified above';
      }
    });
  }
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
    <button class="place-order-btn" id="place-order-btn">
      Place Order (${formatPrice(total)})
    </button>
  `;

  rightCol.appendChild(card);

  // Place Order handler
  const placeBtn = card.querySelector('#place-order-btn');
  placeBtn.addEventListener('click', () => {
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const detailsForm = document.getElementById('checkout-details-form');

    if (!detailsForm || !detailsForm.reportValidity()) {
      showToast('Please fill out all the required Delivery Details!', 'error');
      return;
    }

    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit phone number!', 'error');
      return;
    }

    // Trigger MegaPay STK Push payment flow
    triggerStkPushPayment(phone, total, name);
  });
}

// ============================================
// STK Push Payment Simulation & Integration Logic
// ============================================

let pollingInterval = null;
let countdownInterval = null;
let countdownValue = 60;
let currentTransactionId = null;

function startCountdown(onTimeout) {
  countdownValue = 60;
  const timerEl = document.getElementById('stk-timer-countdown');
  if (timerEl) timerEl.textContent = `${countdownValue}s`;
  
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    countdownValue--;
    if (timerEl) timerEl.textContent = `${countdownValue}s`;
    
    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      if (onTimeout) onTimeout();
    }
  }, 1000);
}

function stopAllTimers() {
  clearInterval(pollingInterval);
  clearInterval(countdownInterval);
}

function setStkStage(stageId) {
  document.querySelectorAll('.stk-stage').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(stageId);
  if (target) target.classList.add('active');
}

function setStepState(stepId, state) {
  const step = document.getElementById(stepId);
  if (!step) return;
  step.className = `stk-step ${state}`;
}

function showStkError(title, description) {
  setStkStage('stk-error-stage');
  const errTitle = document.getElementById('stk-error-title');
  const errDesc = document.getElementById('stk-error-desc');
  if (errTitle) errTitle.textContent = title;
  if (errDesc) errDesc.textContent = description;
}

function handlePaymentSuccess(orderRef) {
  const overlay = document.getElementById('stk-push-overlay');
  if (overlay) overlay.classList.remove('visible');

  // Trigger standard Jumia success overlay modal
  const successOverlay = document.getElementById('success-overlay');
  const refEl = document.getElementById('success-order-ref');
  
  if (refEl) refEl.textContent = orderRef;
  if (successOverlay) successOverlay.classList.add('visible');

  // Clear cart in store & header count
  clearCart();
  updateCartBadge();

  // Start redirect countdown
  let count = 5;
  const noteEl = document.getElementById('success-redirect-note');
  if (noteEl) {
    noteEl.innerHTML = `You will be redirected to delivery status in <strong>${count}</strong> seconds.`;
    const interval = setInterval(() => {
      count--;
      noteEl.innerHTML = `You will be redirected to delivery status in <strong>${count}</strong> seconds.`;
      if (count === 0) {
        clearInterval(interval);
        window.location.href = `/delivery.html?ref=${orderRef}`;
      }
    }, 1000);
  }
}

function startPollingStatus(transactionId, orderRef) {
  clearInterval(pollingInterval);
  pollingInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/check-status?id=${transactionId}`);
      if (!response.ok) return;

      const data = await response.json();

      if (data.status === 'success') {
        stopAllTimers();
        setStepState('stk-step-verify', 'completed');
        handlePaymentSuccess(orderRef);
      } else if (data.status === 'failed') {
        stopAllTimers();
        showStkError('Payment Unsuccessful', data.ResponseDescription || 'The transaction was rejected or failed. Please retry.');
      }
    } catch (err) {
      console.error('Error while polling status:', err);
    }
  }, 3000);
}

function setupPhoneSimulator(phone, total, orderRef) {
  const messageEl = document.getElementById('phone-prompt-message');
  if (messageEl) {
    messageEl.innerHTML = `Pay KSh ${Number(total).toLocaleString('en-KE')} to JUMIA ONLINE STORE? Enter M-Pesa PIN:`;
  }

  const pinInput = document.getElementById('phone-pin-input');
  if (pinInput) pinInput.value = '';

  const keypad = document.querySelector('.phone-keypad');
  if (keypad) {
    const newKeypad = keypad.cloneNode(true);
    keypad.parentNode.replaceChild(newKeypad, keypad);

    newKeypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.key-btn');
      if (!btn) return;
      const key = btn.dataset.key;

      if (key === 'clear') {
        pinInput.value = '';
      } else if (key === 'backspace') {
        pinInput.value = pinInput.value.slice(0, -1);
      } else {
        if (pinInput.value.length < 4) {
          pinInput.value += key;
        }
      }
    });
  }

  const cancelBtn = document.getElementById('phone-cancel-btn');
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      stopAllTimers();
      showStkError('Transaction Cancelled', 'You cancelled the simulated M-Pesa STK Push PIN prompt. Please try again.');
    };
  }

  const sendBtn = document.getElementById('phone-send-btn');
  if (sendBtn) {
    sendBtn.onclick = () => {
      if (!pinInput || pinInput.value.length < 4) {
        showToast('Please enter a 4-digit PIN!', 'error');
        return;
      }

      setStkStage('stk-status-stage');
      document.getElementById('stk-status-title').textContent = 'Processing Payment...';
      document.getElementById('stk-status-desc').textContent = 'Checking transaction details with Safaricom...';
      setStepState('stk-step-init', 'completed');
      setStepState('stk-step-prompt', 'completed');
      setStepState('stk-step-verify', 'active');

      setTimeout(() => {
        stopAllTimers();
        handlePaymentSuccess(orderRef);
      }, 1500);
    };
  }
}

async function triggerStkPushPayment(phone, total, name) {
  const overlay = renderStkPushOverlay();
  overlay.classList.add('visible');

  setStkStage('stk-status-stage');
  document.getElementById('stk-status-title').textContent = 'Initiating STK Push...';
  document.getElementById('stk-status-desc').textContent = `Sending payment prompt request to ${phone}...`;

  setStepState('stk-step-init', 'active');
  setStepState('stk-step-prompt', 'pending');
  setStepState('stk-step-verify', 'pending');

  const orderRef = 'JUMIA-' + Math.floor(100000 + Math.random() * 900000);

  // Bind close actions
  document.getElementById('stk-close-btn').onclick = () => {
    stopAllTimers();
    overlay.classList.remove('visible');
  };

  document.getElementById('stk-dismiss-btn').onclick = () => {
    stopAllTimers();
    overlay.classList.remove('visible');
  };

  document.getElementById('stk-retry-btn').onclick = () => {
    triggerStkPushPayment(phone, total, name);
  };

  // Start 60s timeout countdown
  startCountdown(() => {
    stopAllTimers();
    showStkError('Request Timed Out', 'Handset did not respond. Check if your phone is active and try again.');
  });

  try {
    const response = await fetch('/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone,
        amount: total,
        reference: orderRef
      })
    });

    if (!response.ok) {
      throw new Error('API server error');
    }

    const result = await response.json();

    if (result.success === '200') {
      currentTransactionId = result.transaction_request_id;
      setStepState('stk-step-init', 'completed');
      setStepState('stk-step-prompt', 'active');

      // Check if local dev or mock response from Vercel Serverless
      if (result.isMock || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
          setStkStage('stk-simulator-stage');
          setupPhoneSimulator(phone, total, orderRef);
        }, 1500);
      } else {
        // Real production mode
        document.getElementById('stk-status-title').textContent = 'STK Push Prompt Sent!';
        document.getElementById('stk-status-desc').innerHTML = `A secure M-Pesa PIN prompt has been sent to <strong>${phone}</strong>. Enter your PIN to complete payment of <strong>${formatPrice(total)}</strong>.`;
        setStepState('stk-step-prompt', 'completed');
        setStepState('stk-step-verify', 'active');

        // Start polling real payment status
        startPollingStatus(currentTransactionId, orderRef);
      }
    } else {
      throw new Error(result.error || 'Failed to dispatch push');
    }
  } catch (err) {
    console.warn('Vercel serverless function not responding, fallback to local client simulator:', err);
    // Offline/no-backend local development fallback
    setStepState('stk-step-init', 'completed');
    setStepState('stk-step-prompt', 'completed');
    
    setTimeout(() => {
      setStkStage('stk-simulator-stage');
      setupPhoneSimulator(phone, total, orderRef);
    }, 1200);
  }
}

function renderStkPushOverlay() {
  let overlay = document.getElementById('stk-push-overlay');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.className = 'stk-push-overlay';
  overlay.id = 'stk-push-overlay';
  overlay.innerHTML = `
    <div class="stk-push-card">
      <button class="stk-close-btn" id="stk-close-btn">&times;</button>
      
      <!-- Stage 1: Status Loading -->
      <div id="stk-status-stage" class="stk-stage active">
        <div class="stk-spinner-wrap">
          <div class="stk-double-bounce1"></div>
          <div class="stk-double-bounce2"></div>
        </div>
        <h3 id="stk-status-title">Initiating STK Push...</h3>
        <p id="stk-status-desc">Preparing secure payment details. Please wait.</p>
        
        <div class="stk-progress-steps">
          <div class="stk-step" id="stk-step-init">
            <span class="stk-step-dot"></span> 1. Connection Initialized
          </div>
          <div class="stk-step" id="stk-step-prompt">
            <span class="stk-step-dot"></span> 2. Request Dispatched
          </div>
          <div class="stk-step" id="stk-step-verify">
            <span class="stk-step-dot"></span> 3. PIN Verification
          </div>
        </div>
        
        <div class="stk-timer-box">
          <div class="stk-timer-label">Request session expires in</div>
          <div class="stk-timer-value" id="stk-timer-countdown">60s</div>
        </div>
      </div>

      <!-- Stage 2: Sandbox Phone Simulator -->
      <div id="stk-simulator-stage" class="stk-stage">
        <div class="phone-mockup">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <div class="phone-header">
              <span class="phone-carrier">Safaricom</span>
              <span class="phone-time">11:30 AM</span>
            </div>
            
            <div class="stk-popup-box">
              <div class="stk-popup-title">SIM Toolkit</div>
              <div class="stk-popup-msg" id="phone-prompt-message">
                Pay KSh 0 to JUMIA ONLINE STORE? Enter M-Pesa PIN:
              </div>
              <div class="stk-popup-input-wrap">
                <input type="password" id="phone-pin-input" readonly maxlength="4" placeholder="••••" />
              </div>
              <div class="stk-popup-actions">
                <button id="phone-cancel-btn" class="popup-btn cancel">Cancel</button>
                <button id="phone-send-btn" class="popup-btn send">Send</button>
              </div>
            </div>

            <div class="phone-keypad">
              <button class="key-btn" data-key="1">1</button>
              <button class="key-btn" data-key="2">2</button>
              <button class="key-btn" data-key="3">3</button>
              <button class="key-btn" data-key="4">4</button>
              <button class="key-btn" data-key="5">5</button>
              <button class="key-btn" data-key="6">6</button>
              <button class="key-btn" data-key="7">7</button>
              <button class="key-btn" data-key="8">8</button>
              <button class="key-btn" data-key="9">9</button>
              <button class="key-btn ctrl" data-key="clear">CLR</button>
              <button class="key-btn" data-key="0">0</button>
              <button class="key-btn ctrl" data-key="backspace">⌫</button>
            </div>
          </div>
        </div>
        <div class="simulator-instructions">
          <h4>Interactive Simulator Mode</h4>
          <p>Since this is a sandbox local test, use the phone simulator on screen to process or reject the mock transaction:</p>
          <ul>
            <li>Enter any 4-digit PIN and click <strong>Send</strong> to mock payment.</li>
            <li>Click <strong>Cancel</strong> to mock user cancellation.</li>
          </ul>
        </div>
      </div>

      <!-- Stage 3: Failure State -->
      <div id="stk-error-stage" class="stk-stage">
        <div class="stk-error-icon-wrap">
          <svg class="stk-error-icon" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h3 id="stk-error-title">Payment Unsuccessful</h3>
        <p id="stk-error-desc">The STK Push request could not be completed.</p>
        
        <div class="stk-error-actions">
          <button class="stk-retry-btn" id="stk-retry-btn">Resend STK Push</button>
          <button class="stk-cancel-btn" id="stk-dismiss-btn">Cancel & Edit Details</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
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
        You will be redirected to delivery status in <strong>5</strong> seconds.
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

