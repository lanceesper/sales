import {
  initStore,
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addCategory,
  deleteCategory,
  getDeliveryStations,
  addDeliveryStation,
  removeDeliveryStation,
  getAnnouncement,
  setAnnouncement,
  formatPrice,
  calculateDiscount
} from '/js/store.js';

import { showToast } from '/js/components.js';

/* ============================================================
   State
   ============================================================ */
let activeView = 'dashboard';
let productSearchQuery = '';
let productCategoryFilter = '';

/* ============================================================
   Bootstrap
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  await initStore();
  render();

  window.addEventListener('storeUpdated', () => {
    // Only re-render if no modals are open to avoid losing input state
    if (!document.getElementById('product-modal') && !document.getElementById('delete-modal')) {
      render();
    }
  });
});

/* ============================================================
   Top-level Render
   ============================================================ */
function render() {
  const app = document.getElementById('admin-app');
  app.innerHTML = `
    <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <div class="admin-layout">
      ${renderSidebar()}
      <main class="admin-content" id="admin-content">
        ${renderView()}
      </main>
    </div>
  `;
  bindSidebarEvents();
  bindViewEvents();
}

/* ============================================================
   Sidebar
   ============================================================ */
const NAV_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'products', icon: '📦', label: 'Products' },
  { id: 'categories', icon: '🏷️', label: 'Categories' },
  { id: 'stations', icon: '🚚', label: 'Delivery Stations' },
  { id: 'announcements', icon: '📢', label: 'Announcements' },
];

