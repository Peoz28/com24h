// Data
const products = [
    // Cơm (5 món)
    { id: 1, name: "Cơm Tấm Sườn Bì Chả", price: 45000, type: "com", image: "images/com-tam-suon-bi-cha.webp", desc: "Sườn nướng than hoa, bì thính, chả trứng, mỡ hành.", rating: 4.8 },
    { id: 2, name: "Cơm Gà Xối Mỡ", price: 50000, type: "com", image: "images/comgaxoimo.jpg", desc: "Gà góc tư chiên giòn, da giòn rụm, cơm chiên đỏ.", rating: 4.7 },
    { id: 3, name: "Cơm Văn Phòng Cá Kho", price: 40000, type: "com", image: "images/comvanphong.jpg", desc: "Cá basa kho tộ đậm đà, ăn kèm canh chua.", rating: 4.5 },
    { id: 4, name: "Cơm Chay Thập Cẩm", price: 35000, type: "com", image: "images/com-chien-thap-cam.webp", desc: "Đậu hũ sốt cà, rau xào, nấm kho, canh chay.", rating: 4.6 },
    { id: 5, name: "Combo Cơm Sườn + Cola", price: 60000, type: "com", image: "images/combo cola.jpg", desc: "Tiết kiệm hơn với combo cơm và nước ngọt.", rating: 4.9 },

    // Mì (5 món)
    { id: 6, name: "Mì Xào Bò", price: 45000, type: "mi", image: "images/mi-xao-bo.webp", desc: "Bò mềm xào cải thìa, mì trứng dai ngon.", rating: 4.7 },
    { id: 7, name: "Hủ Tiếu Nam Vang", price: 55000, type: "mi", image: "images/hu-tieu-nam-vang.webp", desc: "Tôm, trứng cút, thịt băm, nước dùng ngọt thanh.", rating: 4.8 },
    { id: 8, name: "Mì Ý Sốt Bò Băm", price: 50000, type: "mi", image: "images/my-y-sot-bo-bam.jpg", desc: "Sốt cà chua bò băm (Bolognese) chuẩn vị.", rating: 4.6 },
    { id: 9, name: "Mì Trộn Muối Ớt", price: 40000, type: "mi", image: "images/mitron.jpg", desc: "Cay nồng, toppings phong phú (bò viên, hải sản).", rating: 4.7 },
    { id: 10, name: "Phở Bò Tái Nạm", price: 60000, type: "mi", image: "images/phobo.jpg", desc: "Nước dùng phở gia truyền, bò tái mềm.", rating: 5.0 },

    // Nước (5 món)
    { id: 11, name: "Trà Sữa Trân Châu", price: 25000, type: "nuoc", image: "images/mon-sua-chua-tran-chau-duong-den.jpg", desc: "Trà sữa thái, trân châu đen dai dai.", rating: 4.8 },
    { id: 12, name: "Trà Đào Cam Sả", price: 30000, type: "nuoc", image: "images/tra-dao-cam-sa-cong-thuc-pha-che-chuan-vi.png", desc: "Thanh mát, giải nhiệt, miếng đào giòn.", rating: 4.9 },
    { id: 13, name: "Nước Ép Dưa Hấu", price: 20000, type: "nuoc", image: "images/nuocepduahau.webp", desc: "Nguyên chất 100%, không đường.", rating: 4.6 },
    { id: 14, name: "Coca Cola Tươi", price: 15000, type: "nuoc", image: "images/coca.jpg", desc: "Ly lớn, kèm chanh tươi/đá.", rating: 4.5 },
    { id: 15, name: "Chanh Tuyết Đá Xay", price: 25000, type: "nuoc", image: "images/chanhtyet.webp", desc: "Mát lạnh, chua ngọt sảng khoái.", rating: 4.7 },
];

let cart = [];

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

// Init
function renderProducts(items) {
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" class="product-image" onclick="showDetail(${p.id})">
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <div class="product-meta">
                    <span class="product-rating"><i class="fas fa-star"></i> ${p.rating}</span>
                    <span class="product-price">${p.price.toLocaleString()}đ</span>
                </div>
                <p class="product-desc">${p.desc}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
            </div>
        </div>
    `).join('');
}

function showDetail(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    productDetailBody.innerHTML = `
        <img src="${p.image}" style="width:100%; height:300px; object-fit:cover; border-radius:16px 16px 0 0;">
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
        return;
    }

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

// Global scope
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.showDetail = showDetail;
window.scrollToMenu = () => document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });

// Sort & Filter
function filterAndSort() {
    const activeTab = document.querySelector('.tab.active');
    const cate = activeTab.dataset.cate;
    const sortVal = sortSelect.value;
    const keyword = searchInput.value.toLowerCase();

    let filtered = products.filter(p => {
        const matchCate = cate === 'all' || p.type === cate || (cate === 'selling' && p.rating >= 4.8);
        const matchSearch = p.name.toLowerCase().includes(keyword);
        return matchCate && matchSearch;
    });

    if (sortVal === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortVal === 'price-desc') filtered.sort((a, b) => b.price - a.price);

    renderProducts(filtered);
}

// Events
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterAndSort();
    });
});

sortSelect.addEventListener('change', filterAndSort);
document.getElementById('search-btn').addEventListener('click', filterAndSort);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filterAndSort();
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

const orderTrackingBtn = document.getElementById('order-tracking-btn');
const orderHistoryModal = document.getElementById('order-history-modal');
const orderHistoryList = document.getElementById('order-history-list');

// Load orders from localStorage
let orders = JSON.parse(localStorage.getItem('com24h_orders')) || [];

// ... [Previous Logic]

confirmOrderBtn.addEventListener('click', () => {
    // Validate form (simplified)
    const inputs = document.querySelectorAll('#checkout-form input');
    let valid = true;
    inputs.forEach(i => {
        if (i.hasAttribute('required') && !i.value) valid = false;
    });

    if (!valid) {
        showToast("Vui lòng điền đầy đủ thông tin!", 'error');
        return;
    }

    const payment = document.querySelector('input[name="payment"]:checked').value;
    const orderId = '#' + Math.floor(100000 + Math.random() * 900000); // 6-digit ID

    // Create new order object
    const newOrder = {
        id: orderId,
        date: new Date().toLocaleString('vi-VN'),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        payment: payment === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản',
        status: 'pending' // pending, completed, cancelled
    };

    // Save order
    orders.unshift(newOrder); // Add to beginning
    localStorage.setItem('com24h_orders', JSON.stringify(orders));

    showToast(`Đặt hàng thành công! Mã đơn: ${orderId}`);

    cart = [];
    updateCartIcon();
    checkoutModal.classList.remove('active');
});

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

// Initial Render
renderProducts(products);

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
