// Data
const products = [
    // Cơm (5 món)
    { id: 1, name: "Cơm Tấm Sườn Bì Chả", price: 45000, type: "com", image: "images/com-tam-suon-bi-cha.webp", desc: "Sườn nướng than hoa, bì thính, chả trứng, mỡ hành.", rating: 4.8, badge: "hot" },
    { id: 2, name: "Cơm Gà Xối Mỡ", price: 50000, type: "com", image: "images/comgaxoimo.jpg", desc: "Gà góc tư chiên giòn, da giòn rụm, cơm chiên đỏ.", rating: 4.7, badge: "selling" },
    { id: 3, name: "Cơm Văn Phòng Cá Kho", price: 40000, type: "com", image: "images/comvanphong.jpg", desc: "Cá basa kho tộ đậm đà, ăn kèm canh chua.", rating: 4.5, badge: null },
    { id: 4, name: "Cơm Chay Thập Cẩm", price: 35000, type: "com", image: "images/com-chien-thap-cam.webp", desc: "Đậu hũ sốt cà, rau xào, nấm kho, canh chay.", rating: 4.6, badge: null },
    { id: 5, name: "Combo Cơm Sườn + Cola", price: 60000, type: "com", image: "images/combo cola.jpg", desc: "Tiết kiệm hơn với combo cơm và nước ngọt.", rating: 4.9, badge: "hot" },

    // Mì (5 món)
    { id: 6, name: "Mì Xào Bò", price: 45000, type: "mi", image: "images/mi-xao-bo.webp", desc: "Bò mềm xào cải thìa, mì trứng dai ngon.", rating: 4.7, badge: null },
    { id: 7, name: "Hủ Tiếu Nam Vang", price: 55000, type: "mi", image: "images/hu-tieu-nam-vang.webp", desc: "Tôm, trứng cút, thịt băm, nước dùng ngọt thanh.", rating: 4.8, badge: "hot" },
    { id: 8, name: "Mì Ý Sốt Bò Băm", price: 50000, type: "mi", image: "images/my-y-sot-bo-bam.jpg", desc: "Sốt cà chua bò băm (Bolognese) chuẩn vị.", rating: 4.6, badge: null },
    { id: 9, name: "Mì Trộn Muối Ớt", price: 40000, type: "mi", image: "images/mitron.jpg", desc: "Cay nồng, toppings phong phú (bò viên, hải sản).", rating: 4.7, badge: null },
    { id: 10, name: "Phở Bò Tái Nạm", price: 60000, type: "mi", image: "images/phobo.jpg", desc: "Nước dùng phở gia truyền, bò tái mềm.", rating: 5.0, badge: "hot" },

    // Nước (5 món)
    { id: 11, name: "Trà Sữa Trân Châu", price: 25000, type: "nuoc", image: "images/mon-sua-chua-tran-chau-duong-den.jpg", desc: "Trà sữa thái, trân châu đen dai dai.", rating: 4.8, badge: null },
    { id: 12, name: "Trà Đào Cam Sả", price: 30000, type: "nuoc", image: "images/tra-dao-cam-sa-cong-thuc-pha-che-chuan-vi.png", desc: "Thanh mát, giải nhiệt, miếng đào giòn.", rating: 4.9, badge: "hot" },
    { id: 13, name: "Nước Ép Dưa Hấu", price: 20000, type: "nuoc", image: "images/nuocepduahau.webp", desc: "Nguyên chất 100%, không đường.", rating: 4.6, badge: null },
    { id: 14, name: "Coca Cola Tươi", price: 15000, type: "nuoc", image: "images/coca.jpg", desc: "Ly lớn, kèm chanh tươi/đá.", rating: 4.5, badge: null },
    { id: 15, name: "Chanh Tuyết Đá Xay", price: 25000, type: "nuoc", image: "images/chanhtyet.webp", desc: "Mát lạnh, chua ngọt sảng khoái.", rating: 4.7, badge: null },
];

let cart = [];
let wishlist = JSON.parse(localStorage.getItem('com24h_wishlist')) || [];
let searchHistory = JSON.parse(localStorage.getItem('com24h_search')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('com24h_recent')) || [];

// NEW: Add support for ratings and settings
let ratings = JSON.parse(localStorage.getItem('com24h_ratings')) || [];
let currentLanguage = localStorage.getItem('com24h_language') || 'vi';
let discountCode = '';
let discountAmount = 0;

// Promo codes
const promoCodes = {
    'WELCOME10': { discount: 0.10, type: 'percent', name: 'Bảo hành 10%' },
    'FREESHIP': { discount: 30000, type: 'fixed', name: 'Miễn phí ship' },
    'SAVE20K': { discount: 20000, type: 'fixed', name: 'Giảm 20k' }
};

// Flash sale products (30 min limited deal)
const flashSaleProducts = [
    { productId: 1, originalPrice: 45000, salePrice: 35000, discount: 22 },  // Cơm Tấm Sườn Bì Chả
    { productId: 7, originalPrice: 55000, salePrice: 44000, discount: 20 }   // Hủ Tiếu Nam Vang
];

// DOM Elements
const grid = document.getElementById('product-grid');
const tabs = document.querySelectorAll('.tab');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const closeModalBtns = document.querySelectorAll('.close-modal');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const confirmOrderBtn = document.getElementById('confirm-order-btn');
const productDetailModal = document.getElementById('product-modal');
const productDetailBody = document.getElementById('product-detail-body');
const wishlistBtn = document.getElementById('wishlist-btn');
const wishlistModal = document.getElementById('wishlist-modal');
const wishlistItemsContainer = document.getElementById('wishlist-items');
const wishlistCount = document.getElementById('wishlist-count');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMenu = document.getElementById('close-menu');
const filterToggle = document.getElementById('filter-toggle');
const advancedFilters = document.getElementById('advanced-filters');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const priceMinVal = document.getElementById('price-min-val');
const priceMaxVal = document.getElementById('price-max-val');
const ratingBtns = document.querySelectorAll('.rating-btn');
const resetFilterBtn = document.getElementById('reset-filters');
const searchSuggestions = document.getElementById('search-suggestions');

let filters = {
    category: 'all',
    minPrice: 15000,
    maxPrice: 60000,
    rating: 'all',
    sort: 'default'
};

