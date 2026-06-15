import{i as U,g as w,a as f,b as D,c as T,u as V,s as c,d as R,e as O,f as z,h as J,j as K,k as E,l as Y,r as Q,m as W}from"./components-B4wW-AAZ.js";let x="dashboard",p="",g="";document.addEventListener("DOMContentLoaded",()=>{U(),u()});function u(){const t=document.getElementById("admin-app");t.innerHTML=`
    <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <div class="admin-layout">
      ${G()}
      <main class="admin-content" id="admin-content">
        ${N()}
      </main>
    </div>
  `,X(),M()}const _=[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"products",icon:"📦",label:"Products"},{id:"categories",icon:"🏷️",label:"Categories"},{id:"stations",icon:"🚚",label:"Delivery Stations"},{id:"announcements",icon:"📢",label:"Announcements"}];function G(){return`
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">J</div>
        <div class="sidebar-logo-text">
          <span>Jumia</span>
          <span>Admin Panel</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${_.map(t=>`
          <div class="nav-item${x===t.id?" active":""}" data-view="${t.id}">
            <span class="nav-item-icon">${t.icon}</span>
            <span>${t.label}</span>
          </div>
        `).join("")}
      </nav>
      <div class="sidebar-footer">Jumia Admin &copy; ${new Date().getFullYear()}</div>
    </aside>
  `}function X(){document.querySelectorAll(".nav-item").forEach(a=>{a.addEventListener("click",()=>{x=a.dataset.view,p="",g="",u()})});const t=document.getElementById("sidebar-toggle"),e=document.getElementById("admin-sidebar"),s=document.getElementById("sidebar-overlay");t==null||t.addEventListener("click",()=>{e.classList.toggle("open"),s.classList.toggle("visible")}),s==null||s.addEventListener("click",()=>{e.classList.remove("open"),s.classList.remove("visible")})}function N(){switch(x){case"dashboard":return q();case"products":return Z();case"categories":return ne();case"stations":return re();case"announcements":return ce();default:return q()}}function M(){switch(x){case"dashboard":break;case"products":ee();break;case"categories":ie();break;case"stations":de();break;case"announcements":oe();break}}function q(){const t=w(),e=f(),s=D(),a=t.filter(i=>i.unitsAvailable===0).length,n=[...t].sort((i,d)=>new Date(d.createdAt)-new Date(i.createdAt)).slice(0,5);return`
    <div class="content-header">
      <h1>Dashboard</h1>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-card-icon">📦</span>
        <div class="stat-card-number">${t.length}</div>
        <div class="stat-card-label">Total Products</div>
      </div>
      <div class="stat-card">
        <span class="stat-card-icon">🏷️</span>
        <div class="stat-card-number">${e.length}</div>
        <div class="stat-card-label">Total Categories</div>
      </div>
      <div class="stat-card">
        <span class="stat-card-icon">⚠️</span>
        <div class="stat-card-number">${a}</div>
        <div class="stat-card-label">Out of Stock</div>
      </div>
      <div class="stat-card">
        <span class="stat-card-icon">${s!=null&&s.active?"📢":"🔇"}</span>
        <div class="stat-card-number">${s!=null&&s.active?"Active":"None"}</div>
        <div class="stat-card-label">Announcement</div>
      </div>
    </div>

    <div class="section-card">
      <div class="section-card-title">🕒 Recently Added Products</div>
      ${n.length?`
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              ${n.map(i=>{var d;return`
                <tr>
                  <td><img src="${((d=i.images)==null?void 0:d[0])||""}" alt="${r(i.name)}" class="table-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22><rect fill=%22%231E1E3F%22 width=%2250%22 height=%2250%22/><text x=%2225%22 y=%2229%22 fill=%22%236B7280%22 text-anchor=%22middle%22 font-size=%2212%22>N/A</text></svg>'"></td>
                  <td class="table-product-name">${r(i.name)}</td>
                  <td>${r(i.category)}</td>
                  <td>${j(i)}</td>
                  <td>${H(i.unitsAvailable)}</td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>
      `:`
        <div class="empty-state">
          <span class="empty-state-icon">📦</span>
          <div class="empty-state-text">No products yet</div>
          <div class="empty-state-sub">Add products to see them here</div>
        </div>
      `}
    </div>
  `}function Z(){const t=f();let e=w();if(p){const s=p.toLowerCase();e=e.filter(a=>{var n;return a.name.toLowerCase().includes(s)||((n=a.brand)==null?void 0:n.toLowerCase().includes(s))||a.category.toLowerCase().includes(s)})}return g&&(e=e.filter(s=>s.category===g)),`
    <div class="content-header">
      <h1>Products</h1>
      <button class="btn-primary" id="btn-add-product">+ Add Product</button>
    </div>
    <div class="filter-bar">
      <div class="search-wrapper">
        <input type="text" class="search-input form-input" id="product-search" placeholder="Search products..." value="${r(p)}">
      </div>
      <select class="form-select" id="product-category-filter">
        <option value="">All Categories</option>
        ${t.map(s=>`<option value="${r(s)}"${g===s?" selected":""}>${r(s)}</option>`).join("")}
      </select>
    </div>

    ${e.length?`
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${e.map(s=>{var a;return`
              <tr>
                <td><img src="${((a=s.images)==null?void 0:a[0])||""}" alt="${r(s.name)}" class="table-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22><rect fill=%22%231E1E3F%22 width=%2250%22 height=%2250%22/><text x=%2225%22 y=%2229%22 fill=%22%236B7280%22 text-anchor=%22middle%22 font-size=%2212%22>N/A</text></svg>'"></td>
                <td class="table-product-name">${r(s.name)}</td>
                <td>${r(s.category)}</td>
                <td>${j(s)}</td>
                <td>${H(s.unitsAvailable)}</td>
                <td>
                  <div class="table-actions">
                    <button class="btn-icon btn-icon-edit" data-edit="${s.id}" title="Edit">✏️</button>
                    <button class="btn-icon btn-icon-danger" data-delete="${s.id}" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
          </tbody>
        </table>
      </div>
    `:`
      <div class="admin-table-wrapper">
        <div class="empty-state">
          <span class="empty-state-icon">📦</span>
          <div class="empty-state-text">No products found</div>
          <div class="empty-state-sub">${p||g?"Try adjusting your search or filter":'Click "Add Product" to get started'}</div>
        </div>
      </div>
    `}
  `}function ee(){var t,e,s;(t=document.getElementById("btn-add-product"))==null||t.addEventListener("click",()=>C()),(e=document.getElementById("product-search"))==null||e.addEventListener("input",a=>{p=a.target.value,I()}),(s=document.getElementById("product-category-filter"))==null||s.addEventListener("change",a=>{g=a.target.value,I()}),document.querySelectorAll("[data-edit]").forEach(a=>{a.addEventListener("click",()=>C(a.dataset.edit))}),document.querySelectorAll("[data-delete]").forEach(a=>{a.addEventListener("click",()=>se(a.dataset.delete))})}function C(t=null){var d;const e=t?T(t):null,s=f(),a=!!e,n=(d=e==null?void 0:e.images)!=null&&d.length?[...e.images]:["","",""];for(;n.length<3;)n.push("");const i=`
    <div class="modal-overlay" id="product-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${a?"Edit Product":"Add Product"}</h2>
          <button class="modal-close" id="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="product-form" novalidate>
            <div class="form-group">
              <label>Product Name <span class="required">*</span></label>
              <input type="text" class="form-input" id="pf-name" placeholder="Enter product name" value="${r((e==null?void 0:e.name)||"")}" required>
              <div class="form-error" id="err-name"></div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Category <span class="required">*</span></label>
                <select class="form-select" id="pf-category" required>
                  <option value="">Select category</option>
                  ${s.map(o=>`<option value="${r(o)}"${(e==null?void 0:e.category)===o?" selected":""}>${r(o)}</option>`).join("")}
                </select>
                <div class="form-error" id="err-category"></div>
              </div>
              <div class="form-group">
                <label>Brand</label>
                <input type="text" class="form-input" id="pf-brand" placeholder="e.g. Samsung" value="${r((e==null?void 0:e.brand)||"")}">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Original Price (KSh) <span class="required">*</span></label>
                <input type="number" class="form-input" id="pf-price" placeholder="0" min="1" value="${(e==null?void 0:e.originalPrice)||""}" required>
                <div class="form-error" id="err-price"></div>
              </div>
              <div class="form-group">
                <label>Discounted Price (KSh)</label>
                <input type="number" class="form-input" id="pf-discount-price" placeholder="Leave empty for no discount" min="0" value="${(e==null?void 0:e.discountedPrice)||""}">
              </div>
            </div>

            <div class="form-group">
              <label>Units Available <span class="required">*</span></label>
              <input type="number" class="form-input" id="pf-units" placeholder="0" min="0" value="${(e==null?void 0:e.unitsAvailable)??""}" required>
              <div class="form-error" id="err-units"></div>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea class="form-textarea" id="pf-description" placeholder="Product description...">${r((e==null?void 0:e.description)||"")}</textarea>
            </div>

            <div class="form-group">
              <label>Images <span class="required">*</span> (minimum 3)</label>
              <div class="image-inputs-section" id="image-inputs">
                ${n.map((o,l)=>L(o,l)).join("")}
              </div>
              <div class="form-error" id="err-images"></div>
              <div class="image-upload-row" style="margin-top: 10px;">
                <button type="button" class="btn-add-image" id="btn-add-image-url">+ Add Another Image</button>
                <label class="file-upload-label">
                  📁 Upload File
                  <input type="file" accept="image/*" multiple id="file-upload-input">
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" id="modal-cancel">Cancel</button>
          <button class="btn-primary" id="modal-save">${a?"Update Product":"Add Product"}</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",i),te(t)}function L(t,e){const s=t&&t.trim();return`
    <div class="image-input-row" data-image-index="${e}">
      <input type="text" class="form-input image-url-input" placeholder="https://example.com/image.jpg" value="${r(t||"")}" data-img-idx="${e}">
      ${s?`<img src="${r(t)}" class="image-preview-thumb" onerror="this.outerHTML='<div class=\\'image-preview-placeholder\\'>⚠️</div>'">`:'<div class="image-preview-placeholder">🖼️</div>'}
      ${e>=3?`<button type="button" class="btn-remove-image" data-remove-img="${e}">&times;</button>`:""}
    </div>
  `}function te(t){const e=document.getElementById("product-modal");if(!e)return;const s=()=>{e.classList.add("closing"),setTimeout(()=>e.remove(),200)};e.querySelector("#modal-close").addEventListener("click",s),e.querySelector("#modal-cancel").addEventListener("click",s),e.addEventListener("click",a=>{a.target===e&&s()}),e.addEventListener("input",a=>{a.target.classList.contains("image-url-input")&&B(a.target)}),e.addEventListener("blur",a=>{a.target.classList.contains("image-url-input")&&B(a.target)},!0),e.querySelector("#btn-add-image-url").addEventListener("click",()=>{const a=e.querySelector("#image-inputs"),n=a.querySelectorAll(".image-input-row").length;a.insertAdjacentHTML("beforeend",L("",n)),S(e)}),e.querySelector("#file-upload-input").addEventListener("change",a=>{Array.from(a.target.files).forEach(i=>{const d=new FileReader;d.onload=()=>{const o=e.querySelector("#image-inputs"),l=o.querySelectorAll(".image-input-row").length;o.insertAdjacentHTML("beforeend",L(d.result,l)),S(e)},d.readAsDataURL(i)}),a.target.value=""}),S(e),e.querySelector("#modal-save").addEventListener("click",()=>{ae(e,t)})}function S(t){t.querySelectorAll("[data-remove-img]").forEach(e=>{e.onclick=()=>{e.closest(".image-input-row").remove()}})}function B(t){const e=t.closest(".image-input-row"),s=t.value.trim(),a=e.querySelector(".image-preview-thumb"),n=e.querySelector(".image-preview-placeholder");if(s){if(a)a.src=s;else if(n){const i=document.createElement("img");i.src=s,i.className="image-preview-thumb",i.onerror=function(){this.outerHTML='<div class="image-preview-placeholder">⚠️</div>'},n.replaceWith(i)}}else a&&(a.outerHTML='<div class="image-preview-placeholder">🖼️</div>')}function ae(t,e){const s=t.querySelector("#pf-name").value.trim(),a=t.querySelector("#pf-category").value,n=t.querySelector("#pf-brand").value.trim(),i=parseFloat(t.querySelector("#pf-price").value),d=t.querySelector("#pf-discount-price").value.trim(),o=d?parseFloat(d):null,l=parseInt(t.querySelector("#pf-units").value,10),h=t.querySelector("#pf-description").value.trim(),$=t.querySelectorAll(".image-url-input"),A=Array.from($).map(y=>y.value.trim()).filter(Boolean);let v=!0;const m=(y,F)=>{const P=t.querySelector(`#${y}`);P&&(P.textContent=F)},b=y=>m(y,"");if(b("err-name"),b("err-category"),b("err-price"),b("err-units"),b("err-images"),s||(m("err-name","Product name is required"),v=!1),a||(m("err-category","Category is required"),v=!1),(!i||i<=0)&&(m("err-price","Price must be a positive number"),v=!1),(isNaN(l)||l<0)&&(m("err-units","Units must be 0 or more"),v=!1),A.length<3&&(m("err-images",`At least 3 images required (${A.length} provided)`),v=!1),!v)return;const k={name:s,category:a,brand:n,originalPrice:i,discountedPrice:o,unitsAvailable:l,description:h,images:A};e?(V(e,k),c("Product updated successfully","success")):(R(k),c("Product added successfully","success")),t.classList.add("closing"),setTimeout(()=>{t.remove(),u()},200)}function se(t){const e=T(t);if(!e)return;const s=`
    <div class="modal-overlay" id="delete-modal">
      <div class="modal-content" style="max-width:440px">
        <div class="modal-header">
          <h2>Delete Product</h2>
          <button class="modal-close" id="delete-modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="delete-confirm-body">
            <span class="delete-confirm-icon">🗑️</span>
            <div class="delete-confirm-text">
              Are you sure you want to delete<br>
              <span class="delete-confirm-name">"${r(e.name)}"</span>?<br>
              <span style="font-size:13px; color:var(--text-muted)">This action cannot be undone.</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" id="delete-cancel">Cancel</button>
          <button class="btn-danger" id="delete-confirm">Delete</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",s);const a=document.getElementById("delete-modal"),n=()=>{a.classList.add("closing"),setTimeout(()=>a.remove(),200)};a.querySelector("#delete-modal-close").addEventListener("click",n),a.querySelector("#delete-cancel").addEventListener("click",n),a.addEventListener("click",i=>{i.target===a&&n()}),a.querySelector("#delete-confirm").addEventListener("click",()=>{O(t),c("Product deleted","success"),a.classList.add("closing"),setTimeout(()=>{a.remove(),u()},200)})}function ne(){const t=f(),e=w(),s=a=>e.filter(n=>n.category===a).length;return`
    <div class="content-header">
      <h1>Categories</h1>
    </div>
    <div class="section-card">
      <div class="section-card-title">➕ Add New Category</div>
      <div class="add-form-inline">
        <input type="text" class="form-input" id="new-category-input" placeholder="Enter category name">
        <button class="btn-primary btn-sm" id="btn-add-category">Add Category</button>
      </div>
    </div>

    <div class="categories-list">
      ${t.length?t.map(a=>{const n=s(a);return`
          <div class="category-item">
            <div class="category-item-name">
              🏷️ ${r(a)}
              <span class="category-item-count">${n} product${n!==1?"s":""}</span>
            </div>
            <button class="btn-icon btn-icon-danger" data-delete-cat="${r(a)}" title="Delete category">&times;</button>
          </div>
        `}).join(""):`
        <div class="empty-state">
          <span class="empty-state-icon">🏷️</span>
          <div class="empty-state-text">No categories yet</div>
          <div class="empty-state-sub">Add your first category above</div>
        </div>
      `}
    </div>
  `}function ie(){var t,e;(t=document.getElementById("btn-add-category"))==null||t.addEventListener("click",()=>{const s=document.getElementById("new-category-input"),a=s==null?void 0:s.value.trim();if(!a){c("Please enter a category name","error");return}if(f().map(i=>i.toLowerCase()).includes(a.toLowerCase())){c("Category already exists","error");return}z(a),c(`Category "${a}" added`,"success"),u()}),(e=document.getElementById("new-category-input"))==null||e.addEventListener("keydown",s=>{var a;s.key==="Enter"&&((a=document.getElementById("btn-add-category"))==null||a.click())}),document.querySelectorAll("[data-delete-cat]").forEach(s=>{s.addEventListener("click",()=>{const a=s.dataset.deleteCat,n=w().filter(i=>i.category===a);if(n.length>0){c(`Cannot delete "${a}" — ${n.length} product(s) still in this category`,"error");return}J(a),c(`Category "${a}" deleted`,"success"),u()})})}function re(){const t=K();return`
    <div class="content-header">
      <h1>Delivery Stations</h1>
    </div>
    <div class="section-card">
      <div class="section-card-title">➕ Add New Station</div>
      <div class="add-station-form">
        <div class="form-group">
          <label>Station Name</label>
          <input type="text" class="form-input" id="station-name" placeholder="e.g. CBD Pickup Point">
        </div>
        <div class="form-group">
          <label>Area</label>
          <input type="text" class="form-input" id="station-area" placeholder="e.g. Nairobi CBD">
        </div>
        <div class="form-group">
          <label>Delivery Fee (KSh)</label>
          <input type="number" class="form-input" id="station-fee" placeholder="0" min="0">
        </div>
        <button class="btn-primary btn-sm" id="btn-add-station" style="align-self: flex-end; height: 40px;">Add Station</button>
      </div>
    </div>

    ${t.length?`
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Area</th>
              <th>Delivery Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${t.map((e,s)=>`
              <tr>
                <td class="table-product-name">${r(e.name)}</td>
                <td>${r(e.area)}</td>
                <td class="table-price">${E(e.fee)}</td>
                <td>
                  <button class="btn-icon btn-icon-danger" data-delete-station="${s}" title="Delete station">🗑️</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `:`
      <div class="admin-table-wrapper">
        <div class="empty-state">
          <span class="empty-state-icon">🚚</span>
          <div class="empty-state-text">No delivery stations yet</div>
          <div class="empty-state-sub">Add your first station above</div>
        </div>
      </div>
    `}
  `}function de(){var t;(t=document.getElementById("btn-add-station"))==null||t.addEventListener("click",()=>{var n,i,d;const e=(n=document.getElementById("station-name"))==null?void 0:n.value.trim(),s=(i=document.getElementById("station-area"))==null?void 0:i.value.trim(),a=parseFloat((d=document.getElementById("station-fee"))==null?void 0:d.value);if(!e||!s){c("Station name and area are required","error");return}if(isNaN(a)||a<0){c("Please enter a valid delivery fee","error");return}Y({name:e,area:s,fee:a}),c(`Station "${e}" added`,"success"),u()}),document.querySelectorAll("[data-delete-station]").forEach(e=>{e.addEventListener("click",()=>{const s=parseInt(e.dataset.deleteStation,10);Q(s),c("Station removed","success"),u()})})}function ce(){const t=D(),e=(t==null?void 0:t.text)||"",s=(t==null?void 0:t.active)??!1,a=(t==null?void 0:t.link)||"";return`
    <div class="content-header">
      <h1>Announcements</h1>
    </div>

    ${e?`
      <div class="announcement-current">
        <div class="announcement-current-label">Current Announcement</div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
          <span class="announcement-status ${s?"active":"inactive"}">
            <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span>
            ${s?"Active":"Inactive"}
          </span>
        </div>
        <div class="announcement-current-text">${r(e)}</div>
        ${a?`<div style="margin-top:6px;font-size:13px;color:var(--text-muted);">Link: <a href="${r(a)}" style="color:var(--accent-primary)">${r(a)}</a></div>`:""}
      </div>
    `:""}

    <div class="section-card">
      <div class="section-card-title">✏️ ${e?"Update":"Set"} Announcement</div>
      <div class="form-group">
        <label>Announcement Text</label>
        <textarea class="form-textarea" id="ann-text" placeholder="Enter announcement text...">${r(e)}</textarea>
      </div>
      <div class="form-group">
        <label>Link URL (optional)</label>
        <input type="text" class="form-input" id="ann-link" placeholder="https://..." value="${r(a)}">
      </div>
      <div class="form-group">
        <div class="toggle-row">
          <label class="toggle-switch">
            <input type="checkbox" id="ann-active" ${s?"checked":""}>
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label">Active</span>
        </div>
      </div>
      <button class="btn-primary" id="btn-save-announcement">Save Announcement</button>
    </div>

    <div class="announcement-preview">
      <div class="announcement-preview-label">Preview</div>
      <div class="announcement-preview-bar" id="ann-preview-bar" style="${s?"":"opacity:0.4"}">
        📢 <span id="ann-preview-text">${r(e)||"Your announcement will appear here"}</span>
      </div>
    </div>
  `}function oe(){var n;const t=document.getElementById("ann-text"),e=document.getElementById("ann-preview-text"),s=document.getElementById("ann-preview-bar"),a=document.getElementById("ann-active");t==null||t.addEventListener("input",()=>{e&&(e.textContent=t.value||"Your announcement will appear here")}),a==null||a.addEventListener("change",()=>{s&&(s.style.opacity=a.checked?"1":"0.4")}),(n=document.getElementById("btn-save-announcement"))==null||n.addEventListener("click",()=>{var l,h,$;const i=(l=document.getElementById("ann-text"))==null?void 0:l.value.trim(),d=(h=document.getElementById("ann-link"))==null?void 0:h.value.trim(),o=(($=document.getElementById("ann-active"))==null?void 0:$.checked)??!1;W({text:i,link:d,active:o}),c("Announcement saved","success"),u()})}function I(){const t=document.getElementById("admin-content");t&&(t.innerHTML=N(),M())}function j(t){return t.discountedPrice!=null&&t.discountedPrice<t.originalPrice?`<span class="table-price">${E(t.discountedPrice)}</span><span class="table-price-original">${E(t.originalPrice)}</span>`:`<span class="table-price">${E(t.originalPrice)}</span>`}function H(t){return t===0?'<span class="stock-badge out-of-stock"><span class="stock-dot"></span>Out of stock</span>':t<=10?`<span class="stock-badge low-stock"><span class="stock-dot"></span>${t} left</span>`:`<span class="stock-badge in-stock"><span class="stock-dot"></span>${t} in stock</span>`}function r(t){if(!t)return"";const e=document.createElement("div");return e.textContent=t,e.innerHTML}