function renderSidebar() {
  return `
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">J</div>
        <div class="sidebar-logo-text">
          <span>Jumia</span>
          <span>Admin Panel</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${NAV_ITEMS.map(item => `
          <div class="nav-item${activeView === item.id ? ' active' : ''}" data-view="${item.id}">
            <span class="nav-item-icon">${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">Jumia Admin &copy; ${new Date().getFullYear()}</div>
    </aside>
  `;
}

function bindSidebarEvents() {
  // Nav items
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      activeView = el.dataset.view;
      productSearchQuery = '';
      productCategoryFilter = '';
      render();
    });
  });

  // Mobile toggle
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });
}

/* ============================================================
   View Router
   ============================================================ */
function renderView() {
  switch (activeView) {
    case 'dashboard': return renderDashboard();
    case 'products': return renderProducts();
    case 'categories': return renderCategoriesView();
    case 'stations': return renderStationsView();
    case 'announcements': return renderAnnouncementsView();
    default: return renderDashboard();
  }
}

function bindViewEvents() {
  switch (activeView) {
    case 'dashboard': bindDashboardEvents(); break;
    case 'products': bindProductsEvents(); break;
    case 'categories': bindCategoriesEvents(); break;
    case 'stations': bindStationsEvents(); break;
    case 'announcements': bindAnnouncementsEvents(); break;
  }
}

/* ============================================================
   Dashboard View
   ============================================================ */
function renderDashboard() {
  const products = getProducts();
  const categories = getCategories();
  const announcement = getAnnouncement();
  const outOfStock = products.filter(p => p.unitsAvailable === 0).length;
  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return `
    <div class="content-header">
      <h1>Dashboard</h1>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-card-icon">📦</span>
        <div class="stat-card-number">${products.length}</div>
        <div class="stat-card-label">Total Products</div>
      </div>
      <div class="stat-card">
        <span class="stat-card-icon">🏷️</span>
        <div class="stat-card-number">${categories.length}</div>
        <div class="stat-card-label">Total Categories</div>
      </div>
      <div class="stat-card">
        <span class="stat-card-icon">⚠️</span>
        <div class="stat-card-number">${outOfStock}</div>
        <div class="stat-card-label">Out of Stock</div>
      </div>
      <div class="stat-card">
        <span class="stat-card-icon">${announcement?.active ? '📢' : '🔇'}</span>
        <div class="stat-card-number">${announcement?.active ? 'Active' : 'None'}</div>
        <div class="stat-card-label">Announcement</div>
      </div>
    </div>

    <div class="section-card">
      <div class="section-card-title">🕒 Recently Added Products</div>
      ${recentProducts.length ? `
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
              ${recentProducts.map(p => `
                <tr>
                  <td><img src="${p.images?.[0] || ''}" alt="${escapeHtml(p.name)}" class="table-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22><rect fill=%22%231E1E3F%22 width=%2250%22 height=%2250%22/><text x=%2225%22 y=%2229%22 fill=%22%236B7280%22 text-anchor=%22middle%22 font-size=%2212%22>N/A</text></svg>'"></td>
                  <td class="table-product-name">${escapeHtml(p.name)}</td>
                  <td>${escapeHtml(p.category)}</td>
                  <td>${renderPrice(p)}</td>
                  <td>${renderStockBadge(p.unitsAvailable)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty-state">
          <span class="empty-state-icon">📦</span>
          <div class="empty-state-text">No products yet</div>
          <div class="empty-state-sub">Add products to see them here</div>
        </div>
      `}
    </div>
  `;
}

function bindDashboardEvents() { /* Static view, no events */ }

/* ============================================================
   Products View
   ============================================================ */
function renderProducts() {
  const categories = getCategories();
  let products = getProducts();

  if (productSearchQuery) {
    const q = productSearchQuery.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (productCategoryFilter) {
    products = products.filter(p => p.category === productCategoryFilter);
  }

  return `
    <div class="content-header">
      <h1>Products</h1>
      <button class="btn-primary" id="btn-add-product">+ Add Product</button>
    </div>
    <div class="filter-bar">
      <div class="search-wrapper">
        <input type="text" class="search-input form-input" id="product-search" placeholder="Search products..." value="${escapeHtml(productSearchQuery)}">
      </div>
      <select class="form-select" id="product-category-filter">
        <option value="">All Categories</option>
        ${categories.map(c => `<option value="${escapeHtml(c)}"${productCategoryFilter === c ? ' selected' : ''}>${escapeHtml(c)}</option>`).join('')}
      </select>
    </div>

    ${products.length ? `
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
            ${products.map(p => `
              <tr>
                <td><img src="${p.images?.[0] || ''}" alt="${escapeHtml(p.name)}" class="table-thumb" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22><rect fill=%22%231E1E3F%22 width=%2250%22 height=%2250%22/><text x=%2225%22 y=%2229%22 fill=%22%236B7280%22 text-anchor=%22middle%22 font-size=%2212%22>N/A</text></svg>'"></td>
                <td class="table-product-name">${escapeHtml(p.name)}</td>
                <td>${escapeHtml(p.category)}</td>
                <td>${renderPrice(p)}</td>
                <td>${renderStockBadge(p.unitsAvailable)}</td>
                <td>
                  <div class="table-actions">
                    <button class="btn-icon btn-icon-edit" data-edit="${p.id}" title="Edit">✏️</button>
                    <button class="btn-icon btn-icon-danger" data-delete="${p.id}" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : `
      <div class="admin-table-wrapper">
        <div class="empty-state">
          <span class="empty-state-icon">📦</span>
          <div class="empty-state-text">No products found</div>
          <div class="empty-state-sub">${productSearchQuery || productCategoryFilter ? 'Try adjusting your search or filter' : 'Click "Add Product" to get started'}</div>
        </div>
      </div>
    `}
  `;
}

function bindProductsEvents() {
  document.getElementById('btn-add-product')?.addEventListener('click', () => openProductModal());

  document.getElementById('product-search')?.addEventListener('input', (e) => {
    productSearchQuery = e.target.value;
    refreshContent();
  });

  document.getElementById('product-category-filter')?.addEventListener('change', (e) => {
    productCategoryFilter = e.target.value;
    refreshContent();
  });

  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openProductModal(btn.dataset.edit));
  });

  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal(btn.dataset.delete));
  });
}

/* ============================================================
   Product Modal (Add/Edit)
   ============================================================ */