// Init
function renderProducts(items) {
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            ${p.badge ? `<div class="product-badge ${p.badge}">${p.badge === 'hot' ? '🔥 HOT' : p.badge === 'selling' ? '📈 BÁN CHẠY' : '🆕 MỚI'}</div>` : ''}
            <button class="wishlist-btn-card ${wishlist.find(x => x.id === p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id}, event)">
                <i class="fas fa-heart"></i>
            </button>
            <img src="${p.image}" alt="${p.name}" class="product-image" onclick="showDetail(${p.id})">
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <div class="product-meta">
                    <span class="product-rating"><i class="fas fa-star"></i> ${p.rating}</span>
                    <span class="product-price">${p.price.toLocaleString()}đ</span>
                </div>
                <p class="product-desc">${p.desc}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
                <div class="product-rating-section">
                    <div class="rating-stars" data-product-id="${p.id}">
                        <span class="rating-star" data-rating="1" onclick="rateProduct(${p.id}, 1)">★</span>
                        <span class="rating-star" data-rating="2" onclick="rateProduct(${p.id}, 2)">★</span>
                        <span class="rating-star" data-rating="3" onclick="rateProduct(${p.id}, 3)">★</span>
                        <span class="rating-star" data-rating="4" onclick="rateProduct(${p.id}, 4)">★</span>
                        <span class="rating-star" data-rating="5" onclick="rateProduct(${p.id}, 5)">★</span>
                    </div>
                    <span class="rating-text">Đánh giá sản phẩm</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showDetail(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    productDetailBody.innerHTML = `
        <div style="cursor: zoom-in;" onclick="openGallery('${p.image}')">
            <img src="${p.image}" style="width:100%; height:300px; object-fit:contain; border-radius:16px 16px 0 0; padding:20px; background: #f0f0f0;">
        </div>
        <div style="padding:20px;">
            <h2>${p.name}</h2>
            <p style="color:var(--primary); font-size:24px; font-weight:700; margin:10px 0;">${p.price.toLocaleString()}đ</p>
            <p>${p.desc}</p>
            <div style="margin-top:20px;">
                <h4>Đánh giá:</h4>
                 <div style="color:#FFC107; margin-bottom:10px;">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}
                    <span>(${p.rating}/5)</span>
                 </div>
                 <p><i>"Món ăn rất ngon, giao hàng nhanh!" - Khách hàng ẩn danh</i></p>
            </div>
            <button class="add-btn" style="margin-top:20px;" onclick="addToCart(${p.id})">Thêm vào giỏ hàng ngay</button>
        </div>
    `;
    productDetailModal.classList.add('active');
}

// Gallery Zoom
let zoomLevel = 100;
const galleryModal = document.getElementById('gallery-modal');
const galleryImage = document.getElementById('gallery-image');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const zoomLevelDisplay = document.getElementById('zoom-level');

function openGallery(imageSrc) {
    galleryImage.src = imageSrc;
    galleryModal.classList.add('active');
    zoomLevel = 100;
    updateZoom();
}

function updateZoom() {
    galleryImage.style.transform = `scale(${zoomLevel / 100})`;
    zoomLevelDisplay.innerText = `${zoomLevel}%`;
    zoomInBtn.disabled = zoomLevel >= 300;
    zoomOutBtn.disabled = zoomLevel <= 100;
}

zoomInBtn.addEventListener('click', () => {
    if (zoomLevel < 300) {
        zoomLevel += 20;
        updateZoom();
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (zoomLevel > 100) {
        zoomLevel -= 20;
        updateZoom();
    }
});

// Form Validation
function validateForm() {
    const inputs = document.querySelectorAll('#checkout-form [data-field]');
    let isValid = true;

    inputs.forEach(input => {
        const field = input.dataset.field;
        const value = input.value.trim();
        const error = input.closest('.form-group').querySelector('.form-error');

        let valid = true;

        if (field === 'name') {
            valid = value.length >= 3;
        } else if (field === 'phone') {
            valid = /^0\d{9,10}$/.test(value);
        } else if (field === 'address') {
            valid = value.length >= 5;
        }

        if (valid) {
            input.classList.remove('error');
            input.classList.add('success');
            if (error) error.classList.remove('show');
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            if (error) error.classList.add('show');
            isValid = false;
        }
    });

    return isValid;
}

document.querySelectorAll('#checkout-form [data-field]').forEach(input => {
    input.addEventListener('blur', () => {
        const field = input.dataset.field;
        const value = input.value.trim();
        const error = input.closest('.form-group').querySelector('.form-error');

        let valid = true;

        if (field === 'name') {
            valid = value.length >= 3;
        } else if (field === 'phone') {
            valid = /^0\d{9,10}$/.test(value);
        } else if (field === 'address') {
            valid = value.length >= 5;
        }

        if (valid) {
            input.classList.remove('error');
            input.classList.add('success');
            if (error) error.classList.remove('show');
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            if (error) error.classList.add('show');
        }
    });
});

// Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
let isDarkMode = localStorage.getItem('com24h_darkmode') === 'true';

function initDarkMode() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('com24h_darkmode', isDarkMode);

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Cart Logic
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...p, qty: 1 });
    }
    updateCartIcon();
    renderCart();

    // Animation/Feedback
    showToast(`Đã thêm ${p.name} vào giỏ!`);
}

