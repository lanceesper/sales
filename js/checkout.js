// ============================================
// Jumia - Checkout JS Flow
// ============================================

import {
  initStore,
  getCart,
  getDeliveryStations,
  clearCart,
  formatPrice,
  getProductById,
  addOrder,
  updateOrderStatus,
  getOrders,
  updateCartQuantity,
  removeFromCart
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


let customerInfo = {};
let selectedStationInfo = null;

try {
  const savedStationStr = localStorage.getItem('checkout_station');
  if (savedStationStr) {
    selectedStationInfo = JSON.parse(savedStationStr);
  }
} catch(e) {
  console.error('Error parsing saved station', e);
}

function renderDetailsForm(leftCol, rightCol) {
  const stations = getDeliveryStations();
  const counties = [...new Set(stations.map(s => s.county || 'Nairobi'))].sort();
  selectedCounty = counties.includes('Nairobi') ? 'Nairobi' : counties[0];

  const initialStation = stations.find(s => s.county === selectedCounty) || stations[0];
  selectedFee = initialStation ? initialStation.fee : 150;

  const regionOptionsHTML = counties.map(c => `<option value="${c}" ${c === selectedCounty ? 'selected' : ''}>${c}</option>`).join('');

  const step1 = document.createElement('div');
  step1.className = 'accordion-section active';
  step1.id = 'step1-section';
  step1.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion(1)">
      <div class="accordion-title">
        <div class="accordion-icon">&#10003;</div>
        1. CUSTOMER ADDRESS
      </div>
      <button class="accordion-change-btn" type="button" onclick="event.stopPropagation(); toggleAccordion(1)">Change ></button>
    </div>
    <div class="accordion-summary" id="step1-summary"></div>
    <div class="accordion-body">
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
            <label class="checkout-form-label" for="checkout-email">Email Address</label>
            <input type="email" class="checkout-form-input" id="checkout-email" placeholder="e.g. john@example.com" required />
          </div>
          <div class="form-group">
            <label class="checkout-form-label" for="checkout-county">County / Region</label>
            <select class="checkout-form-select" id="checkout-county">
              ${regionOptionsHTML}
            </select>
          </div>
          <div class="form-group">
            <label class="checkout-form-label" for="checkout-town">Town / City</label>
            <select class="checkout-form-select" id="checkout-town">
            </select>
          </div>
        </div>
        <button type="submit" class="btn-primary">Save and Continue</button>
      </form>
    </div>
  `;

  const step2 = document.createElement('div');
  step2.className = 'accordion-section';
  step2.id = 'step2-section';
  step2.innerHTML = `
    <div class="accordion-header" onclick="if(this.parentElement.classList.contains('completed')) toggleAccordion(2)">
      <div class="accordion-title">
        <div class="accordion-icon">&#10003;</div>
        2. DELIVERY DETAILS
      </div>
      <button class="accordion-change-btn" type="button" onclick="event.stopPropagation(); toggleAccordion(2)">Change ></button>
    </div>
    <div class="accordion-summary" id="step2-summary"></div>
    <div class="accordion-body">
      
      <label class="delivery-option" id="option-pickup">
        <input type="radio" name="delivery_type" value="pickup">
        <div class="delivery-option-details">
          <div class="delivery-option-title">
            <span>Pick-up Station</span>
            <span class="delivery-option-price" id="pickup-fee-preview">FROM KSh 280</span>
          </div>
          <div class="delivery-option-desc">Delivery between 20 June and 22 June</div>
          <div id="selected-pickup-details" style="display:none; padding:10px; background:#f9f9f9; border:1px solid #eee; border-radius:4px; margin-bottom:10px;">
          </div>
          <button type="button" class="delivery-select-btn" id="btn-select-station">Select pickup station ></button>
        </div>
      </label>

      <label class="delivery-option" id="option-door">
        <input type="radio" name="delivery_type" value="door">
        <div class="delivery-option-details">
          <div class="delivery-option-title">
            <span>Door Delivery</span>
            <span class="delivery-option-price">FROM KSh 23,200</span>
          </div>
          <div class="delivery-option-desc">Delivery between 19 June and 25 June</div>
        </div>
      </label>
      
      <button type="button" class="btn-primary" id="btn-save-delivery" style="display:none;">Save and Continue</button>
    </div>
  `;

  const step3 = document.createElement('div');
  step3.className = 'accordion-section';
  step3.id = 'step3-section';
  step3.innerHTML = `
    <div class="accordion-header" onclick="if(this.parentElement.classList.contains('completed')) toggleAccordion(3)">
      <div class="accordion-title">
        <div class="accordion-icon">&#10003;</div>
        3. PAYMENT METHOD
      </div>
      <button class="accordion-change-btn" type="button" onclick="event.stopPropagation(); toggleAccordion(3)">Change ></button>
    </div>
    <div class="accordion-summary" id="step3-summary"></div>
    <div class="accordion-body">
      <div class="payment-method-header">
        <img src="/jumia_pay_transparent.png" alt="Jumia Pay" class="payment-method-logo" />
      </div>
      
      <label class="delivery-option selected" style="margin-bottom: 20px;">
        <input type="radio" name="payment_method" value="mpesa" checked>
        <div class="delivery-option-details">
          <div class="delivery-option-title" style="color: #f68b1e; margin-bottom: 2px;">
            <span>Pay Now with M-Pesa</span>
          </div>
          <div class="delivery-option-desc" style="font-weight: 600; color: #000;">Pay now fast and securely with your Mpesa account.</div>
          
          <div class="payment-details-box">
            <div class="store-credit-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12zm-9-2h2V9h-2v7z"/></svg>
              Jumia store credit balance: KSh 0
            </div>
            <div class="payment-info-text">
              You will be redirected to the JumiaPay platform to complete your purchase.<br>
              Ensure your payment information is up to date and that you have the necessary funds....<br>
              <a href="#" style="color: #0071e3; text-decoration: none;">Details</a>
            </div>
            <div class="payment-footer">
              <span>Powered by <span style="font-weight:700; color:#333;">JUMIA <span style="color:#0071e3;">PAY</span></span></span>
              <div class="payment-footer-logos">
                <span>We accept:</span>
                <span style="color:#4caf50; font-weight:700; font-style:italic;">M-PESA</span>
              </div>
            </div>
          </div>
        </div>
      </label>
      
      <button class="btn-primary" id="place-order-btn" style="width: 100%; font-size: 1.1rem;">Confirm order</button>
    </div>
  `;

  leftCol.appendChild(step1);
  leftCol.appendChild(step2);
  leftCol.appendChild(step3);

  if (selectedStationInfo) {
    const preview = step2.querySelector('#selected-pickup-details');
    preview.style.display = 'block';
    preview.innerHTML = `
      <strong>${selectedStationInfo.name}</strong><br>
      <span style="font-size:0.8rem; color:#666;">${selectedStationInfo.location}</span>
    `;
    step2.querySelector('#pickup-fee-preview').innerText = `KSh ${selectedStationInfo.fee}`;
    step2.querySelector('#option-door').classList.remove('selected');
    step2.querySelector('#option-pickup').classList.add('selected');
    step2.querySelector('#option-pickup input').checked = true;
    step2.querySelector('#btn-save-delivery').style.display = 'block';
  }

  const townSelect = step1.querySelector('#checkout-town');
  const countySelect = step1.querySelector('#checkout-county');
  updateTownOptions(townSelect, countySelect.value, stations);

  countySelect.addEventListener('change', (e) => {
    selectedCounty = e.target.value;
    updateTownOptions(townSelect, selectedCounty, stations);
  });

  const form = step1.querySelector('#checkout-details-form');
  
  // Pre-fill from localStorage if available
  const savedAddressStr = localStorage.getItem('checkout_address');
  if (savedAddressStr) {
    try {
      const savedAddress = JSON.parse(savedAddressStr);
      document.getElementById('checkout-name').value = savedAddress.name || '';
      document.getElementById('checkout-phone').value = savedAddress.phone || '';
      document.getElementById('checkout-email').value = savedAddress.email || '';
      if (savedAddress.county) {
        countySelect.value = savedAddress.county;
        selectedCounty = savedAddress.county;
        updateTownOptions(townSelect, selectedCounty, stations);
      }
      if (savedAddress.town) {
        townSelect.value = savedAddress.town;
      }
    } catch (e) {
      console.error('Error parsing saved address', e);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    customerInfo = {
      name: document.getElementById('checkout-name').value.trim(),
      phone: document.getElementById('checkout-phone').value.trim(),
      email: document.getElementById('checkout-email').value.trim(),
      county: document.getElementById('checkout-county').value,
      town: document.getElementById('checkout-town').value,
    };

    if (customerInfo.phone.length < 10) {
      showToast('Please enter a valid phone number!', 'error');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('checkout_address', JSON.stringify(customerInfo));

    document.getElementById('step1-summary').innerHTML = `
      <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${customerInfo.name}</div>
      <div>${customerInfo.town} | ${customerInfo.county} | ${customerInfo.phone}</div>
    `;

    markStepCompleted(1);
    toggleAccordion(2);
  });

  const doorOption = step2.querySelector('#option-door input');
  const pickupOption = step2.querySelector('#option-pickup input');
  const btnSelectStation = step2.querySelector('#btn-select-station');
  const btnSaveDelivery = step2.querySelector('#btn-save-delivery');

  doorOption.addEventListener('change', () => {
    if (doorOption.checked) {
      showToast('We are experiencing problems with this right now! Please select a pick up station instead!', 'error');
      doorOption.checked = false;
      pickupOption.checked = false;
      step2.querySelector('#option-door').classList.remove('selected');
      btnSaveDelivery.style.display = 'none';
    }
  });

  pickupOption.addEventListener('change', () => {
    step2.querySelector('#option-door').classList.remove('selected');
    step2.querySelector('#option-pickup').classList.add('selected');
    
    if (selectedStationInfo) {
      btnSaveDelivery.style.display = 'block';
    } else {
      openPickupModal(stations);
    }
  });

  btnSelectStation.addEventListener('click', (e) => {
    e.preventDefault();
    pickupOption.checked = true;
    step2.querySelector('#option-door').classList.remove('selected');
    step2.querySelector('#option-pickup').classList.add('selected');
    openPickupModal(stations);
  });

  btnSaveDelivery.addEventListener('click', () => {
    if (!selectedStationInfo) {
      showToast('Please select a pickup station', 'error');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('checkout_station', JSON.stringify(selectedStationInfo));
    
    selectedFee = selectedStationInfo.fee || 280;
    
    document.getElementById('step2-summary').innerHTML = `
      <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Pick-up Station</div>
      <div>${selectedStationInfo.name}</div>
    `;

    const cart = getCart();
    renderOrderSummary(rightCol, cart);

    markStepCompleted(2);
    toggleAccordion(3);
  });

  const placeBtn = step3.querySelector('#place-order-btn');
  placeBtn.addEventListener('click', () => {
    if (!step1.classList.contains('completed') || !step2.classList.contains('completed')) {
      showToast('Please complete all previous steps first!', 'error');
      return;
    }

    const cart = getCart();
    let subtotal = 0;
    cart.forEach(item => {
      const p = getProductById(item.productId);
      if (p) subtotal += (p.discountedPrice ?? p.originalPrice) * item.quantity;
    });
    const total = subtotal + selectedFee;

    triggerStkPushPayment(customerInfo.phone, total, customerInfo.name);
  });

  renderPickupModal(leftCol);
}

function updateTownOptions(townSelect, county, stations) {
  const filtered = stations.filter(s => s.county === county);
  const towns = [...new Set(filtered.map(s => s.town))].sort();
  townSelect.innerHTML = towns.map(t => `<option value="${t}">${t}</option>`).join('');
}

window.toggleAccordion = function(stepNum) {
  for (let i = 1; i <= 3; i++) {
    const section = document.getElementById(`step${i}-section`);
    if (section) {
      if (i === stepNum) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    }
  }
};

window.markStepCompleted = function(stepNum) {
  const section = document.getElementById(`step${stepNum}-section`);
  if (section) {
    section.classList.add('completed');
  }
  
  if (stepNum === 2) {
    const sidebarBtn = document.getElementById('sidebar-place-order-btn');
    if (sidebarBtn) {
      sidebarBtn.removeAttribute('disabled');
      sidebarBtn.style.background = 'var(--accent-primary)';
      sidebarBtn.style.cursor = 'pointer';
      sidebarBtn.style.opacity = '1';
    }
  }
};

function renderPickupModal(container) {
  const modal = document.createElement('div');
  modal.className = 'pickup-modal-overlay';
  modal.id = 'pickup-modal';
  modal.innerHTML = `
    <div class="pickup-modal">
      <div class="pickup-modal-header">
        <h3>Select a Pick-up station close to you</h3>
        <button class="pickup-modal-close" id="pickup-modal-close">&times;</button>
      </div>
      <div class="pickup-modal-body">
        <div class="pickup-modal-list">
          <div class="pickup-modal-filters">
            <select id="modal-county-filter"></select>
            <select id="modal-town-filter"></select>
          </div>
          <div class="pickup-modal-stations" id="modal-stations-list">
          </div>
        </div>
      </div>
      <div class="pickup-modal-footer">
        <button class="btn-confirm-station" id="btn-confirm-station" disabled>Select pickup station</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('pickup-modal-close').addEventListener('click', closePickupModal);
}

function openPickupModal(stations) {
  const modal = document.getElementById('pickup-modal');
  modal.classList.add('active');

  const counties = [...new Set(stations.map(s => s.county || 'Nairobi'))].sort();
  
  const countyFilter = document.getElementById('modal-county-filter');
  countyFilter.innerHTML = counties.map(c => `<option value="${c}" ${c === customerInfo.county ? 'selected' : ''}>${c}</option>`).join('');

  const townFilter = document.getElementById('modal-town-filter');
  
  function updateModalTowns(county) {
    const filteredStations = stations.filter(s => s.county === county);
    const towns = [...new Set(filteredStations.map(s => s.town))].sort();
    townFilter.innerHTML = towns.map(t => `<option value="${t}" ${t === customerInfo.town ? 'selected' : ''}>${t}</option>`).join('');
    renderStationsList(county, townFilter.value, stations);
  }

  countyFilter.addEventListener('change', (e) => updateModalTowns(e.target.value));
  townFilter.addEventListener('change', (e) => renderStationsList(countyFilter.value, e.target.value, stations));

  updateModalTowns(customerInfo.county || counties[0]);
}

function renderStationsList(county, town, stations) {
  const listEl = document.getElementById('modal-stations-list');
  const filtered = stations.filter(s => s.county === county && s.town === town);
  
  if (filtered.length === 0) {
    listEl.innerHTML = `<div style="padding:20px; text-align:center; color:#666;">No stations found in this area.</div>`;
    document.getElementById('btn-confirm-station').disabled = true;
    return;
  }


  const hoursOptions = [
    "Mon-Fri 8am-6pm; Sat 8am-4pm",
    "Mon-Fri 9am-5pm; Sat 9am-1pm",
    "Mon-Sat 8am-8pm; Sun 10am-4pm",
    "Mon-Fri 8:30am-5:30pm; Sat 8:30am-1pm"
  ];

  listEl.innerHTML = filtered.map((s, i) => {
    const fee = s.fee || (280 + Math.floor(Math.random()*50));
    s.fee = fee; // inject fee
    const randHours = hoursOptions[(s.name.length) % hoursOptions.length];
    
    return `
      <label class="station-item ${s.name === (selectedStationInfo?.name) ? 'selected' : ''}">
        <div class="station-item-header">
          <input type="radio" name="modal_station" value="${i}" ${s.name === (selectedStationInfo?.name) ? 'checked' : ''}>
          <div class="station-item-details">
            <div class="station-item-title">
              <span>${s.name}</span>
              <span class="station-item-price">KSh ${fee}</span>
            </div>
            <div class="station-item-address">${s.location || s.town}</div>
            <div style="font-size:0.75rem; color:#888; margin-top:6px; display:flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              Opening hours ${randHours}
            </div>
          </div>
        </div>
      </label>
    `;
  }).join('');


  const radios = listEl.querySelectorAll('input[type="radio"]');
  radios.forEach(r => r.addEventListener('change', () => {
    document.querySelectorAll('.station-item').forEach(el => el.classList.remove('selected'));
    r.closest('.station-item').classList.add('selected');
    document.getElementById('btn-confirm-station').disabled = false;
  }));

  const confirmBtn = document.getElementById('btn-confirm-station');
  const newBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
  
  newBtn.addEventListener('click', () => {
    const selectedRadio = listEl.querySelector('input[type="radio"]:checked');
    if (selectedRadio) {
      selectedStationInfo = filtered[selectedRadio.value];
      
      const preview = document.getElementById('selected-pickup-details');
      preview.style.display = 'block';
      preview.innerHTML = `
        <strong>${selectedStationInfo.name}</strong><br>
        <span style="font-size:0.8rem; color:#666;">${selectedStationInfo.location}</span>
      `;
      document.getElementById('pickup-fee-preview').innerText = `KSh ${selectedStationInfo.fee}`;
      document.getElementById('btn-save-delivery').style.display = 'block';
      
      closePickupModal();
    }
  });
}

function closePickupModal() {
  document.getElementById('pickup-modal').classList.remove('active');
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
    
    <div class="summary-items-list">
      ${cart.map(item => {
        const p = getProductById(item.productId);
        if (!p) return '';
        const price = p.discountedPrice ?? p.originalPrice;
        const img = p.images && p.images.length > 0 ? p.images[0] : '';
        return `
          <div class="summary-item-row" style="flex-direction: column; align-items: stretch; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="summary-item-thumb">
                <img src="${img}" alt="${p.name}" />
              </div>
              <div class="summary-item-details">
                <div class="summary-item-name">${p.name}</div>
                <div class="summary-item-qty-price">${formatPrice(price)} each</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px dashed var(--border-light); padding-top: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="qty-btn" data-action="decrease" data-id="${item.productId}" style="width: 28px; height: 28px; border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--text-primary);">-</button>
                <span style="font-size: 0.9rem; font-weight: 600; min-width: 20px; text-align: center; color: var(--text-primary);">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-id="${item.productId}" style="width: 28px; height: 28px; border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--text-primary);">+</button>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <button class="qty-btn" data-action="remove" data-id="${item.productId}" style="border: none; background: transparent; color: #ff3b30; cursor: pointer; font-size: 0.85rem; font-weight: 500;">Remove</button>
                <span style="font-weight: 700; color: var(--text-primary);">${formatPrice(price * item.quantity)}</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="summary-pricing-block">
      <div class="summary-price-row">
        <span class="label">Item's total (${cart.reduce((a,b)=>a+b.quantity, 0)})</span>
        <span class="value">${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-price-row">
        <span class="label">Delivery fees</span>
        <span class="value">${formatPrice(selectedFee)}</span>
      </div>
      <div class="summary-price-row total">
        <span class="label">Total</span>
        <span class="value">${formatPrice(total)}</span>
      </div>
      <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:12px; padding-top:12px; border-top:1px dashed var(--border-light);">
        You will be able to add a voucher when selecting your payment method.
      </p>
    </div>
    
    <button id="sidebar-place-order-btn" class="place-order-btn" style="background:#aaa; cursor:not-allowed; opacity:0.6;" disabled>
      Confirm order
    </button>
    <div style="text-align:center; font-size:0.75rem; color:#888; margin-top:8px;">
      (Complete the steps in order to proceed)<br><br>
      By proceeding, you are automatically accepting the <a href="#" style="color:#0071e3; text-decoration:none;">Terms & Conditions</a>
    </div>
  `;

  rightCol.appendChild(card);

  const sidebarBtn = card.querySelector('#sidebar-place-order-btn');
  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
      const placeBtn = document.querySelector('#step3-section #place-order-btn');
      if (placeBtn) placeBtn.click();
    });
  }

  const itemsListEl = card.querySelector('.summary-items-list');
  if (itemsListEl) {
    itemsListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.qty-btn');
      if (!btn) return;
      
      const action = btn.dataset.action;
      const productId = btn.dataset.id;
      const item = cart.find(i => i.productId === productId);
      if (!item) return;

      if (action === 'increase') {
        updateCartQuantity(productId, item.quantity + 1);
      } else if (action === 'decrease') {
        if (item.quantity > 1) {
          updateCartQuantity(productId, item.quantity - 1);
        } else {
          removeFromCart(productId);
        }
      } else if (action === 'remove') {
        removeFromCart(productId);
      }
      
      const newCart = getCart();
      updateCartBadge(newCart);
      
      if (newCart.length === 0) {
        window.location.href = '/';
        return;
      }
      
      renderOrderSummary(rightCol, newCart);
    });
  }
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

