import { renderHeader, renderFooter, initPageTransitions, initImageFadeIn } from '/js/components.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHeader('');
  renderDeliveryPage();
  renderFooter();
  initPageTransitions();
  initImageFadeIn();
});

function renderDeliveryPage() {
  const main = document.getElementById('main-content');
  const urlParams = new URLSearchParams(window.location.search);
  const orderRef = urlParams.get('ref') || 'JUMIA-XXXXXX';

  // For demonstration, we'll randomize the current step (1 to 5)
  // 1: Order Placed, 2: Processing, 3: Shipped, 4: Out for Delivery, 5: Delivered
  const currentStep = Math.floor(Math.random() * 3) + 1; // Show it mostly in early stages for demo

  // Calculate progress bar width based on active step
  const progressWidth = ((currentStep - 1) / 4) * 100;

  const getStepClass = (stepNum) => {
    if (stepNum < currentStep) return 'step completed';
    if (stepNum === currentStep) return 'step active';
    return 'step';
  };

  const checkIcon = `<svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;

  main.innerHTML = `
    <div class="delivery-page">
      <div class="delivery-header">
        <h1>Track Your Order</h1>
        <p>Stay updated on your package's journey to your destination.</p>
        <div class="order-ref-badge">${orderRef}</div>
      </div>

      <div class="delivery-card">
        <div class="progress-container">
          <div class="progress-track"></div>
          <div class="progress-fill" style="width: ${progressWidth}%;"></div>
          <div class="progress-steps">
            <div class="${getStepClass(1)}">
              <div class="step-icon">${currentStep > 1 ? checkIcon : '1'}</div>
              <div class="step-label">Order Placed</div>
            </div>
            <div class="${getStepClass(2)}">
              <div class="step-icon">${currentStep > 2 ? checkIcon : '2'}</div>
              <div class="step-label">Processing</div>
            </div>
            <div class="${getStepClass(3)}">
              <div class="step-icon">${currentStep > 3 ? checkIcon : '3'}</div>
              <div class="step-label">Shipped</div>
            </div>
            <div class="${getStepClass(4)}">
              <div class="step-icon">${currentStep > 4 ? checkIcon : '4'}</div>
              <div class="step-label">Out for Delivery</div>
            </div>
            <div class="${getStepClass(5)}">
              <div class="step-icon">${currentStep > 5 ? checkIcon : '5'}</div>
              <div class="step-label">Delivered</div>
            </div>
          </div>
        </div>

        <div class="delivery-details">
          <div class="detail-block">
            <h3>Estimated Delivery</h3>
            <p class="highlight">Tomorrow, by 5:00 PM</p>
          </div>
          <div class="detail-block">
            <h3>Carrier Details</h3>
            <p>Jumia Express Fleet</p>
            <p>Tracking ID: TRK-${Math.floor(Math.random() * 90000) + 10000}</p>
          </div>
          <div class="detail-block">
            <h3>Delivery Address</h3>
            <p>Your selected pickup station or home address will appear here.</p>
          </div>
          <div class="detail-block">
            <h3>Order Status</h3>
            <p>${getStatusText(currentStep)}</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <a href="/" class="btn btn-secondary">Continue Shopping</a>
        <a href="#" class="btn btn-primary" onclick="alert('Support chat is currently offline.')">Contact Support</a>
      </div>
    </div>
  `;
}

function getStatusText(step) {
  switch (step) {
    case 1: return 'We have received your order and are getting it ready.';
    case 2: return 'Your items are being packed at our fulfillment center.';
    case 3: return 'Your package has been handed over to our delivery partner.';
    case 4: return 'Your package is on its way to your address!';
    case 5: return 'Your package has been delivered successfully. Enjoy!';
    default: return 'Status unknown.';
  }
}