function updateCartIcon() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.innerText = totalQty;
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding:20px;">Giỏ hàng trống</p>';
        cartTotalEl.innerText = '0đ';
    } else {
        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            total += item.price * item.qty;
            return `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-img">
                    <div class="cart-details">
                        <h4>${item.name}</h4>
                        <p>${item.price.toLocaleString()}đ</p>
                        <div class="cart-controls">
                            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                            <button style="margin-left:auto; border:none; background:none; color:red; cursor:pointer;" onclick="removeItem(${item.id})">Xóa</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        cartTotalEl.innerText = total.toLocaleString() + 'đ';
    }

    // Render recently viewed
    if (recentlyViewed.length > 0) {
        document.getElementById('recently-viewed-section').style.display = 'block';
        document.getElementById('recently-viewed-items').innerHTML = recentlyViewed.map(item => `
            <div class="recently-viewed-item" onclick="showDetail(${item.id})" title="${item.name}">
                <img src="${item.image}" alt="${item.name}">
            </div>
        `).join('');
    } else {
        document.getElementById('recently-viewed-section').style.display = 'none';
    }
}

function changeQty(id, delta) {
    const item = cart.find(x => x.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeItem(id);
    }
    updateCartIcon();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(x => x.id !== id);
    updateCartIcon();
    renderCart();
}

// Toast Notification
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <div class="toast-content">
            <span class="toast-title">${type === 'success' ? 'Thành công' : 'Lỗi'}</span>
            <span class="toast-msg">${message}</span>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Product Rating Function
function rateProduct(productId, rating) {
    const ratingSection = document.querySelector(`.rating-stars[data-product-id="${productId}"]`);
    if (!ratingSection) return;

    const stars = ratingSection.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    // Save rating to localStorage
    let ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    ratings[productId] = rating;
    localStorage.setItem('productRatings', JSON.stringify(ratings));

    showToast(`Cảm ơn đánh giá của bạn: ${rating}⭐`);
}

// Load saved ratings on page load
function loadSavedRatings() {
    const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    Object.keys(ratings).forEach(productId => {
        const ratingSection = document.querySelector(`.rating-stars[data-product-id="${productId}"]`);
        if (ratingSection) {
            const rating = ratings[productId];
            const stars = ratingSection.querySelectorAll('.rating-star');
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
    });
}

// Global scope
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.showDetail = showDetail;
window.toggleWishlist = toggleWishlist;
window.rateProduct = rateProduct;
window.selectSearchSuggestion = selectSearchSuggestion;
window.openGallery = openGallery;
window.editCheckout = editCheckout;
window.submitOrder = submitOrder;
window.closeSuccess = closeSuccess;
window.scrollToMenu = () => document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });

// Sort & Filter
function filterAndSort() {
    const keyword = searchInput.value.toLowerCase();

    let filtered = products.filter(p => {
        const matchCate = filters.category === 'all' || p.type === filters.category || (filters.category === 'selling' && p.rating >= 4.8);
        const matchSearch = p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword);
        const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
        const matchRating = filters.rating === 'all' ? true : p.rating >= parseFloat(filters.rating);
        return matchCate && matchSearch && matchPrice && matchRating;
    });

    if (filters.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    if (filters.sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'));

    renderProducts(filtered);
}

// Wishlist Logic
function toggleWishlist(id, event) {
    event.stopPropagation();
    const product = products.find(x => x.id === id);
    const idx = wishlist.findIndex(x => x.id === id);

    if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast(`Đã xóa ${product.name} khỏi yêu thích`);
    } else {
        wishlist.push(product);
        showToast(`Đã thêm ${product.name} vào yêu thích ❤️`);
    }

    localStorage.setItem('com24h_wishlist', JSON.stringify(wishlist));
    updateWishlistIcon();
    filterAndSort();
}

function updateWishlistIcon() {
    wishlistCount.innerText = wishlist.length;
    if (wishlist.length > 0) {
        wishlistBtn.classList.add('active');
    } else {
        wishlistBtn.classList.remove('active');
    }
}

function renderWishlist() {
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `
            <div class="empty-state">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-6677042-5475510.png" alt="Empty" style="width: 150px; opacity: 0.5;">
                <p>Bạn chưa thêm sản phẩm yêu thích nào.</p>
                <button class="checkout-btn" style="margin-top:20px;" onclick="wishlistModal.classList.remove('active')">Tiếp tục mua hàng</button>
            </div>
        `;
        return;
    }

    wishlistItemsContainer.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-img">
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString()}đ</p>
            </div>
            <button style="margin-left:auto; border:none; background:none; color:red; cursor:pointer; font-size:18px;" onclick="toggleWishlist(${item.id}, event)">✕</button>
        </div>
    `).join('');
}

// Search Suggestions
function renderSearchSuggestions(keyword) {
    if (!keyword.trim()) {
        searchSuggestions.innerHTML = '';
        return;
    }

    const suggestions = products.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 5);

    searchSuggestions.innerHTML = suggestions.map(p => `
        <div class="search-suggestion-item" onclick="selectSearchSuggestion('${p.name}')">
            <i class="fas fa-search"></i>
            <span>${p.name}</span>
        </div>
    `).join('');

    if (suggestions.length === 0) {
        searchSuggestions.innerHTML = '<div class="search-suggestion-item">Không tìm thấy sản phẩm</div>';
    }
}

function selectSearchSuggestion(name) {
    searchInput.value = name;
    searchSuggestions.innerHTML = '';
    filterAndSort();
}

// Events
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filters.category = tab.dataset.cate;
        filterAndSort();
    });
});

sortSelect.addEventListener('change', (e) => {
    filters.sort = e.target.value;
    filterAndSort();
});

document.getElementById('search-btn').addEventListener('click', filterAndSort);
searchInput.addEventListener('keyup', (e) => {
    renderSearchSuggestions(e.target.value);
    if (e.key === 'Enter') filterAndSort();
});

// Price Range Filter
priceMinInput.addEventListener('input', (e) => {
    filters.minPrice = parseInt(e.target.value);
    priceMinVal.innerText = filters.minPrice.toLocaleString() + 'đ';
    filterAndSort();
});

priceMaxInput.addEventListener('input', (e) => {
    filters.maxPrice = parseInt(e.target.value);
    priceMaxVal.innerText = filters.maxPrice.toLocaleString() + 'đ';
    filterAndSort();
});

// Rating Filter
ratingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ratingBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filters.rating = btn.dataset.rating;
        filterAndSort();
    });
});

// Reset Filters
resetFilterBtn.addEventListener('click', () => {
    filters = {
        category: 'all',
        minPrice: 15000,
        maxPrice: 60000,
        rating: 'all',
        sort: 'default'
    };
    priceMinInput.value = 15000;
    priceMaxInput.value = 60000;
    priceMinVal.innerText = '15.000đ';
    priceMaxVal.innerText = '60.000đ';
    sortSelect.value = 'default';
    searchInput.value = '';
    searchSuggestions.innerHTML = '';
    tabs.forEach(t => t.classList.remove('active'));
    tabs[0].classList.add('active');
    ratingBtns.forEach(b => b.classList.remove('active'));
    ratingBtns[0].classList.add('active');
    filterAndSort();
});

// Filter Toggle
filterToggle.addEventListener('click', () => {
    advancedFilters.classList.toggle('active');
    filterToggle.classList.toggle('active');
});

// Mobile Menu
hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    hamburger.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
});

mobileMenuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
});

document.querySelectorAll('.mobile-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const cate = item.dataset.cate;
        filters.category = cate;
        tabs.forEach(t => t.classList.remove('active'));
        const tab = document.querySelector(`[data-cate="${cate}"]`);
        if (tab) tab.classList.add('active');
        filterAndSort();
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Wishlist Modal
wishlistBtn.addEventListener('click', () => {
    renderWishlist();
    wishlistModal.classList.add('active');
});

// Modals
cartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.classList.add('active');
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal-overlay').classList.remove('active');
    });
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast("Giỏ hàng đang trống!", 'error');
        return;
    }
    cartModal.classList.remove('active');
    checkoutModal.classList.add('active');
});

// Confirm Order
confirmOrderBtn.addEventListener('click', () => {
    if (!validateForm()) {
        showToast("Vui lòng điền thông tin hợp lệ!", 'error');
        return;
    }
    showOrderConfirmation();
});

