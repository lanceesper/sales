import{i as D,n as C,o as h,c as P,A as M,k as b,j as T,B as A,v as I,s as B,y as H,C as x}from"./components-B4wW-AAZ.js";/* empty css             */let s=null,$=0,c=1,w=0;document.addEventListener("DOMContentLoaded",async()=>{await D(),C("product");const e=new URLSearchParams(window.location.search).get("id");if(!e){k(),h();return}if(s=P(e),!s){k(),h();return}document.title=`${s.name} - Jumia`;const i=document.getElementById("main-content");i.innerHTML="",N(i),F(i),O(i),G(i),h()});function N(t){const e=document.createElement("nav");e.className="product-breadcrumb",e.setAttribute("aria-label","Breadcrumb"),e.innerHTML=`
    <a href="/">Home</a>
    <span class="breadcrumb-separator">›</span>
    <a href="/?category=${encodeURIComponent(s.category)}">${s.category}</a>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-current">${s.name}</span>
  `,t.appendChild(e)}function F(t){const e=document.createElement("div");e.className="product-layout",e.appendChild(R()),e.appendChild(j()),e.appendChild(K()),t.appendChild(e)}function R(){const t=document.createElement("div");t.className="product-gallery";const e=s.images||[],i=e[0]||"";return t.innerHTML=`
    <div class="main-image-container">
      <img id="main-product-image" src="${i}" alt="${s.name}" class="fade-in" />
      <span class="image-zoom-hint">🔍 Hover to zoom</span>
    </div>
    <div class="thumbnail-strip-wrapper">
      <button class="thumb-arrow left" id="thumb-left" aria-label="Scroll thumbnails left">‹</button>
      <div class="thumbnail-strip" id="thumbnail-strip">
        ${e.map((n,a)=>`
          <div class="thumb ${a===0?"active":""}" data-index="${a}">
            <img src="${n}" alt="${s.name} - Image ${a+1}" />
          </div>
        `).join("")}
      </div>
      <button class="thumb-arrow right" id="thumb-right" aria-label="Scroll thumbnails right">›</button>
    </div>
  `,requestAnimationFrame(()=>{const n=t.querySelectorAll(".thumb"),a=t.querySelector("#main-product-image"),r=t.querySelector("#thumbnail-strip");n.forEach(u=>{u.addEventListener("click",()=>{const l=parseInt(u.dataset.index);l!==$&&($=l,a.classList.remove("fade-in"),a.classList.add("fade-out"),setTimeout(()=>{a.src=e[l],a.classList.remove("fade-out"),a.classList.add("fade-in")},250),n.forEach(v=>v.classList.remove("active")),u.classList.add("active"))})});const d=t.querySelector("#thumb-left"),o=t.querySelector("#thumb-right");d.addEventListener("click",()=>{r.scrollBy({left:-160,behavior:"smooth"})}),o.addEventListener("click",()=>{r.scrollBy({left:160,behavior:"smooth"})})}),t}function j(){const t=document.createElement("div");t.className="product-info";const e=s.discountedPrice!==null&&s.discountedPrice!==void 0,i=e?s.discountedPrice:s.originalPrice,n=e?M(s.originalPrice,s.discountedPrice):0;let a="";const r=s.unitsAvailable;r===0?a='<span class="stock-dot stock-out"></span><span class="stock-text-out">Out of stock</span>':r<=5?a=`<span class="stock-dot stock-low"></span><span class="stock-text-low">Only ${r} left — order soon!</span>`:a='<span class="stock-dot stock-in"></span><span class="stock-text-in">In stock</span>';const d=g(s.rating),o=new Date;o.setDate(o.getDate()+3);const u=o.toLocaleDateString("en-KE",{weekday:"short",month:"short",day:"numeric"});return t.innerHTML=`
    <h1 class="product-title">${s.name}</h1>
    <div class="product-brand">Brand: <a href="/?brand=${encodeURIComponent(s.brand)}">${s.brand}</a></div>

    <div class="product-price-section">
      <span class="product-current-price">${b(i)}</span>
      ${e?`<span class="product-original-price">${b(s.originalPrice)}</span>`:""}
      ${e?`<span class="product-discount-badge">-${n}%</span>`:""}
    </div>

    <div class="product-stock">${a}</div>

    <div class="product-rating-section">
      <div class="star-rating">${d}</div>
      <span class="rating-count" id="scroll-to-reviews">(${s.reviewCount} verified ratings)</span>
    </div>

    <div class="product-shipping">
      <span class="ship-icon">🚚</span>
      <span>Free delivery by <strong>${u}</strong> for orders above KSh 2,000</span>
    </div>

    <div class="product-promotions">
      <h3>🎉 Promotions</h3>
      <ul>
        <li>Free delivery on your first order</li>
        <li>Easy returns within 7 days</li>
        <li>Genuine products guaranteed</li>
        <li>Pay on delivery available</li>
      </ul>
    </div>
  `,requestAnimationFrame(()=>{const l=t.querySelector("#scroll-to-reviews");l&&l.addEventListener("click",()=>{var p;const v=document.querySelector('[data-tab="reviews"]');v&&(v.click(),(p=document.querySelector(".product-details-section"))==null||p.scrollIntoView({behavior:"smooth"}))})}),t}function K(){const t=document.createElement("div");t.className="product-sidebar";const e=T(),i=s.unitsAvailable,n=i===0,a=document.createElement("div");a.className="sidebar-card";const r=new Date;r.setDate(r.getDate()+3);const d=r.toLocaleDateString("en-KE",{weekday:"short",month:"short",day:"numeric"});a.innerHTML=`
    <div class="sidebar-card-header">📦 Delivery &amp; Returns</div>
    <div class="location-selector">
      <label for="delivery-station">Choose pickup station</label>
      <select id="delivery-station">
        ${e.map((u,l)=>`<option value="${l}">${u.name}</option>`).join("")}
      </select>
    </div>
    <div class="station-info" id="station-info">
      ${S(e[0],d)}
    </div>
  `,t.appendChild(a);const o=document.createElement("div");return o.className="sidebar-card",o.innerHTML=`
    <div class="quantity-section">
      <label>Quantity</label>
      <div class="quantity-selector">
        <button id="qty-minus" aria-label="Decrease quantity" ${c<=1||n?"disabled":""}>−</button>
        <div class="qty-value" id="qty-value">${c}</div>
        <button id="qty-plus" aria-label="Increase quantity" ${c>=i||n?"disabled":""}>+</button>
      </div>
    </div>
    <button class="add-to-cart-btn" id="add-to-cart-btn" ${n?"disabled":""}>
      <span class="cart-icon">🛒</span>
      <span>${n?"Out of Stock":"Add to Cart"}</span>
    </button>
  `,t.appendChild(o),requestAnimationFrame(()=>{a.querySelector("#delivery-station").addEventListener("change",m=>{w=parseInt(m.target.value);const E=a.querySelector("#station-info"),y=new Date;y.setDate(y.getDate()+2+Math.floor(Math.random()*3));const q=y.toLocaleDateString("en-KE",{weekday:"short",month:"short",day:"numeric"});E.innerHTML=S(e[w],q)});const l=o.querySelector("#qty-minus"),v=o.querySelector("#qty-plus"),p=o.querySelector("#qty-value");l.addEventListener("click",()=>{c>1&&(c--,L(p,l,v))}),v.addEventListener("click",()=>{c<i&&(c++,L(p,l,v))});const f=o.querySelector("#add-to-cart-btn");f.addEventListener("click",()=>{if(!n){for(let m=0;m<c;m++)A(s.id);I(),B(`Added ${c>1?c+" items":""} to cart!`),f.style.transform="scale(0.95)",setTimeout(()=>{f.style.transform=""},150)}})}),t}function S(t,e){return`
    <div class="station-info-row">
      <span class="station-info-icon">📍</span>
      <div>
        <div class="station-info-label">Pickup Station</div>
        <div class="station-info-value">${t.name}</div>
      </div>
    </div>
    <div class="station-info-row">
      <span class="station-info-icon">💰</span>
      <div>
        <div class="station-info-label">Delivery Fee</div>
        <div class="station-info-value delivery-fee">${b(t.fee)}</div>
      </div>
    </div>
    <div class="station-info-row">
      <span class="station-info-icon">📅</span>
      <div>
        <div class="station-info-label">Estimated Delivery</div>
        <div class="station-info-value">${e}</div>
      </div>
    </div>
    <div class="station-info-row">
      <span class="station-info-icon">🚪</span>
      <div>
        <div class="station-info-label">Door Delivery</div>
        <div class="station-info-value delivery-fee">${b(t.fee+100)}</div>
      </div>
    </div>
  `}function L(t,e,i){t.textContent=c,e.disabled=c<=1,i.disabled=c>=s.unitsAvailable}function O(t){const e=document.createElement("div");e.className="product-details-section",e.innerHTML=`
    <div class="product-tabs" role="tablist">
      <button class="product-tab active" data-tab="description" role="tab" aria-selected="true">Description</button>
      <button class="product-tab" data-tab="reviews" role="tab" aria-selected="false">Reviews (${s.reviewCount})</button>
    </div>
    <div class="tab-panel active" id="tab-description">${Q()}</div>
    <div class="tab-panel" id="tab-reviews">${U()}</div>
  `,requestAnimationFrame(()=>{const i=e.querySelectorAll(".product-tab"),n=e.querySelectorAll(".tab-panel");i.forEach(a=>{a.addEventListener("click",()=>{i.forEach(d=>{d.classList.remove("active"),d.setAttribute("aria-selected","false")}),n.forEach(d=>d.classList.remove("active")),a.classList.add("active"),a.setAttribute("aria-selected","true");const r=e.querySelector(`#tab-${a.dataset.tab}`);r&&r.classList.add("active")})})}),t.appendChild(e)}function Q(){return`<div class="product-description">${s.description||"<p>No description available for this product.</p>"}</div>`}function U(){const t=s.reviews||[],e=s.rating||0,i=s.reviewCount||0,n=[0,0,0,0,0];return t.forEach(a=>{const r=Math.min(5,Math.max(1,Math.round(a.rating)));n[r-1]++}),`
    <div class="reviews-container">
      <div class="reviews-summary">
        <div class="reviews-summary-score">${e.toFixed(1)}</div>
        <div class="reviews-summary-stars">${g(e)}</div>
        <div class="reviews-summary-count">${i} verified ratings</div>
        ${[5,4,3,2,1].map(a=>{const r=n[a-1],d=i>0?r/i*100:0;return`
            <div class="rating-bar-row">
              <span class="rating-bar-label">${a} ★</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${d}%"></div></div>
              <span class="rating-bar-count">${r}</span>
            </div>
          `}).join("")}
      </div>
      <div class="reviews-list">
        ${t.length>0?t.map(a=>z(a)).join(""):'<p style="color: var(--text-muted); font-size: 0.9rem;">No reviews yet. Be the first to review this product!</p>'}
        <button class="write-review-btn">✍️ Write a Review</button>
      </div>
    </div>
  `}function z(t){const e=(t.author||"A").charAt(0).toUpperCase(),i=t.date?new Date(t.date).toLocaleDateString("en-KE",{year:"numeric",month:"short",day:"numeric"}):"";return`
    <div class="review-card">
      <div class="review-card-header">
        <div class="review-avatar">${e}</div>
        <div class="review-meta">
          <div class="review-author">${t.author||"Anonymous"}</div>
          <div class="review-date">${i}</div>
        </div>
        <div class="review-stars">${g(t.rating)}</div>
      </div>
      <div class="review-text">${t.text||""}</div>
    </div>
  `}function G(t){const e=H(s.category).filter(a=>a.id!==s.id).slice(0,6);if(e.length===0)return;const i=document.createElement("div");i.className="similar-products-section",i.innerHTML='<h2 class="similar-products-title">Similar Products</h2>';const n=document.createElement("div");n.className="similar-products-scroll",n.innerHTML=e.map(a=>x(a)).join(""),i.appendChild(n),t.appendChild(i)}function k(){const t=document.getElementById("main-content");t.innerHTML=`
    <div class="product-not-found">
      <span class="nf-emoji">🔍</span>
      <h2>Product Not Found</h2>
      <p>Sorry, we couldn't find the product you're looking for. It may have been removed or the link is incorrect.</p>
      <a href="/">← Back to Shop</a>
    </div>
  `}function g(t){const e=Math.floor(t),i=t-e>=.5;let n="";for(let a=1;a<=5;a++)a<=e||a===e+1&&i?n+='<span class="star-filled">★</span>':n+='<span class="star-empty">☆</span>';return n}
