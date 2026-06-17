import{i as B,n as H,o as k,c as R,w as F,k as y,s as I,p as N,x,v as E,C as O,j as U,A as j,z as K}from"./components-DGghigM_.js";/* empty css             */let s=null,q=0;document.addEventListener("DOMContentLoaded",async()=>{await B(),H("product");const t=new URLSearchParams(window.location.search).get("id");if(!t){A(),k();return}if(s=R(t),!s){A(),k();return}document.title=`${s.name} - Jumia`;const i=document.getElementById("main-content");i.innerHTML="",z(i),V(i),W(i),ee(i),k()});function z(e){const t=document.createElement("nav");t.className="product-breadcrumb",t.setAttribute("aria-label","Breadcrumb"),t.innerHTML=`
    <a href="/">Home</a>
    <span class="breadcrumb-separator">›</span>
    <a href="/?category=${encodeURIComponent(s.category)}">${s.category}</a>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-current">${s.name}</span>
  `,e.appendChild(t)}function V(e){const t=document.createElement("div");t.className="product-layout",t.appendChild(Q()),t.appendChild(G()),t.appendChild(J()),e.appendChild(t)}function Q(){const e=document.createElement("div");e.className="product-gallery";const t=s.images||[],i=t[0]||"";return e.innerHTML=`
    <div class="main-image-container">
      <img id="main-product-image" src="${i}" alt="${s.name}" class="fade-in" />
    </div>
    <div class="thumbnail-strip-wrapper">
      <button class="thumb-arrow left" id="thumb-left" aria-label="Scroll thumbnails left">‹</button>
      <div class="thumbnail-strip" id="thumbnail-strip">
        ${t.map((r,a)=>`
          <div class="thumb ${a===0?"active":""}" data-index="${a}">
            <img src="${r}" alt="${s.name} - Image ${a+1}" />
          </div>
        `).join("")}
      </div>
      <button class="thumb-arrow right" id="thumb-right" aria-label="Scroll thumbnails right">›</button>
    </div>
    <div class="share-product">
      <span class="share-label">SHARE THIS PRODUCT</span>
      <div class="share-icons">
        <a href="#" class="share-icon" aria-label="Share on Facebook">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a href="#" class="share-icon" aria-label="Share on Twitter">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
        </a>
        <a href="#" class="share-icon" aria-label="Share on WhatsApp">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  `,requestAnimationFrame(()=>{const r=e.querySelectorAll(".thumb"),a=e.querySelector("#main-product-image"),n=e.querySelector("#thumbnail-strip");r.forEach(u=>{u.addEventListener("click",()=>{const d=parseInt(u.dataset.index);d!==q&&(q=d,a.classList.remove("fade-in"),a.classList.add("fade-out"),setTimeout(()=>{a.src=t[d],a.classList.remove("fade-out"),a.classList.add("fade-in")},250),r.forEach(b=>b.classList.remove("active")),u.classList.add("active"))})});const c=e.querySelector("#thumb-left"),l=e.querySelector("#thumb-right");c.addEventListener("click",()=>{n.scrollBy({left:-160,behavior:"smooth"})}),l.addEventListener("click",()=>{n.scrollBy({left:160,behavior:"smooth"})})}),e}function G(){const e=document.createElement("div");e.className="product-info";const t=s.discountedPrice!==null&&s.discountedPrice!==void 0,i=t?s.discountedPrice:s.originalPrice,r=t?F(s.originalPrice,s.discountedPrice):0;let a="";const n=s.unitsAvailable;n===0?a='<span class="stock-dot stock-out"></span><span class="stock-text-out">Out of stock</span>':n<=5?a=`<span class="stock-dot stock-low"></span><span class="stock-text-low">Only ${n} left — order soon!</span>`:a='<span class="stock-dot stock-in"></span><span class="stock-text-in">In stock</span>';const c=D(s.rating),l=new Date;l.setDate(l.getDate()+3),l.toLocaleDateString("en-KE",{weekday:"short",month:"short",day:"numeric"});const u=t&&r>=15?'<span class="deal-badge">Anniversary deal</span>':"";return s.unitsAvailable,e.innerHTML=`
    ${u}

    <div class="product-title-row">
      <h1 class="product-title">${s.name}</h1>
      <button class="wishlist-btn" aria-label="Add to wishlist" id="wishlist-btn">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </button>
    </div>

    <div class="product-brand">Brand: <a href="/?brand=${encodeURIComponent(s.brand)}">${s.brand}</a> | <a href="/?category=${encodeURIComponent(s.category)}">Similar products from ${s.brand}</a></div>

    <div class="product-price-section">
      <span class="product-current-price">${y(i)}</span>
      ${t?`<span class="product-original-price">${y(s.originalPrice)}</span>`:""}
      ${t?`<span class="product-discount-pct">-${r}%</span>`:""}
    </div>

    <div class="product-stock">${a}</div>

    <div class="product-shipping-line">
      + shipping from <strong>${y(170)}</strong> to your location
    </div>

    <div class="product-rating-section">
      <div class="star-rating">${c}</div>
      <span class="rating-count" id="scroll-to-reviews">(${s.reviewCount} verified ratings)</span>
    </div>

    <div class="product-cart-section" id="product-cart-container"></div>

    <div class="product-promotions">
      <h3>PROMOTIONS</h3>
      <ul>
        <li>Easy and safer payments via the JumiaPay App.</li>
        <li>Free delivery on your first order</li>
        <li>Easy returns within 7 days</li>
        <li>Pay on delivery available</li>
      </ul>
    </div>
  `,requestAnimationFrame(()=>{const d=e.querySelector("#scroll-to-reviews");d&&d.addEventListener("click",()=>{var o;const h=document.querySelector('[data-tab="reviews"]');h&&(h.click(),(o=document.querySelector(".product-details-section"))==null||o.scrollIntoView({behavior:"smooth"}))});const b=e.querySelector("#product-cart-container");L(b);const v=e.querySelector("#wishlist-btn");v&&v.addEventListener("click",()=>{v.classList.toggle("active"),v.classList.contains("active")?(v.querySelector("svg").setAttribute("fill","#E74C3C"),v.querySelector("svg").setAttribute("stroke","#E74C3C"),I("Added to wishlist!","info")):(v.querySelector("svg").setAttribute("fill","none"),v.querySelector("svg").setAttribute("stroke","currentColor"))})}),e}function L(e){if(!e)return;const i=N().find(n=>n.productId===s.id),r=i?i.quantity:0;if(s.unitsAvailable===0){e.innerHTML=`
      <button class="add-to-cart-btn" disabled>
        <span>Out of Stock</span>
      </button>
    `;return}if(r>0){e.innerHTML=`
      <div class="cart-qty-selector">
        <button class="cart-qty-btn" id="cart-qty-minus" aria-label="Decrease quantity">−</button>
        <span class="cart-qty-val" id="cart-qty-value">${r}</span>
        <button class="cart-qty-btn" id="cart-qty-plus" aria-label="Increase quantity">+</button>
      </div>
    `;const n=e.querySelector("#cart-qty-minus"),c=e.querySelector("#cart-qty-plus");n.addEventListener("click",()=>{const l=r-1;x(s.id,l),E(),L(e)}),c.addEventListener("click",()=>{if(r>=s.unitsAvailable){I("Cannot add more items. Stock limit reached!","error");return}const l=r+1;x(s.id,l),E(),L(e)})}else{e.innerHTML=`
      <button class="add-to-cart-btn" id="add-to-cart-btn">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span>Add to cart</span>
      </button>
    `;const n=e.querySelector("#add-to-cart-btn");n.addEventListener("click",()=>{n.disabled=!0,n.innerHTML=`
        <span class="btn-spinner"></span>
        <span>Adding...</span>
      `,setTimeout(()=>{O(s.id,1),E(),L(e)},500)})}}function J(){const e=document.createElement("div");e.className="product-sidebar";const t=U(),i=[...new Set(t.map(o=>o.county||"Nairobi"))].sort(),r=i.includes("Nairobi")?"Nairobi":i[0],a=t.filter(o=>o.county===r),n=i.map(o=>`<option value="${o}" ${o===r?"selected":""}>${o}</option>`).join(""),c=a.map(o=>`<option value="${t.indexOf(o)}">${o.name} (${o.town})</option>`).join(""),l=document.createElement("div");l.className="sidebar-card";const u=new Date;u.setDate(u.getDate()+3);const d=new Date;d.setDate(d.getDate()+5);const b=u.toLocaleDateString("en-KE",{day:"numeric",month:"long"}),v=d.toLocaleDateString("en-KE",{day:"numeric",month:"long"});l.innerHTML=`
    <div class="sidebar-card-header">DELIVERY & RETURNS</div>

    <div class="delivery-location">
      <div class="delivery-location-label">Choose your location</div>
      <div class="delivery-selects">
        <select id="delivery-region" class="delivery-select">
          ${n}
        </select>
        <select id="delivery-station" class="delivery-select">
          ${c}
        </select>
      </div>
    </div>

    <div class="delivery-options" id="delivery-options">
      ${T(a[0]||t[0],b,v)}
    </div>
  `,e.appendChild(l);const h=document.createElement("div");return h.className="sidebar-card",h.innerHTML=`
    <div class="sidebar-card-header">SELLER INFORMATION</div>
    <div class="seller-info">
      <div class="seller-name">Jumia Official Store</div>
      <div class="seller-stats">
        <div class="seller-stat">
          <span class="seller-stat-value">94%</span>
          <span class="seller-stat-label">Seller Score</span>
        </div>
        <div class="seller-stat">
          <span class="seller-stat-value">1.2K</span>
          <span class="seller-stat-label">Followers</span>
        </div>
      </div>
      <button class="seller-follow-btn">Follow</button>
      <div class="seller-performance">
        <div class="seller-perf-row">
          <span class="seller-perf-label">Order Fulfillment Rate</span>
          <span class="seller-perf-value good">Excellent</span>
        </div>
        <div class="seller-perf-row">
          <span class="seller-perf-label">Quality Score</span>
          <span class="seller-perf-value good">Excellent</span>
        </div>
        <div class="seller-perf-row">
          <span class="seller-perf-label">Customer Rating</span>
          <span class="seller-perf-value good">Very Good</span>
        </div>
      </div>
    </div>
  `,e.appendChild(h),requestAnimationFrame(()=>{const o=l.querySelector("#delivery-region"),S=l.querySelector("#delivery-station"),P=l.querySelector("#delivery-options");o.addEventListener("change",f=>{const m=f.target.value,p=t.filter(w=>w.county===m);S.innerHTML=p.map(w=>`<option value="${t.indexOf(w)}">${w.name} (${w.town})</option>`).join("");const $=p[0]||t[0],C=t.indexOf($);S.value=C,M($)}),S.addEventListener("change",f=>{const m=parseInt(f.target.value),p=t[m];M(p)});function M(f){const m=new Date;m.setDate(m.getDate()+2+Math.floor(Math.random()*3));const p=new Date;p.setDate(p.getDate()+4+Math.floor(Math.random()*3));const $=m.toLocaleDateString("en-KE",{day:"numeric",month:"long"}),C=p.toLocaleDateString("en-KE",{day:"numeric",month:"long"});P.innerHTML=T(f,$,C)}const g=h.querySelector(".seller-follow-btn");g&&g.addEventListener("click",()=>{g.classList.toggle("following"),g.textContent=g.classList.contains("following")?"Following":"Follow"})}),e}function T(e,t,i){return e?`
    <div class="delivery-option">
      <div class="delivery-option-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="7" width="15" height="12" rx="1"/><path d="M17 13h3l2 2v4h-5"/><circle cx="7.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>
      </div>
      <div class="delivery-option-info">
        <div class="delivery-option-title">Pickup Station</div>
        <div class="delivery-option-detail">Delivery Fees <strong>${y(e.fee)}</strong></div>
        <div class="delivery-option-date">Ready for pickup between <strong>${t}</strong> and <strong>${i}</strong></div>
        ${e.location?`<div class="delivery-option-location" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.3;">Location: ${e.location}</div>`:""}
      </div>
      <a href="#" class="delivery-option-details-link">Details</a>
    </div>

    <div class="delivery-option">
      <div class="delivery-option-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
      <div class="delivery-option-info">
        <div class="delivery-option-title">Door Delivery</div>
        <div class="delivery-option-detail">Delivery Fees <strong>${y(e.fee+120)}</strong></div>
        <div class="delivery-option-date">Ready for delivery between <strong>${t}</strong> and <strong>${i}</strong></div>
      </div>
      <a href="#" class="delivery-option-details-link">Details</a>
    </div>

    <div class="delivery-return-policy">
      <div class="delivery-option-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
      </div>
      <div class="delivery-option-info">
        <div class="delivery-option-title">Return Policy</div>
        <div class="delivery-option-date">Easy Return, Quick Refund.</div>
      </div>
      <a href="#" class="delivery-option-details-link">Details</a>
    </div>
  `:""}function W(e){const t=document.createElement("div");t.className="product-details-section",t.innerHTML=`
    <div class="product-tabs" role="tablist">
      <button class="product-tab active" data-tab="description" role="tab" aria-selected="true">Product Details</button>
      <button class="product-tab" data-tab="specs" role="tab" aria-selected="false">Specifications</button>
      <button class="product-tab" data-tab="reviews" role="tab" aria-selected="false">Customer Feedback (${s.reviewCount})</button>
    </div>
    <div class="tab-panel active" id="tab-description">${Y()}</div>
    <div class="tab-panel" id="tab-specs">${X()}</div>
    <div class="tab-panel" id="tab-reviews">${Z()}</div>
  `,requestAnimationFrame(()=>{const i=t.querySelectorAll(".product-tab"),r=t.querySelectorAll(".tab-panel");i.forEach(a=>{a.addEventListener("click",()=>{i.forEach(c=>{c.classList.remove("active"),c.setAttribute("aria-selected","false")}),r.forEach(c=>c.classList.remove("active")),a.classList.add("active"),a.setAttribute("aria-selected","true");const n=t.querySelector(`#tab-${a.dataset.tab}`);n&&n.classList.add("active")})})}),e.appendChild(t)}function Y(){return`<div class="product-description">
    <h3>Description</h3>
    <p>${s.description||"No description available for this product."}</p>
    <h3>Key Features</h3>
    <ul>
      <li>Brand: ${s.brand}</li>
      <li>Category: ${s.category}</li>
      <li>Rating: ${s.rating}/5 (${s.reviewCount} reviews)</li>
      ${s.discountedPrice?`<li>Save ${y(s.originalPrice-s.discountedPrice)} today!</li>`:""}
    </ul>
  </div>`}function X(){return`<div class="product-specs">
    <table class="specs-table">
      <tbody>
        <tr><td class="spec-label">SKU</td><td class="spec-value">${s.id.slice(0,12).toUpperCase()}</td></tr>
        <tr><td class="spec-label">Brand</td><td class="spec-value">${s.brand}</td></tr>
        <tr><td class="spec-label">Category</td><td class="spec-value">${s.category}</td></tr>
        <tr><td class="spec-label">Weight (kg)</td><td class="spec-value">1.5</td></tr>
        <tr><td class="spec-label">Color</td><td class="spec-value">As shown</td></tr>
        <tr><td class="spec-label">Main Material</td><td class="spec-value">Standard</td></tr>
        <tr><td class="spec-label">Production Country</td><td class="spec-value">China</td></tr>
        <tr><td class="spec-label">Warranty Type</td><td class="spec-value">Manufacturer</td></tr>
      </tbody>
    </table>
  </div>`}function Z(){const e=s.reviews||[],t=s.rating||0,i=s.reviewCount||0,r=[0,0,0,0,0];return e.forEach(a=>{const n=Math.min(5,Math.max(1,Math.round(a.rating)));r[n-1]++}),`
    <div class="reviews-container">
      <div class="reviews-summary">
        <div class="reviews-summary-header">VERIFIED RATINGS (${i})</div>
        <div class="reviews-summary-score">${t.toFixed(1)}/5</div>
        <div class="reviews-summary-stars">${D(t)}</div>
        <div class="reviews-summary-count">${i} verified ratings</div>
        ${[5,4,3,2,1].map(a=>{const n=r[a-1],c=i>0?n/i*100:0;return`
            <div class="rating-bar-row">
              <span class="rating-bar-label">${a} ★</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${c}%"></div></div>
              <span class="rating-bar-count">(${n})</span>
            </div>
          `}).join("")}
      </div>
      <div class="reviews-list">
        <div class="reviews-list-header">COMMENTS FROM VERIFIED PURCHASES (${e.length})</div>
        ${e.length>0?e.map(a=>_(a)).join(""):'<p style="color: var(--text-muted); font-size: 0.9rem; padding: 20px;">No reviews yet. Be the first to review this product!</p>'}
      </div>
    </div>
  `}function _(e){const t=(e.author||"A").charAt(0).toUpperCase(),i=e.date?new Date(e.date).toLocaleDateString("en-KE",{year:"numeric",month:"short",day:"numeric"}):"";return`
    <div class="review-card">
      <div class="review-card-header">
        <div class="review-stars">${D(e.rating)}</div>
        <span class="review-date">${i}</span>
      </div>
      <div class="review-text">${e.text||""}</div>
      <div class="review-author-line">
        <div class="review-avatar">${t}</div>
        <span class="review-author">${e.author||"Anonymous"}</span>
        <span class="review-verified">✓ Verified Purchase</span>
      </div>
    </div>
  `}function ee(e){const t=j(s.category).filter(a=>a.id!==s.id).slice(0,6);if(t.length===0)return;const i=document.createElement("div");i.className="similar-products-section",i.innerHTML='<h2 class="similar-products-title">Customers who viewed this also viewed</h2>';const r=document.createElement("div");r.className="similar-products-scroll",r.innerHTML=t.map(a=>K(a)).join(""),i.appendChild(r),e.appendChild(i)}function A(){const e=document.getElementById("main-content");e.innerHTML=`
    <div class="product-not-found">
      <span class="nf-emoji">🔍</span>
      <h2>Product Not Found</h2>
      <p>Sorry, we couldn't find the product you're looking for. It may have been removed or the link is incorrect.</p>
      <a href="/">← Back to Shop</a>
    </div>
  `}function D(e){const t=Math.floor(e),i=e-t>=.5;let r="";for(let a=1;a<=5;a++)a<=t||a===t+1&&i?r+='<span class="star-filled">★</span>':r+='<span class="star-empty">☆</span>';return r}
