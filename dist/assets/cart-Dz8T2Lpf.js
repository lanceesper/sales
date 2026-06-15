import{i as b,n as g,o as C,p as f,q as $,c as h,t as E,v as m,s as v,k as o,w as y,x as k}from"./components-B4wW-AAZ.js";/* empty css             */document.addEventListener("DOMContentLoaded",async()=>{await b(),g("cart"),p(),C()});function p(){const t=document.getElementById("main-content");t.innerHTML="";const e=f(),a=$(),i=document.createElement("div");if(i.className="cart-page",!e||e.length===0){i.innerHTML=S(),t.appendChild(i);return}i.innerHTML=`
    <h1 class="cart-page-title">
      <span class="title-icon">🛒</span>
      Shopping Cart
      <span class="item-count">(${a} item${a!==1?"s":""})</span>
    </h1>
  `;const r=document.createElement("div");r.className="cart-layout";const n=document.createElement("div");n.className="cart-items-list",n.id="cart-items-list",e.forEach(c=>{const l=h(c.productId);l&&n.appendChild(L(l,c.quantity))}),r.appendChild(n),r.appendChild(P(e)),i.appendChild(r);const s=document.createElement("div");s.className="clear-cart-section",s.innerHTML='<button class="clear-cart-btn" id="clear-cart-btn">🗑️ Clear Cart</button>',i.appendChild(s),t.appendChild(i),requestAnimationFrame(()=>{const c=document.getElementById("clear-cart-btn");c&&c.addEventListener("click",()=>{E(),m(),v("Cart cleared"),p()})})}function L(t,e){const a=document.createElement("div");a.className="cart-item",a.dataset.productId=t.id;const r=t.discountedPrice!==null&&t.discountedPrice!==void 0?t.discountedPrice:t.originalPrice,n=r*e,s=t.unitsAvailable,c=t.images&&t.images.length>0?t.images[0]:"";return a.innerHTML=`
    <div class="cart-item-image">
      <img src="${c}" alt="${t.name}" />
    </div>
    <div class="cart-item-details">
      <div class="cart-item-name"><a href="/product.html?id=${t.id}">${t.name}</a></div>
      <div class="cart-item-unit-price">Unit price: ${o(r)}</div>
    </div>
    <div class="cart-quantity-selector">
      <button class="cart-qty-minus" data-id="${t.id}" aria-label="Decrease" ${e<=1?"disabled":""}>−</button>
      <div class="cart-qty-value">${e}</div>
      <button class="cart-qty-plus" data-id="${t.id}" aria-label="Increase" ${e>=s?"disabled":""}>+</button>
    </div>
    <div class="cart-item-total">${o(n)}</div>
    <button class="cart-item-remove" data-id="${t.id}" aria-label="Remove item">🗑</button>
  `,requestAnimationFrame(()=>{a.querySelector(".cart-qty-minus").addEventListener("click",()=>{const d=e-1;d<1||(y(t.id,d),m(),u())}),a.querySelector(".cart-qty-plus").addEventListener("click",()=>{const d=e+1;d>s||(y(t.id,d),m(),u())}),a.querySelector(".cart-item-remove").addEventListener("click",()=>{a.classList.add("removing"),setTimeout(()=>{k(t.id),m(),v("Item removed from cart"),u()},350)})}),a}function P(t){const e=document.createElement("div");e.className="cart-summary",e.id="cart-summary";let a=0,i=0;t.forEach(n=>{const s=h(n.productId);if(!s)return;const c=s.discountedPrice!==null&&s.discountedPrice!==void 0,l=c?s.discountedPrice:s.originalPrice;a+=l*n.quantity,c&&(i+=(s.originalPrice-s.discountedPrice)*n.quantity)});const r=a;return e.innerHTML=`
    <div class="cart-summary-title">Cart Summary</div>
    <div class="cart-summary-row">
      <span class="label">Subtotal</span>
      <span class="value">${o(a)}</span>
    </div>
    ${i>0?`
    <div class="cart-summary-row savings">
      <span class="label">You save</span>
      <span class="value">-${o(i)}</span>
    </div>
    `:""}
    <div class="cart-summary-row">
      <span class="label">Delivery</span>
      <span class="value" style="color: var(--accent-success);">Calculated at checkout</span>
    </div>
    <div class="cart-summary-divider"></div>
    <div class="cart-summary-total">
      <span class="label">Total</span>
      <span class="value">${o(r)}</span>
    </div>
    <button class="checkout-btn" id="checkout-btn">
      🔒 Proceed to Checkout
    </button>
    <div class="cart-secure-note">🔐 Secure checkout powered by Jumia</div>
  `,requestAnimationFrame(()=>{const n=e.querySelector("#checkout-btn");n&&n.addEventListener("click",()=>{v("Checkout coming soon!")})}),e}function S(){return`
    <div class="cart-empty">
      <span class="cart-empty-icon">🛒</span>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any products yet. Start shopping and discover amazing deals!</p>
      <a href="/" class="continue-shopping-btn">← Continue Shopping</a>
    </div>
  `}function u(){p()}