function openProductModal(productId = null) {
  const product = productId ? getProductById(productId) : null;
  const categories = getCategories();
  const isEdit = !!product;

  const imageUrls = product?.images?.length ? [...product.images] : ['', '', ''];
  while (imageUrls.length < 3) imageUrls.push('');

  const modalHtml = `
    <div class="modal-overlay" id="product-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${isEdit ? 'Edit Product' : 'Add Product'}</h2>
          <button class="modal-close" id="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="product-form" novalidate>
            <div class="form-group">
              <label>Product Name <span class="required">*</span></label>
              <input type="text" class="form-input" id="pf-name" placeholder="Enter product name" value="${escapeHtml(product?.name || '')}" required>
              <div class="form-error" id="err-name"></div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Category <span class="required">*</span></label>
                <select class="form-select" id="pf-category" required>
                  <option value="">Select category</option>
                  ${categories.map(c => `<option value="${escapeHtml(c)}"${product?.category === c ? ' selected' : ''}>${escapeHtml(c)}</option>`).join('')}
                </select>
                <div class="form-error" id="err-category"></div>
              </div>
              <div class="form-group">
                <label>Brand</label>
                <input type="text" class="form-input" id="pf-brand" placeholder="e.g. Samsung" value="${escapeHtml(product?.brand || '')}">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Original Price (KSh) <span class="required">*</span></label>
                <input type="number" class="form-input" id="pf-price" placeholder="0" min="1" value="${product?.originalPrice || ''}" required>
                <div class="form-error" id="err-price"></div>
              </div>
              <div class="form-group">
                <label>Discounted Price (KSh)</label>
                <input type="number" class="form-input" id="pf-discount-price" placeholder="Leave empty for no discount" min="0" value="${product?.discountedPrice || ''}">
              </div>
            </div>

            <div class="form-group">
              <label>Units Available <span class="required">*</span></label>
              <input type="number" class="form-input" id="pf-units" placeholder="0" min="0" value="${product?.unitsAvailable ?? ''}" required>
              <div class="form-error" id="err-units"></div>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea class="form-textarea" id="pf-description" placeholder="Product description...">${escapeHtml(product?.description || '')}</textarea>
            </div>

            <div class="form-group">
              <label>Images <span class="required">*</span> (minimum 3)</label>
              <div class="image-inputs-section" id="image-inputs">
                ${imageUrls.map((url, i) => renderImageInputRow(url, i)).join('')}
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
          <button class="btn-primary" id="modal-save">${isEdit ? 'Update Product' : 'Add Product'}</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  bindProductModalEvents(productId);
}

function renderImageInputRow(url, index) {
  const hasUrl = url && url.trim();
  return `
    <div class="image-input-row" data-image-index="${index}">
      <input type="text" class="form-input image-url-input" placeholder="https://example.com/image.jpg" value="${escapeHtml(url || '')}" data-img-idx="${index}">
      ${hasUrl
        ? `<img src="${escapeHtml(url)}" class="image-preview-thumb" onerror="this.outerHTML='<div class=\\'image-preview-placeholder\\'>⚠️</div>'">`
        : `<div class="image-preview-placeholder">🖼️</div>`}
      ${index >= 3 ? `<button type="button" class="btn-remove-image" data-remove-img="${index}">&times;</button>` : ''}
    </div>
  `;
}

function bindProductModalEvents(productId) {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  const closeModal = () => {
    modal.classList.add('closing');
    setTimeout(() => modal.remove(), 200);
  };

  modal.querySelector('#modal-close').addEventListener('click', closeModal);
  modal.querySelector('#modal-cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Image URL preview on blur/input
  modal.addEventListener('input', (e) => {
    if (e.target.classList.contains('image-url-input')) {
      updateImagePreview(e.target);
    }
  });

  modal.addEventListener('blur', (e) => {
    if (e.target.classList.contains('image-url-input')) {
      updateImagePreview(e.target);
    }
  }, true);

  // Add another image input
  modal.querySelector('#btn-add-image-url').addEventListener('click', () => {
    const container = modal.querySelector('#image-inputs');
    const currentCount = container.querySelectorAll('.image-input-row').length;
    container.insertAdjacentHTML('beforeend', renderImageInputRow('', currentCount));
    rebindRemoveButtons(modal);
  });

  // File upload
  modal.querySelector('#file-upload-input').addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const container = modal.querySelector('#image-inputs');
        const currentCount = container.querySelectorAll('.image-input-row').length;
        container.insertAdjacentHTML('beforeend', renderImageInputRow(reader.result, currentCount));
        rebindRemoveButtons(modal);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  });

  rebindRemoveButtons(modal);

  // Save
  modal.querySelector('#modal-save').addEventListener('click', () => {
    saveProduct(modal, productId);
  });
}

function rebindRemoveButtons(modal) {
  modal.querySelectorAll('[data-remove-img]').forEach(btn => {
    btn.onclick = () => {
      btn.closest('.image-input-row').remove();
    };
  });
}

function updateImagePreview(input) {
  const row = input.closest('.image-input-row');
  const url = input.value.trim();
  const existingImg = row.querySelector('.image-preview-thumb');
  const existingPlaceholder = row.querySelector('.image-preview-placeholder');

  if (url) {
    if (existingImg) {
      existingImg.src = url;
    } else if (existingPlaceholder) {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'image-preview-thumb';
      img.onerror = function() { this.outerHTML = '<div class="image-preview-placeholder">⚠️</div>'; };
      existingPlaceholder.replaceWith(img);
    }
  } else {
    if (existingImg) {
      existingImg.outerHTML = '<div class="image-preview-placeholder">🖼️</div>';
    }
  }
}

function saveProduct(modal, productId) {
  // Gather values
  const name = modal.querySelector('#pf-name').value.trim();
  const category = modal.querySelector('#pf-category').value;
  const brand = modal.querySelector('#pf-brand').value.trim();
  const originalPrice = parseFloat(modal.querySelector('#pf-price').value);
  const discountPriceVal = modal.querySelector('#pf-discount-price').value.trim();
  const discountedPrice = discountPriceVal ? parseFloat(discountPriceVal) : null;
  const unitsAvailable = parseInt(modal.querySelector('#pf-units').value, 10);
  const description = modal.querySelector('#pf-description').value.trim();

  const imageInputs = modal.querySelectorAll('.image-url-input');
  const images = Array.from(imageInputs).map(i => i.value.trim()).filter(Boolean);

  // Validate
  let valid = true;

  const setErr = (id, msg) => {
    const el = modal.querySelector(`#${id}`);
    if (el) el.textContent = msg;
  };
  const clearErr = (id) => setErr(id, '');

  clearErr('err-name');
  clearErr('err-category');
  clearErr('err-price');
  clearErr('err-units');
  clearErr('err-images');

  if (!name) { setErr('err-name', 'Product name is required'); valid = false; }
  if (!category) { setErr('err-category', 'Category is required'); valid = false; }
  if (!originalPrice || originalPrice <= 0) { setErr('err-price', 'Price must be a positive number'); valid = false; }
  if (isNaN(unitsAvailable) || unitsAvailable < 0) { setErr('err-units', 'Units must be 0 or more'); valid = false; }
  if (images.length < 3) { setErr('err-images', `At least 3 images required (${images.length} provided)`); valid = false; }

  if (!valid) return;

  const productData = {
    name,
    category,
    brand,
    originalPrice,
    discountedPrice,
    unitsAvailable,
    description,
    images,
  };

  if (productId) {
    updateProduct(productId, productData);
    showToast('Product updated successfully', 'success');
  } else {
    addProduct(productData);
    showToast('Product added successfully', 'success');
  }

  modal.classList.add('closing');
  setTimeout(() => {
    modal.remove();
    render();
  }, 200);
}

