import{i as O,n as q,o as H,p as N,s as I,j as D,c as S,k as v,t as A,v as R}from"./components-DGghigM_.js";/* empty css             */let u="Nairobi",w=150;document.addEventListener("DOMContentLoaded",async()=>{await O(),q("cart"),K(),H()});function K(){const e=document.getElementById("main-content");e.innerHTML="";const s=N();if(!s||s.length===0){I("Your cart is empty! Redirecting to cart...","error"),setTimeout(()=>{window.location.href="/cart.html"},1500);return}const n=document.createElement("nav");n.className="checkout-breadcrumb",n.innerHTML=`
    <a href="/">Home</a>
    <span class="separator">›</span>
    <a href="/cart.html">Shopping Cart</a>
    <span class="separator">›</span>
    <span class="current">Checkout</span>
  `,e.appendChild(n);const a=document.createElement("div");a.className="checkout-layout";const t=document.createElement("div");t.className="checkout-main";const c=document.createElement("div");c.className="checkout-sidebar",a.appendChild(t),a.appendChild(c),e.appendChild(a),j(t,c),L(c,s),Y()}function j(e,s){const n=D(),a=[...new Set(n.map(r=>r.county||"Nairobi"))].sort();u=a.includes("Nairobi")?"Nairobi":a[0];const t=n.find(r=>r.county===u)||n[0];w=t?t.fee:150;const c=a.map(r=>`<option value="${r}" ${r===u?"selected":""}>${r}</option>`).join(""),o=document.createElement("div");o.className="checkout-card",o.innerHTML=`
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
            ${c}
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
  `,e.appendChild(o);const i=o.querySelector("#checkout-town"),d=o.querySelector("#checkout-county");C(i,d.value,n),d.addEventListener("change",r=>{u=r.target.value,C(i,u,n);const k=n.find($=>$.county===u);w=k?k.fee:150;const b=N();L(s,b)});const m=document.createElement("div");m.className="checkout-card",m.innerHTML=`
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
  `,e.appendChild(m);const h=document.getElementById("checkout-phone");h&&h.addEventListener("input",r=>{const k=r.target.value.trim(),b=document.getElementById("mpesa-mirror-phone");b&&(b.textContent=k||"the phone number specified above")})}function C(e,s,n){const a=n.filter(t=>t.county===s);e.innerHTML=a.map(t=>`<option value="${t.name}">${t.name} (${t.town})</option>`).join("")}function L(e,s){e.innerHTML="";let n=0;s.forEach(o=>{const i=S(o.productId);if(!i)return;const d=i.discountedPrice??i.originalPrice;n+=d*o.quantity});const a=n+w,t=document.createElement("div");t.className="checkout-card checkout-summary-card",t.innerHTML=`
    <div class="checkout-card-title">Order Summary</div>
    
    <!-- Item list with thumbnails -->
    <div class="summary-items-list">
      ${s.map(o=>{const i=S(o.productId);if(!i)return"";const d=i.discountedPrice??i.originalPrice;return`
          <div class="summary-item-row">
            <div class="summary-item-thumb">
              <img src="${i.images&&i.images.length>0?i.images[0]:""}" alt="${i.name}" />
            </div>
            <div class="summary-item-details">
              <div class="summary-item-name">${i.name}</div>
              <div class="summary-item-qty-price">Qty: ${o.quantity} | ${v(d)}</div>
            </div>
          </div>
        `}).join("")}
    </div>

    <!-- Pricing Summary -->
    <div class="summary-pricing-block">
      <div class="summary-price-row">
        <span class="label">Items Subtotal</span>
        <span class="value">${v(n)}</span>
      </div>
      <div class="summary-price-row">
        <span class="label">Delivery Cost (${u})</span>
        <span class="value">${v(w)}</span>
      </div>
      <div class="summary-price-row total">
        <span class="label">Order Total</span>
        <span class="value">${v(a)}</span>
      </div>
    </div>

    <!-- Main Place Order Button -->
    <button class="place-order-btn" id="place-order-btn">
      Place Order (${v(a)})
    </button>
  `,e.appendChild(t),t.querySelector("#place-order-btn").addEventListener("click",()=>{document.getElementById("checkout-name").value.trim();const o=document.getElementById("checkout-phone").value.trim(),i=document.getElementById("checkout-details-form");if(!i||!i.reportValidity()){I("Please fill out all the required Delivery Details!","error");return}if(o.length<10){I("Please enter a valid 10-digit phone number!","error");return}M(o,a)})}let E=null,f=null,y=60,T=null;function F(e){y=60;const s=document.getElementById("stk-timer-countdown");s&&(s.textContent=`${y}s`),clearInterval(f),f=setInterval(()=>{y--,s&&(s.textContent=`${y}s`),y<=0&&(clearInterval(f),e&&e())},1e3)}function p(){clearInterval(E),clearInterval(f)}function g(e){document.querySelectorAll(".stk-stage").forEach(n=>n.classList.remove("active"));const s=document.getElementById(e);s&&s.classList.add("active")}function l(e,s){const n=document.getElementById(e);n&&(n.className=`stk-step ${s}`)}function P(e,s){g("stk-error-stage");const n=document.getElementById("stk-error-title"),a=document.getElementById("stk-error-desc");n&&(n.textContent=e),a&&(a.textContent=s)}function x(e){const s=document.getElementById("stk-push-overlay");s&&s.classList.remove("visible");const n=document.getElementById("success-overlay"),a=document.getElementById("success-order-ref");a&&(a.textContent=e),n&&n.classList.add("visible"),A(),R();let t=5;const c=document.getElementById("success-redirect-note");if(c){c.innerHTML=`You will be redirected to the homepage in <strong>${t}</strong> seconds.`;const o=setInterval(()=>{t--,c.innerHTML=`You will be redirected to the homepage in <strong>${t}</strong> seconds.`,t===0&&(clearInterval(o),window.location.href="/")},1e3)}}function J(e,s){clearInterval(E),E=setInterval(async()=>{try{const n=await fetch(`/api/check-status?id=${e}`);if(!n.ok)return;const a=await n.json();a.status==="success"?(p(),l("stk-step-verify","completed"),x(s)):a.status==="failed"&&(p(),P("Payment Unsuccessful",a.ResponseDescription||"The transaction was rejected or failed. Please retry."))}catch(n){console.error("Error while polling status:",n)}},3e3)}function B(e,s,n){const a=document.getElementById("phone-prompt-message");a&&(a.innerHTML=`Pay KSh ${Number(s).toLocaleString("en-KE")} to JUMIA ONLINE STORE? Enter M-Pesa PIN:`);const t=document.getElementById("phone-pin-input");t&&(t.value="");const c=document.querySelector(".phone-keypad");if(c){const d=c.cloneNode(!0);c.parentNode.replaceChild(d,c),d.addEventListener("click",m=>{const h=m.target.closest(".key-btn");if(!h)return;const r=h.dataset.key;r==="clear"?t.value="":r==="backspace"?t.value=t.value.slice(0,-1):t.value.length<4&&(t.value+=r)})}const o=document.getElementById("phone-cancel-btn");o&&(o.onclick=()=>{p(),P("Transaction Cancelled","You cancelled the simulated M-Pesa STK Push PIN prompt. Please try again.")});const i=document.getElementById("phone-send-btn");i&&(i.onclick=()=>{if(!t||t.value.length<4){I("Please enter a 4-digit PIN!","error");return}g("stk-status-stage"),document.getElementById("stk-status-title").textContent="Processing Payment...",document.getElementById("stk-status-desc").textContent="Checking transaction details with Safaricom...",l("stk-step-init","completed"),l("stk-step-prompt","completed"),l("stk-step-verify","active"),setTimeout(()=>{p(),x(n)},1500)})}async function M(e,s,n){const a=U();a.classList.add("visible"),g("stk-status-stage"),document.getElementById("stk-status-title").textContent="Initiating STK Push...",document.getElementById("stk-status-desc").textContent=`Sending payment prompt request to ${e}...`,l("stk-step-init","active"),l("stk-step-prompt","pending"),l("stk-step-verify","pending");const t="JUMIA-"+Math.floor(1e5+Math.random()*9e5);document.getElementById("stk-close-btn").onclick=()=>{p(),a.classList.remove("visible")},document.getElementById("stk-dismiss-btn").onclick=()=>{p(),a.classList.remove("visible")},document.getElementById("stk-retry-btn").onclick=()=>{M(e,s)},F(()=>{p(),P("Request Timed Out","Handset did not respond. Check if your phone is active and try again.")});try{const c=await fetch("/api/pay",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:e,amount:s,reference:t})});if(!c.ok)throw new Error("API server error");const o=await c.json();if(o.success==="200")T=o.transaction_request_id,l("stk-step-init","completed"),l("stk-step-prompt","active"),o.isMock||window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?setTimeout(()=>{g("stk-simulator-stage"),B(e,s,t)},1500):(document.getElementById("stk-status-title").textContent="STK Push Prompt Sent!",document.getElementById("stk-status-desc").innerHTML=`A secure M-Pesa PIN prompt has been sent to <strong>${e}</strong>. Enter your PIN to complete payment of <strong>${v(s)}</strong>.`,l("stk-step-prompt","completed"),l("stk-step-verify","active"),J(T,t));else throw new Error(o.error||"Failed to dispatch push")}catch(c){console.warn("Vercel serverless function not responding, fallback to local client simulator:",c),l("stk-step-init","completed"),l("stk-step-prompt","completed"),setTimeout(()=>{g("stk-simulator-stage"),B(e,s,t)},1200)}}function U(){let e=document.getElementById("stk-push-overlay");return e||(e=document.createElement("div"),e.className="stk-push-overlay",e.id="stk-push-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),e)}function Y(){let e=document.getElementById("success-overlay");e||(e=document.createElement("div"),e.className="success-overlay",e.id="success-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e))}