function showStkError(title, description, orderRef) {
  setStkStage('stk-error-stage');
  const errTitle = document.getElementById('stk-error-title');
  const errDesc = document.getElementById('stk-error-desc');
  if (errTitle) errTitle.textContent = title;
  if (errDesc) errDesc.textContent = description;

  if (orderRef) {
    updateOrderStatus(orderRef, 'failed');
  }
}

function handlePaymentSuccess(orderRef) {
  if (orderRef) {
    updateOrderStatus(orderRef, 'success');
  }

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
        showStkError('Payment Unsuccessful', data.ResponseDescription || 'The transaction was rejected or failed. Please retry.', orderRef);
      }
    } catch (err) {
      console.error('Error while polling status:', err);
    }
  }, 3000);
}


async function triggerStkPushPayment(phone, total, name) {
  const overlay = renderStkPushOverlay();
  overlay.classList.add('visible');

  // Set to initial Send Prompt stage
  setStkStage('stk-send-prompt-stage');
  
  // Populate the description with phone number and amount
  const descEl = document.getElementById('stk-send-desc');
  if (descEl) {
    descEl.innerHTML = `Click the button below to send a secure M-Pesa PIN prompt of <strong>${formatPrice(total)}</strong> to <strong>${phone}</strong>.`;
  }

  const orderRef = 'JUMIA-' + Math.floor(100000 + Math.random() * 900000);

  // Helper function to mark order as failed if still pending
  const markAsFailedIfPending = () => {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderRef);
    if (order && order.status === 'pending') {
      updateOrderStatus(orderRef, 'failed');
    }
  };

  // Bind close actions
  document.getElementById('stk-close-btn').onclick = () => {
    stopAllTimers();
    markAsFailedIfPending();
    overlay.classList.remove('visible');
  };

  document.getElementById('stk-dismiss-btn').onclick = () => {
    stopAllTimers();
    markAsFailedIfPending();
    overlay.classList.remove('visible');
  };

  document.getElementById('stk-retry-btn').onclick = () => {
    triggerStkPushPayment(phone, total, name);
  };

  // Setup Send Prompt button click handler
  const sendBtn = document.getElementById('stk-send-prompt-btn');
  if (sendBtn) {
    sendBtn.onclick = async () => {
      // Transition stage to loading status
      setStkStage('stk-status-stage');
      
      // Get order details
      const email = document.getElementById('checkout-email') ? document.getElementById('checkout-email').value.trim() : '';
      const station = selectedStationInfo ? selectedStationInfo.name : (document.getElementById('checkout-town') ? document.getElementById('checkout-town').value : '');
      const cart = getCart();
      const orderItems = cart.map(item => {
        const p = getProductById(item.productId);
        const price = p ? (p.discountedPrice ?? p.originalPrice) : 0;
        const name = p ? p.name : 'Unknown Product';
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: price,
          name: name
        };
      });

      // Save order to store initially as 'pending'
      addOrder({
        id: orderRef,
        email: email,
        name: name,
        phone: phone,
        county: selectedCounty,
        station: station,
        items: orderItems,
        totalPrice: total,
        status: 'pending'
      });

      // Start 60s timeout countdown in background (no visual timer)
      startCountdown(() => {
        stopAllTimers();
        showStkError('Request Timed Out', 'Handset did not respond. Check if your phone is active and try again.', orderRef);
      });

      // Execute actual STK push payment API call
      await executeStkPushPayment(phone, total, name, orderRef);
    };
  }
}

