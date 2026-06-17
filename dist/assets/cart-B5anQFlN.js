import{i as P,n as k,o as E,p as $,q as L,c as C,t as S,v as o,s as f,w as B,k as m,x as h,y as I,g as w,z as b}from"./components-DGghigM_.js";/* empty css             */document.addEventListener("DOMContentLoaded",async()=>{await P(),k("cart"),p(),E()});function p(){const e=document.getElementById("main-content");e.innerHTML="";const t=$(),n=L(),a=document.createElement("div");if(a.className="cart-page",!t||t.length===0){a.innerHTML=x(),y(a,t),g(a,t),e.appendChild(a);return}const s=document.createElement("div");s.className="cart-layout";const i=document.createElement("div");i.className="cart-items-list",i.id="cart-items-list";const c=document.createElement("div");c.className="cart-items-header",c.innerHTML=`<h2>Cart (${n})</h2>`,i.appendChild(c),t.forEach(r=>{const u=C(r.productId);u&&i.appendChild(q(u,r.quantity))}),s.appendChild(i),s.appendChild(M(t)),a.appendChild(s);const d=document.createElement("div");d.className="clear-cart-section",d.innerHTML='<button class="clear-cart-btn" id="clear-cart-btn">🗑️ Clear Cart</button>',a.appendChild(d),y(a,t),g(a,t),e.appendChild(a),requestAnimationFrame(()=>{const r=document.getElementById("clear-cart-btn");r&&r.addEventListener("click",()=>{S(),o(),f("Cart cleared"),p()})})}function q(e,t){const n=document.createElement("div");n.className="cart-item",n.dataset.productId=e.id;const a=e.discountedPrice!==null&&e.discountedPrice!==void 0,s=a?e.discountedPrice:e.originalPrice,i=e.unitsAvailable,c=e.images&&e.images.length>0?e.images[0]:"",d=a?B(e.originalPrice,e.discountedPrice):0;return n.innerHTML=`
    <div class="cart-item-image">
      <img src="${c}" alt="${e.name}" />
    </div>
    <div class="cart-item-main">
      <div class="cart-item-name"><a href="/product.html?id=${e.id}">${e.name}</a></div>
      <div class="cart-item-variation">Variation: Standard</div>
      <div class="cart-item-stock">In Stock</div>
      <div class="cart-item-express">JUMIA <span>★</span> EXPRESS</div>
      <button class="cart-item-remove-btn" data-id="${e.id}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 4px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        Remove
      </button>
    </div>
    <div class="cart-item-right">
      <div class="cart-item-price-block">
        <div class="cart-item-current-price">${m(s)}</div>
        ${a?`
          <div class="cart-item-original-price-row">
            <span class="cart-item-old-price">${m(e.originalPrice)}</span>
            <span class="cart-item-discount">-${d}%</span>
          </div>
        `:""}
      </div>
      <div class="cart-qty-selector">
        <button class="cart-qty-minus" data-id="${e.id}" aria-label="Decrease" ${t<=1?"disabled":""}>−</button>
        <span class="cart-qty-val">${t}</span>
        <button class="cart-qty-plus" data-id="${e.id}" aria-label="Increase" ${t>=i?"disabled":""}>+</button>
      </div>
    </div>
  `,requestAnimationFrame(()=>{n.querySelector(".cart-qty-minus").addEventListener("click",()=>{const l=t-1;l<1||(h(e.id,l),o(),v())}),n.querySelector(".cart-qty-plus").addEventListener("click",()=>{const l=t+1;l>i||(h(e.id,l),o(),v())}),n.querySelector(".cart-item-remove-btn").addEventListener("click",()=>{n.classList.add("removing"),setTimeout(()=>{I(e.id),o(),f("Item removed from cart"),v()},300)})}),n}function M(e){const t=document.createElement("div");t.className="cart-summary",t.id="cart-summary";let n=0;return e.forEach(a=>{const s=C(a.productId);if(!s)return;const i=s.discountedPrice??s.originalPrice;n+=i*a.quantity}),t.innerHTML=`
    <div class="cart-summary-title">Cart Summary</div>
    <div class="cart-summary-subtotal-row">
      <span class="label">Subtotal</span>
      <span class="value">${m(n)}</span>
    </div>
    <button class="checkout-btn" id="checkout-btn">
      Checkout (${m(n)})
    </button>
  `,requestAnimationFrame(()=>{const a=t.querySelector("#checkout-btn");a&&a.addEventListener("click",()=>{window.location.href="/checkout.html"})}),t}function y(e,t){const n=w(),a=t.map(i=>i.productId),s=n.filter(i=>!a.includes(i.id)).slice(0,6);if(s.length>0){const i=document.createElement("div");i.className="recently-viewed-container",i.innerHTML=`
      <div class="recently-viewed-header">
        <h2>Recently Viewed</h2>
        <a href="/" class="see-all-link">See All <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="vertical-align: middle;"><path d="M9 18l6-6-6-6"/></svg></a>
      </div>
      <div class="recently-viewed-row">
        ${s.map(b).join("")}
      </div>
    `,e.appendChild(i)}}function g(e,t){const n=w(),a=t.map(c=>c.productId),i=n.filter(c=>!a.includes(c.id)).slice(6,12);if(i.length>0){const c=document.createElement("div");c.className="recently-viewed-container",c.style.marginTop="16px",c.innerHTML=`
      <div class="recently-viewed-header">
        <h2>Customers who viewed this also viewed</h2>
      </div>
      <div class="recently-viewed-row">
        ${i.map(b).join("")}
      </div>
    `,e.appendChild(c)}}function x(){return`
    <div class="cart-empty">
      <span class="cart-empty-icon">🛒</span>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any products yet. Start shopping and discover amazing deals!</p>
      <a href="/" class="continue-shopping-btn">← Continue Shopping</a>
    </div>
  `}function v(){p()}