/* ============================================================
   Delete Confirmation Modal
   ============================================================ */
function openDeleteModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const html = `
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
              <span class="delete-confirm-name">"${escapeHtml(product.name)}"</span>?<br>
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
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  const modal = document.getElementById('delete-modal');

  const closeModal = () => {
    modal.classList.add('closing');
    setTimeout(() => modal.remove(), 200);
  };

  modal.querySelector('#delete-modal-close').addEventListener('click', closeModal);
  modal.querySelector('#delete-cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  modal.querySelector('#delete-confirm').addEventListener('click', () => {
    deleteProduct(productId);
    showToast('Product deleted', 'success');
    modal.classList.add('closing');
    setTimeout(() => {
      modal.remove();
      render();
    }, 200);
  });
}

/* ============================================================
   Categories View
   ============================================================ */
function renderCategoriesView() {
  const categories = getCategories();
  const products = getProducts();

  const categoryProductCount = (cat) => products.filter(p => p.category === cat).length;

  return `
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
      ${categories.length ? categories.map(cat => {
        const count = categoryProductCount(cat);
        return `
          <div class="category-item">
            <div class="category-item-name">
              🏷️ ${escapeHtml(cat)}
              <span class="category-item-count">${count} product${count !== 1 ? 's' : ''}</span>
            </div>
            <button class="btn-icon btn-icon-danger" data-delete-cat="${escapeHtml(cat)}" title="Delete category">&times;</button>
          </div>
        `;
      }).join('') : `
        <div class="empty-state">
          <span class="empty-state-icon">🏷️</span>
          <div class="empty-state-text">No categories yet</div>
          <div class="empty-state-sub">Add your first category above</div>
        </div>
      `}
    </div>
  `;
}

function bindCategoriesEvents() {
  document.getElementById('btn-add-category')?.addEventListener('click', () => {
    const input = document.getElementById('new-category-input');
    const name = input?.value.trim();
    if (!name) {
      showToast('Please enter a category name', 'error');
      return;
    }
    const existing = getCategories();
    if (existing.map(c => c.toLowerCase()).includes(name.toLowerCase())) {
      showToast('Category already exists', 'error');
      return;
    }
    addCategory(name);
    showToast(`Category "${name}" added`, 'success');
    render();
  });

  document.getElementById('new-category-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-add-category')?.click();
  });

  document.querySelectorAll('[data-delete-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.deleteCat;
      const products = getProducts().filter(p => p.category === cat);
      if (products.length > 0) {
        showToast(`Cannot delete "${cat}" — ${products.length} product(s) still in this category`, 'error');
        return;
      }
      deleteCategory(cat);
      showToast(`Category "${cat}" deleted`, 'success');
      render();
    });
  });
}

/* ============================================================
   Delivery Stations View
   ============================================================ */
function renderStationsView() {
  const stations = getDeliveryStations();

  return `
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

    ${stations.length ? `
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
            ${stations.map((s, i) => `
              <tr>
                <td class="table-product-name">${escapeHtml(s.name)}</td>
                <td>${escapeHtml(s.area)}</td>
                <td class="table-price">${formatPrice(s.fee)}</td>
                <td>
                  <button class="btn-icon btn-icon-danger" data-delete-station="${i}" title="Delete station">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : `
      <div class="admin-table-wrapper">
        <div class="empty-state">
          <span class="empty-state-icon">🚚</span>
          <div class="empty-state-text">No delivery stations yet</div>
          <div class="empty-state-sub">Add your first station above</div>
        </div>
      </div>
    `}
  `;
}

function bindStationsEvents() {
  document.getElementById('btn-add-station')?.addEventListener('click', () => {
    const name = document.getElementById('station-name')?.value.trim();
    const area = document.getElementById('station-area')?.value.trim();
    const fee = parseFloat(document.getElementById('station-fee')?.value);

    if (!name || !area) {
      showToast('Station name and area are required', 'error');
      return;
    }
    if (isNaN(fee) || fee < 0) {
      showToast('Please enter a valid delivery fee', 'error');
      return;
    }

    addDeliveryStation({ name, area, fee });
    showToast(`Station "${name}" added`, 'success');
    render();
  });

  document.querySelectorAll('[data-delete-station]').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.deleteStation, 10);
      removeDeliveryStation(index);
      showToast('Station removed', 'success');
      render();
    });
  });
}

/* ============================================================
   Announcements View
   ============================================================ */
function renderAnnouncementsView() {
  const announcement = getAnnouncement();
  const text = announcement?.text || '';
  const active = announcement?.active ?? false;
  const link = announcement?.link || '';

  return `
    <div class="content-header">
      <h1>Announcements</h1>
    </div>

    ${text ? `
      <div class="announcement-current">
        <div class="announcement-current-label">Current Announcement</div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
          <span class="announcement-status ${active ? 'active' : 'inactive'}">
            <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span>
            ${active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div class="announcement-current-text">${escapeHtml(text)}</div>
        ${link ? `<div style="margin-top:6px;font-size:13px;color:var(--text-muted);">Link: <a href="${escapeHtml(link)}" style="color:var(--accent-primary)">${escapeHtml(link)}</a></div>` : ''}
      </div>
    ` : ''}

    <div class="section-card">
      <div class="section-card-title">✏️ ${text ? 'Update' : 'Set'} Announcement</div>
      <div class="form-group">
        <label>Announcement Text</label>
        <textarea class="form-textarea" id="ann-text" placeholder="Enter announcement text...">${escapeHtml(text)}</textarea>
      </div>
      <div class="form-group">
        <label>Link URL (optional)</label>
        <input type="text" class="form-input" id="ann-link" placeholder="https://..." value="${escapeHtml(link)}">
      </div>
      <div class="form-group">
        <div class="toggle-row">
          <label class="toggle-switch">
            <input type="checkbox" id="ann-active" ${active ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label">Active</span>
        </div>
      </div>
      <button class="btn-primary" id="btn-save-announcement">Save Announcement</button>
    </div>

    <div class="announcement-preview">
      <div class="announcement-preview-label">Preview</div>
      <div class="announcement-preview-bar" id="ann-preview-bar" style="${active ? '' : 'opacity:0.4'}">
        📢 <span id="ann-preview-text">${escapeHtml(text) || 'Your announcement will appear here'}</span>
      </div>
    </div>
  `;
}

function bindAnnouncementsEvents() {
  // Live preview
  const textInput = document.getElementById('ann-text');
  const previewText = document.getElementById('ann-preview-text');
  const previewBar = document.getElementById('ann-preview-bar');
  const activeCheckbox = document.getElementById('ann-active');

  textInput?.addEventListener('input', () => {
    if (previewText) previewText.textContent = textInput.value || 'Your announcement will appear here';
  });

  activeCheckbox?.addEventListener('change', () => {
    if (previewBar) previewBar.style.opacity = activeCheckbox.checked ? '1' : '0.4';
  });

  document.getElementById('btn-save-announcement')?.addEventListener('click', () => {
    const text = document.getElementById('ann-text')?.value.trim();
    const link = document.getElementById('ann-link')?.value.trim();
    const active = document.getElementById('ann-active')?.checked ?? false;

    setAnnouncement({ text, link, active });
    showToast('Announcement saved', 'success');
    render();
  });
}

/* ============================================================
   Helpers
   ============================================================ */
function refreshContent() {
  const content = document.getElementById('admin-content');
  if (content) {
    content.innerHTML = renderView();
    bindViewEvents();
  }
}

function renderPrice(product) {
  if (product.discountedPrice != null && product.discountedPrice < product.originalPrice) {
    return `<span class="table-price">${formatPrice(product.discountedPrice)}</span><span class="table-price-original">${formatPrice(product.originalPrice)}</span>`;
  }
  return `<span class="table-price">${formatPrice(product.originalPrice)}</span>`;
}

function renderStockBadge(units) {
  if (units === 0) {
    return `<span class="stock-badge out-of-stock"><span class="stock-dot"></span>Out of stock</span>`;
  }
  if (units <= 10) {
    return `<span class="stock-badge low-stock"><span class="stock-dot"></span>${units} left</span>`;
  }
  return `<span class="stock-badge in-stock"><span class="stock-dot"></span>${units} in stock</span>`;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