async function executeStkPushPayment(phone, total, name, orderRef) {
  document.getElementById('stk-status-title').textContent = 'Initiating STK Push...';
  document.getElementById('stk-status-desc').textContent = `Sending payment prompt request to ${phone}...`;

  setStepState('stk-step-init', 'active');
  setStepState('stk-step-prompt', 'pending');
  setStepState('stk-step-verify', 'pending');

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

      document.getElementById('stk-status-title').textContent = 'STK Push Prompt Sent!';
      document.getElementById('stk-status-desc').innerHTML = `A secure M-Pesa PIN prompt has been sent to <strong>${phone}</strong>. Enter your PIN to complete payment of <strong>${formatPrice(total)}</strong>.`;
      setStepState('stk-step-prompt', 'completed');
      setStepState('stk-step-verify', 'active');

      // Start polling status
      startPollingStatus(currentTransactionId, orderRef);
    } else {
      throw new Error(result.error || 'Failed to dispatch push');
    }
  } catch (err) {
    console.error('API Error during STK Push:', err);
    stopAllTimers();
    showStkError('Connection Error', 'Failed to connect to the payment server. Please try again.', orderRef);
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
      
      <div class="stk-push-header">
        <img src="/jumia_pay_transparent.png" alt="Jumia Pay" style="height: 28px;" />
      </div>

      <!-- Stage 0: Send Prompt -->
      <div id="stk-send-prompt-stage" class="stk-stage active">
        <div class="stk-pay-icon-wrap" style="margin-bottom: 20px;">
          <svg class="stk-pay-icon" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="color: var(--accent-primary);">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
            <path d="M12 6v8"/>
            <path d="M9 9h6"/>
          </svg>
        </div>
        <h3 id="stk-send-title">Send M-Pesa Prompt</h3>
        <p id="stk-send-desc">Click below to send a secure payment prompt to your phone.</p>
        
        <button class="stk-send-prompt-btn" id="stk-send-prompt-btn">Send Prompt</button>
      </div>

      <!-- Stage 1: Status Loading -->
      <div id="stk-status-stage" class="stk-stage">
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