// Back button
document.getElementById('prev-step-btn').addEventListener('click', () => {
    checkoutModal.classList.add('active');
});

const orderTrackingBtn = document.getElementById('order-tracking-btn');
const orderHistoryModal = document.getElementById('order-history-modal');
const orderHistoryList = document.getElementById('order-history-list');

// Load orders from localStorage
let orders = JSON.parse(localStorage.getItem('com24h_orders')) || [];

// Order Confirmation
function showOrderConfirmation() {
    const name = document.querySelector('[data-field="name"]').value;
    const phone = document.querySelector('[data-field="phone"]').value;
    const address = document.querySelector('[data-field="address"]').value;
    const notes = document.querySelector('[data-field="notes"]').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    const paymentText = payment === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản';
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const itemsHtml = cart.map(item => `
        <div class="order-confirmation-item">
            <span>${item.qty}x ${item.name}</span>
            <span>${(item.price * item.qty).toLocaleString()}đ</span>
        </div>
    `).join('');

    const confirmationHtml = `
        <div class="order-confirmation">
            <div class="order-success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>Xác Nhận Đơn Hàng</h3>
            <p>Vui lòng kiểm tra lại thông tin trước khi đặt</p>
            
            <h4 style="margin-top: 20px; text-align: left;">👤 Thông Tin Giao Hàng</h4>
            <div style="text-align: left; background: linear-gradient(135deg, var(--primary-soft) 0%, rgba(255, 94, 0, 0.05) 100%); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
                <p><strong>Tên:</strong> ${name}</p>
                <p><strong>SĐT:</strong> ${phone}</p>
                <p><strong>Địa chỉ:</strong> ${address}</p>
                ${notes ? `<p><strong>Ghi chú:</strong> ${notes}</p>` : ''}
            </div>
            
            <h4 style="text-align: left;">🍱 Chi Tiết Đơn Hàng</h4>
            ${itemsHtml}
            
            <div style="margin-top: 16px; padding: 16px; background: #F3F4F6; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span>Tạm tính:</span>
                    <span>${total.toLocaleString()}đ</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span>Phí giao hàng:</span>
                    <span style="color: var(--primary); font-weight: 700;">MIỄN PHÍ</span>
                </div>
                <div style="border-top: 2px solid #E5E7EB; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 700;">
                    <span>Tổng cộng:</span>
                    <span style="color: var(--primary);">${total.toLocaleString()}đ</span>
                </div>
            </div>
            
            <div style="margin-top: 16px; padding: 12px; background: linear-gradient(135deg, var(--primary-soft) 0%, rgba(255, 94, 0, 0.05) 100%); border-radius: var(--radius-md); text-align: left;">
                <p><strong>💳 Thanh toán:</strong> ${paymentText}</p>
            </div>
            
            <div class="order-confirmation-buttons" style="margin-top: 24px;">
                <button class="order-confirmation-buttons btn-secondary" onclick="editCheckout()">✏️ Sửa Thông Tin</button>
                <button class="order-confirmation-buttons btn-primary" onclick="submitOrder()" style="background: var(--primary); color: white;">✓ Đặt Hàng Ngay</button>
            </div>
        </div>
    `;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.id = 'confirmation-modal-temp';
    modal.innerHTML = `
        <div class="modal checkout-modal">
            <div class="modal-header">
                <h3>Xác Nhận Đơn Hàng</h3>
                <button class="close-modal" onclick="document.getElementById('confirmation-modal-temp').remove()">&times;</button>
            </div>
            <div class="modal-body">
                ${confirmationHtml}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    checkoutModal.classList.remove('active');
}

function editCheckout() {
    document.getElementById('confirmation-modal-temp').remove();
    checkoutModal.classList.add('active');
}

function submitOrder() {
    const name = document.querySelector('[data-field="name"]').value;
    const phone = document.querySelector('[data-field="phone"]').value;
    const address = document.querySelector('[data-field="address"]').value;
    const notes = document.querySelector('[data-field="notes"]').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const orderId = '#' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
        id: orderId,
        date: new Date().toLocaleString('vi-VN'),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        payment: payment === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản',
        status: 'pending',
        customer: { name, phone, address, notes }
    };

    orders.unshift(newOrder);
    localStorage.setItem('com24h_orders', JSON.stringify(orders));

    document.getElementById('confirmation-modal-temp').remove();
    checkoutModal.classList.remove('active');

    showToast(`✅ Đặt hàng thành công! Mã đơn: ${orderId}`, 'success');

    // Show success modal
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay active';
    successModal.id = 'success-modal-temp';
    successModal.innerHTML = `
        <div class="modal checkout-modal">
            <div class="modal-header">
                <h3>🎉 Đặt Hàng Thành Công</h3>
                <button class="close-modal" onclick="document.getElementById('success-modal-temp').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-confirmation">
                    <div class="order-success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>Cảm Ơn Bạn!</h3>
                    <div class="order-confirmation-id">${orderId}</div>
                    <p>Chúng tôi sẽ liên hệ bạn để xác nhận trong vòng 5 phút</p>
                    <p style="color: var(--primary); font-weight: 700;">⏱ Thời gian dự kiến giao: 20-30 phút</p>
                    <div style="margin-top: 20px; padding: 16px; background: #F0FDF4; border-radius: var(--radius-md);">
                        <p>📱 Theo dõi đơn hàng: Nhấn nút "Đơn hàng" ở đầu trang</p>
                    </div>
                    <button class="checkout-btn" onclick="closeSuccess()" style="margin-top: 20px;">Tiếp tục mua hàng</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(successModal);
    cart = [];
    updateCartIcon();
}

function closeSuccess() {
    document.getElementById('success-modal-temp').remove();
    filterAndSort();
}

// Order History Logic
orderTrackingBtn.addEventListener('click', () => {
    renderOrders();
    orderHistoryModal.classList.add('active');
});

function renderOrders() {
    if (orders.length === 0) {
        orderHistoryList.innerHTML = `
            <div class="empty-state">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800926.png" alt="Empty" style="width: 150px; opacity: 0.5;">
                <p>Bạn chưa có đơn hàng nào.</p>
            </div>
        `;
        return;
    }

    orderHistoryList.innerHTML = orders.map(order => {
        const statusText = order.status === 'pending' ? 'Đang xử lý' :
            order.status === 'completed' ? 'Hoàn tất' : 'Đã hủy';
        const statusClass = order.status === 'pending' ? 'status-pending' :
            order.status === 'completed' ? 'status-completed' : 'status-cancelled';

        const itemsHtml = order.items.map(item => `
            <div class="order-summary">
                <span>${item.qty}x ${item.name}</span>
                <span>${(item.price * item.qty).toLocaleString()}đ</span>
            </div>
        `).join('');

        return `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-date">${order.date}</span>
                </div>
                <div class="order-body">
                    ${itemsHtml}
                </div>
                <div class="order-total">
                    <span class="order-status ${statusClass}">${statusText}</span>
                    <span>${order.total.toLocaleString()}đ</span>
                </div>
            </div>
        `;
    }).join('');
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }

    // Ctrl/Cmd + B for cart
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        cartBtn.click();
    }

    // Ctrl/Cmd + H for wishlist
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        wishlistBtn.click();
    }
});

// Arrow key navigation in product grid
document.addEventListener('keydown', (e) => {
    if (document.activeElement.closest('.product-card')) {
        const cards = Array.from(document.querySelectorAll('.product-card'));
        const current = cards.indexOf(document.activeElement.closest('.product-card'));

        if (e.key === 'ArrowRight' && current < cards.length - 1) {
            e.preventDefault();
            cards[current + 1].querySelector('.add-btn').focus();
        } else if (e.key === 'ArrowLeft' && current > 0) {
            e.preventDefault();
            cards[current - 1].querySelector('.add-btn').focus();
        }
    }
});
renderProducts(products);
updateCartIcon();
updateWishlistIcon();
loadSavedRatings();
initDarkMode();

// Payment Method Selection UI Logic
const paymentInputs = document.querySelectorAll('input[name="payment"]');
paymentInputs.forEach(input => {
    input.addEventListener('change', function () {
        // Remove selected class from all cards
        document.querySelectorAll('.payment-card').forEach(card => card.classList.remove('selected'));
        // Add selected class to the parent label of the checked input
        if (this.checked) {
            this.closest('.payment-card').classList.add('selected');
        }
    });
});

// ===== TOP 10 NEW FEATURES =====

// 1. Welcome Popup
function initWelcomePopup() {
    const hasVisited = localStorage.getItem('com24h_visited');
    if (!hasVisited) {
        setTimeout(() => {
            document.getElementById('welcome-modal').classList.add('active');
        }, 1000);
    }

    document.getElementById('close-welcome').addEventListener('click', () => {
        document.getElementById('welcome-modal').classList.remove('active');
        localStorage.setItem('com24h_visited', 'true');
    });

    document.getElementById('browse-btn').addEventListener('click', () => {
        document.getElementById('welcome-modal').classList.remove('active');
        localStorage.setItem('com24h_visited', 'true');
        document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('copy-promo').addEventListener('click', () => {
        const code = document.getElementById('promo-code').innerText;
        navigator.clipboard.writeText(code);
        showToast('Đã copy mã: ' + code);
    });

    document.querySelector('.email-subscribe').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('subscribe-email').value;
        localStorage.setItem('com24h_email', email);
        showToast('Cảm ơn! Chúng tôi sẽ gửi ưu đãi đến ' + email);
        document.getElementById('welcome-modal').classList.remove('active');
        localStorage.setItem('com24h_visited', 'true');
    });
}

// 2. Announcement Banner & Countdown
function initSaleCountdown() {
    const banner = document.getElementById('announcement-banner');
    const countdownEl = document.getElementById('sale-countdown');

    if (localStorage.getItem('com24h_banner_closed')) {
        banner.style.display = 'none';
        return;
    }

    // Countdown timer (2 hours 45 minutes)
    let timeLeft = 2 * 3600 + 45 * 60 + 30; // seconds

    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        countdownEl.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            banner.style.display = 'none';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    document.getElementById('announcement-close').addEventListener('click', () => {
        banner.style.display = 'none';
        localStorage.setItem('com24h_banner_closed', 'true');
    });
}

// 3. Live Chat Widget
function initChat() {
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatMinimize = document.getElementById('chat-minimize');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        document.querySelector('.chat-badge').style.display = 'none';
    });

    chatMinimize.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', () => {
            const reply = btn.dataset.reply;
            addMessage(reply, 'user');
            setTimeout(() => {
                const responses = {
                    'Menu hôm nay': 'Hôm nay chúng tôi có 15+ món ngon: Cơm, Mì, Nước giải khát. Bạn có thể xem menu phía trên! 😊',
                    'Thời gian giao hàng': 'Chúng tôi giao hàng trong vòng 20-30 phút. Siêu nhanh! ⚡',
                    'Khuyến mãi': 'Flash sale 20% cho đơn hàng trên 100k hôm nay! Dùng mã WELCOME20 nhé! 🎉'
                };
                addMessage(responses[reply] || 'Cảm ơn bạn đã liên hệ!', 'bot');
            }, 1000);
        });
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatInput.value = '';

        setTimeout(() => {
            addMessage('Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất. 😊', 'bot');
        }, 1000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `
            ${sender === 'bot' ? '<div class="chat-avatar">🤖</div>' : ''}
            <div class="chat-bubble-msg">
                <p>${text}</p>
                <span class="chat-time">Vừa xong</span>
            </div>
            ${sender === 'user' ? '<div class="chat-avatar">👤</div>' : ''}
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// 4. Confetti Animation
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.launchConfetti = function () {
        const particles = [];
        const colors = ['#FF5E00', '#FF8533', '#10B981', '#F59E0B', '#EF4444'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let stillFalling = false;
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // gravity

                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);

                if (p.y < canvas.height) stillFalling = true;
            });

            if (stillFalling) {
                requestAnimationFrame(animate);
            }
        }

        animate();
    };
}

// 5. Spin Wheel
function initSpinWheel() {
    const spinBtn = document.getElementById('spin-wheel-btn');
    const spinModal = document.getElementById('spin-modal');
    const closeSpin = document.getElementById('close-spin');
    const spinButton = document.getElementById('spin-button');
    const canvas = document.getElementById('spin-canvas');
    const ctx = canvas.getContext('2d');

    const prizes = ['5%', '10%', '15%', '20%', '0%', '5%'];
    const colors = ['#FF5E00', '#10B981', '#F59E0B', '#EF4444', '#6B7280', '#FF8533'];
    let currentRotation = 0;
    let isSpinning = false;

    // Check if already spun today
    const lastSpin = localStorage.getItem('com24h_last_spin');
    const today = new Date().toDateString();

    if (lastSpin === today) {
        spinBtn.style.display = 'none';
    }

    spinBtn.addEventListener('click', () => {
        spinModal.classList.add('active');
        drawWheel();
    });

    closeSpin.addEventListener('click', () => {
        spinModal.classList.remove('active');
    });

    spinButton.addEventListener('click', () => {
        if (isSpinning) return;

        isSpinning = true;
        spinButton.disabled = true;

        const spinTo = Math.floor(Math.random() * 360) + 1800; // At least 5 full rotations
        const finalRotation = currentRotation + spinTo;
        const duration = 3000;
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 1 - Math.pow(1 - progress, 3); // ease-out

            currentRotation = currentRotation + (spinTo * easing) - (currentRotation * easing);
            drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentRotation = finalRotation % 360;
                const prizeIndex = Math.floor(((360 - currentRotation) % 360) / 60);
                const prize = prizes[prizeIndex];

                document.getElementById('spin-result').innerText = `🎉 Chúc mừng! Bạn nhận được mã giảm ${prize}`;
                document.getElementById('spin-next').innerText = '⏰ Quay lại vào ngày mai!';

                localStorage.setItem('com24h_last_spin', today);
                spinBtn.style.display = 'none';

                showAchievement('🎡 Lucky Spinner', 'Bạn đã quay bánh xe may mắn!');

                setTimeout(() => {
                    isSpinning = false;
                }, 2000);
            }
        }

        animate();
    });

    function drawWheel() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 140;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        prizes.forEach((prize, i) => {
            const startAngle = (i * 60 - currentRotation) * Math.PI / 180;
            const endAngle = ((i + 1) * 60 - currentRotation) * Math.PI / 180;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + (endAngle - startAngle) / 2);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.fillText(prize, radius * 0.6, 5);
            ctx.restore();
        });

        // Arrow pointer
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - radius - 20);
        ctx.lineTo(centerX - 10, centerY - radius - 35);
        ctx.lineTo(centerX + 10, centerY - radius - 35);
        ctx.closePath();
        ctx.fillStyle = '#EF4444';
        ctx.fill();
    }
}

// 6. Share Buttons
function initSocialShare() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = window.location.href;
            const text = 'Cơm 24h ngon lắm! Giao hàng nhanh chóng, ưu đãi hấp dẫn! 🍚🔥';

            if (btn.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            } else if (btn.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
            } else if (btn.classList.contains('whatsapp')) {
                window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
            } else if (btn.classList.contains('telegram')) {
                window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
            }

            showToast('Cảm ơn bạn đã chia sẻ! ❤️');
        });
    });
}

// 7. Achievement System
function initAchievements() {
    window.showAchievement = function (title, desc) {
        const toast = document.getElementById('achievement-toast');
        document.getElementById('achievement-title').innerText = title;
        document.getElementById('achievement-desc').innerText = desc;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    // Track achievements
    const achievements = JSON.parse(localStorage.getItem('com24h_achievements')) || [];

    // First purchase
    if (orders.length === 1 && !achievements.includes('first_purchase')) {
        showAchievement('🏆 Đơn Hàng Đầu Tiên', 'Cảm ơn bạn đã tin tưởng Cơm 24h!');
        achievements.push('first_purchase');
        localStorage.setItem('com24h_achievements', JSON.stringify(achievements));
    }

    // 10 orders
    if (orders.length === 10 && !achievements.includes('10_orders')) {
        showAchievement('🔥 Khách Hàng Thân Thiết', 'Bạn đã đặt 10 đơn hàng!');
        achievements.push('10_orders');
        localStorage.setItem('com24h_achievements', JSON.stringify(achievements));
    }

    // Wishlist lover
    if (wishlist.length >= 5 && !achievements.includes('wishlist_5')) {
        showAchievement('😍 Người Yêu Thích', 'Bạn đã thêm 5+ món vào yêu thích!');
        achievements.push('wishlist_5');
        localStorage.setItem('com24h_achievements', JSON.stringify(achievements));
    }
}

// 8. Animated Number Counters
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item strong');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.innerText;
                const number = parseInt(text.replace(/[^0-9]/g, ''));

                if (isNaN(number)) return;

                const duration = 2000;
                const step = number / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= number) {
                        target.innerText = text;
                        clearInterval(timer);
                    } else {
                        target.innerText = Math.floor(current) + (text.includes('+') ? '+' : '');
                    }
                }, 16);

                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// 9. Flash Sale Timer (already in initSaleCountdown)

// 10. Testimonials Carousel
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentIndex = 0;

    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    });

    // Auto rotate
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// === NEW FEATURES ===

// FLASH SALE PRODUCTS RENDERING
function renderFlashSaleProducts() {
    const dealsContainer = document.getElementById('countdown-deals');
    if (!dealsContainer) return;

    dealsContainer.innerHTML = flashSaleProducts.map(deal => {
        const product = products.find(p => p.id === deal.productId);
        if (!product) return '';

        return `
            <div class="countdown-deal-card" onclick="addToCartFromFlash(${product.id})">
                <div class="deal-image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="deal-discount-badge">-${deal.discount}%</div>
                </div>
                <div class="deal-info">
                    <div class="deal-name">${product.name}</div>
                    <div class="deal-prices">
                        <span class="deal-original-price">${deal.originalPrice.toLocaleString()}đ</span>
                        <span class="deal-sale-price">${deal.salePrice.toLocaleString()}đ</span>
                    </div>
                    <button class="deal-add-btn">Thêm vào giỏ</button>
                </div>
            </div>
        `;
    }).join('');
}

// FLASH SALE 30 MINUTE COUNTDOWN
function initFlashSaleCountdown() {
    const countdownEl = document.getElementById('flash-countdown');
    if (!countdownEl) return;

    function updateCountdown() {
        const now = new Date();
        const sessionStart = sessionStorage.getItem('flashSaleStart');
        const startTime = sessionStart ? new Date(sessionStart) : now;

        // Store start time if new session
        if (!sessionStart) {
            sessionStorage.setItem('flashSaleStart', startTime.toISOString());
        }

        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes
        const diff = endTime - now;

        if (diff > 0) {
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            countdownEl.textContent =
                '00:' +
                String(minutes).padStart(2, '0') + ':' +
                String(seconds).padStart(2, '0');
        } else {
            countdownEl.textContent = '00:00:00';
            sessionStorage.removeItem('flashSaleStart');
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Add to cart from flash sale (with sale price)
function addToCartFromFlash(productId) {
    const product = products.find(p => p.id === productId);
    const flashDeal = flashSaleProducts.find(d => d.productId === productId);

    if (product && flashDeal) {
        const cartItem = {
            ...product,
            price: flashDeal.salePrice  // Use sale price
        };

        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ ...cartItem, qty: 1 });
        }

        updateCartIcon();
        renderCart();
        showToast(`Đã thêm ${product.name} vào giỏ!`);
    }
}

// HEADER HIDE ON SCROLL
let lastScrollTop = 0;
let isHeaderHidden = false;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Check if scrolling down
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling DOWN
        if (!isHeaderHidden) {
            header.classList.add('hide');
            isHeaderHidden = true;
        }
    } else {
        // Scrolling UP
        if (isHeaderHidden) {
            header.classList.remove('hide');
            isHeaderHidden = false;
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// 1. COUPON / PROMO CODE LOGIC
function initPromoCode() {
    const applyBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('promo-input');
    const promoMessage = document.getElementById('promo-message');

    applyBtn.addEventListener('click', function () {
        const code = promoInput.value.toUpperCase().trim();
        if (promoCodes[code]) {
            discountCode = code;
            const promo = promoCodes[code];
            if (promo.type === 'percent') {
                discountAmount = Math.floor(getCartTotal() * promo.discount);
            } else {
                discountAmount = promo.discount;
            }
            promoMessage.innerHTML = `✅ ${promo.name} đã áp dụng! Tiết kiệm ${discountAmount.toLocaleString()}đ`;
            promoMessage.style.color = '#10B981';
            applyBtn.disabled = true;
            updateCheckoutTotal();
        } else {
            promoMessage.innerHTML = `❌ Mã không hợp lệ. Thử: WELCOME10, FREESHIP, SAVE20K`;
            promoMessage.style.color = '#EF4444';
            discountCode = '';
            discountAmount = 0;
        }
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function updateCheckoutTotal() {
    const total = getCartTotal();
    const finalTotal = Math.max(0, total - discountAmount);
    cartTotalEl.innerHTML = finalTotal.toLocaleString() + 'đ';
}

// 2. RATING SYSTEM
function initRating() {
    const ratingModal = document.getElementById('rating-modal');
    const ratingForm = document.getElementById('rating-form');
    const starRating = document.getElementById('star-rating');
    const ratingDisplay = document.getElementById('rating-display');
    const ratingProductSelect = document.getElementById('rating-product');
    let selectedRating = 0;

    // Populate product select
    const fragment = document.createDocumentFragment();
    products.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        fragment.appendChild(option);
    });
    ratingProductSelect.appendChild(fragment);

    // Star rating interaction
    starRating.querySelectorAll('i').forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = parseInt(this.dataset.rating);
            ratingDisplay.textContent = selectedRating + '/5 sao';
            starRating.querySelectorAll('i').forEach((s, idx) => {
                if (idx < (5 - selectedRating)) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Submit rating
    ratingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const productId = parseInt(ratingProductSelect.value);
        const comment = document.getElementById('rating-comment').value;
        if (selectedRating === 0 || !productId) {
            showToast('Vui lòng chọn sản phẩm và đánh giá');
            return;
        }
        const rating = {
            productId,
            rating: selectedRating,
            comment,
            date: new Date().toLocaleDateString('vi-VN')
        };
        ratings.push(rating);
        localStorage.setItem('com24h_ratings', JSON.stringify(ratings));
        showToast('✅ Cảm ơn đánh giá của bạn!');
        ratingForm.reset();
        selectedRating = 0;
        ratingDisplay.textContent = '0/5 sao';
        ratingModal.classList.remove('active');
    });

    // Add rating button to header
    document.addEventListener('keydown', function (e) {
        if (e.key === 'r' || e.key === 'R') {
            ratingModal.classList.toggle('active');
        }
    });
}

// 3. STATISTICS
function initStatistics() {
    const statsBtn = document.getElementById('stats-btn');
    const statsModal = document.getElementById('stats-modal');

    statsBtn.addEventListener('click', function () {
        updateStatistics();
        statsModal.classList.add('active');
    });

    // Close modal
    statsModal.querySelector('.close-modal').addEventListener('click', function () {
        statsModal.classList.remove('active');
    });
}

function updateStatistics() {
    const totalOrders = orders.length;
    const totalSpending = orders.reduce((sum, o) => sum + o.total, 0);
    const totalRatings = ratings.length;
    const totalFavorites = wishlist.length;

    document.getElementById('stat-total-orders').textContent = totalOrders;
    document.getElementById('stat-total-spending').textContent = totalSpending.toLocaleString() + 'đ';
    document.getElementById('stat-total-ratings').textContent = totalRatings;
    document.getElementById('stat-total-favorites').textContent = totalFavorites;

    // Top items
    const topItems = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            topItems[item.id] = (topItems[item.id] || 0) + item.qty;
        });
    });

    const sorted = Object.entries(topItems)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const topItemsDiv = document.getElementById('top-items');
    topItemsDiv.innerHTML = sorted.length > 0 ? sorted.map(([id, count]) => {
        const product = products.find(p => p.id === parseInt(id));
        return `<div class="top-item">
            <span class="top-item-name">${product.name}</span>
            <span class="top-item-count">${count} lần</span>
        </div>`;
    }).join('') : '<p style="text-align: center; color: var(--text-muted);">Chưa có dữ liệu</p>';
}

// 4. MULTI-LANGUAGE
const translations = {
    'vi': {
        'add-to-cart': 'Thêm vào giỏ',
        'cart-empty': 'Giỏ hàng trống',
        'total': 'Tổng cộng:',
        'checkout': 'Thanh toán'
    },
    'en': {
        'add-to-cart': 'Add to Cart',
        'cart-empty': 'Cart is empty',
        'total': 'Total:',
        'checkout': 'Checkout'
    }
};

function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    langToggle.textContent = currentLanguage === 'vi' ? 'EN' : 'VI';

    langToggle.addEventListener('click', function (e) {
        e.preventDefault();
        currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
        localStorage.setItem('com24h_language', currentLanguage);
        langToggle.textContent = currentLanguage === 'vi' ? 'EN' : 'VI';
        location.reload();
    });
}

// 5. NOTIFICATIONS
function initNotifications() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function sendNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            icon: 'images/hq720.jpg',
            badge: 'images/hq720.jpg',
            ...options
        });
    }
}

// 6. SAVE ORDER TO LOCALSTORAGE
const originalCheckout = document.getElementById('confirm-order-btn');
if (originalCheckout) {
    originalCheckout.addEventListener('click', function (e) {
        setTimeout(() => {
            if (cart.length === 0) return;
            const formInputs = document.querySelectorAll('#checkout-form [data-field]');
            const orderData = {
                id: 'ORD-' + Date.now(),
                date: new Date().toLocaleDateString('vi-VN'),
                items: [...cart],
                total: getCartTotal() - discountAmount,
                discountCode: discountCode,
                discount: discountAmount,
                customer: {
                    name: formInputs[0]?.value || 'Khách hàng',
                    phone: formInputs[1]?.value || '',
                    address: formInputs[2]?.value || ''
                }
            };
            orders.push(orderData);
            localStorage.setItem('com24h_orders', JSON.stringify(orders));
            sendNotification('✅ Đặt hàng thành công!', {
                body: `Tổng: ${orderData.total.toLocaleString()}đ - Đơn: ${orderData.id}`,
                tag: 'order-' + orderData.id
            });
            // Reset coupon
            discountCode = '';
            discountAmount = 0;
            document.getElementById('promo-input').value = '';
            document.getElementById('apply-promo-btn').disabled = false;
        }, 100);
    });
}

// 7. AUTO-SAVE CART TO LOCALSTORAGE
function saveCart() {
    localStorage.setItem('com24h_cart', JSON.stringify(cart));
}

// Override addToCart and removeItem to save automatically
const originalAddToCart = window.addToCart;
window.addToCart = function (id) {
    originalAddToCart(id);
    saveCart();
};

const originalRemoveItem = window.removeItem;
window.removeItem = function (id) {
    originalRemoveItem(id);
    saveCart();
};

// 8. RESTORE CART FROM LOCALSTORAGE ON PAGE LOAD
function restoreCart() {
    const savedCart = localStorage.getItem('com24h_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartIcon();
    }
}

// 9. DEAL COUNTDOWN (Already exists as sale-countdown)
function initDealCountdown() {
    const countdownEl = document.getElementById('sale-countdown');
    if (countdownEl) {
        function updateCountdown() {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const diff = endOfDay - now;

            if (diff > 0) {
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                countdownEl.textContent =
                    String(hours).padStart(2, '0') + ':' +
                    String(minutes).padStart(2, '0') + ':' +
                    String(seconds).padStart(2, '0');
            }
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// 10. INITIALIZE ALL NEW FEATURES
function initNewFeatures() {
    restoreCart();
    renderFlashSaleProducts();
    initFlashSaleCountdown();
    initPromoCode();
    initRating();
    initStatistics();
    initLanguageToggle();
    initNotifications();
    initDealCountdown();
}

// Override submitOrder to launch confetti
const originalSubmitOrder = submitOrder;
window.submitOrder = function () {
    originalSubmitOrder();
    window.launchConfetti();
    setTimeout(() => {
        initAchievements();
    }, 1000);
};

// Initialize all features
setTimeout(() => {
    initWelcomePopup();
    initChat();
    initSpinWheel();
    initTestimonials();
    initSocialShare();
    initAchievements();
    initConfetti();
    initSaleCountdown();
    animateNumbers();
    initNewFeatures(); // Call new features here
}, 100);

// === UPGRADES: Advanced UI Effects ===

// 1. Skeleton Loading
function showSkeletonLoading() {
    grid.innerHTML = Array(6).fill(0).map(() => `
        <div class="product-card skeleton-card">
            <div class="product-image skeleton" style="height: 200px; width: 100%;"></div>
            <div class="product-info">
                <div class="skeleton skeleton-text"></div>
                <div class="product-meta">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-text short"></div>
                </div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-btn"></div>
            </div>
        </div>
    `).join('');
}

// 2. Fly To Cart Animation
function flyToCart(imgElement) {
    if (!imgElement) return;

    // Find absolute position of image
    const rect = imgElement.getBoundingClientRect();
    const cartBtn = document.getElementById('cart-btn');
    const cartRect = cartBtn.getBoundingClientRect();

    // Create clone
    const clone = imgElement.cloneNode();
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.zIndex = '9999';
    clone.style.borderRadius = '50%';
    clone.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.2, 1)';
    clone.style.opacity = '0.8';

    document.body.appendChild(clone);

    // Trigger animation
    setTimeout(() => {
        clone.style.left = (cartRect.left + cartRect.width / 2 - 15) + 'px';
        clone.style.top = (cartRect.top + cartRect.height / 2 - 15) + 'px';
        clone.style.width = '30px';
        clone.style.height = '30px';
        clone.style.opacity = '0';
    }, 10);

    // Cleanup
    setTimeout(() => {
        clone.remove();
        cartBtn.classList.add('bump'); // Add CSS animation class if needed
    }, 800);
}

// 3. Hero Parallax Effect
function initHeroParallax() {
    const heroSection = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-img');
    const floatCards = document.querySelectorAll('.floating-card');

    if (!heroSection || !heroImg) return;

    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;

        heroImg.style.transform = `translateX(${x}px) translateY(${y}px)`;

        floatCards.forEach((card, index) => {
            const factor = (index + 1) * 3;
            card.style.transform = `translateX(${x * factor * -1}px) translateY(${y * factor * -1}px)`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        heroImg.style.transform = 'none';
        floatCards.forEach(card => card.style.transform = 'none');
    });
}

// 4. Scroll Reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Hook into global render
    const originalRender = window.renderProducts || renderProducts;
    window.renderProducts = function (items) {
        if (typeof originalRender === 'function') originalRender(items);
        else console.error('Original renderProducts not found');

        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.add('reveal-on-scroll');
            observer.observe(card);
        });
    };
}

// Hook into addToCart to trigger animation
// Hook into addToCart to trigger animation
const animationAddToCartBase = window.addToCart;
window.addToCart = function (id) {
    // Find the image of the product card
    const event = window.event;
    if (event && event.target) {
        const card = event.target.closest('.product-card');
        if (card) {
            const img = card.querySelector('.product-image');
            if (img) flyToCart(img);
        } else {
            // Maybe it's from detail modal
            const modalImg = document.querySelector('#product-detail-body img');
            if (modalImg && document.getElementById('product-modal').classList.contains('active')) {
                flyToCart(modalImg);
            }
        }
    }

    if (typeof animationAddToCartBase === 'function') {
        animationAddToCartBase(id);
    }
};

// Auto-run upgrades
setTimeout(() => {
    initHeroParallax();
    initScrollReveal();

    // Trigger initial skeleton
    const oldFilter = filterAndSort;
    showSkeletonLoading();
    setTimeout(() => {
        oldFilter();
    }, 1200);
}, 500);

// Handle Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const banner = document.getElementById('announcement-banner');

    // Check if banner is visible
    const bannerHeight = (banner && banner.style.display !== 'none') ? banner.offsetHeight : 0;

    if (window.scrollY > bannerHeight) {
        header.style.top = '0';
        header.classList.add('scrolled');
    } else {
        header.style.top = Math.max(0, bannerHeight - window.scrollY) + 'px';
        header.classList.remove('scrolled');
    }
});

// Update header position when banner is closed
const closeBannerBtn = document.getElementById('announcement-close');
if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
        const header = document.querySelector('.header');
        header.style.top = '0';
        document.body.style.paddingTop = '70px';
    });
}
