# 🍱 Cơm 24h - Ứng Dụng Đặt Món Trực Tuyến Premium

![Project Banner](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge) ![Version](https://img.shields.io/badge/Version-2.0-orange?style=for-the-badge)

Chào mừng bạn đến với **Cơm 24h** - nền tảng đặt đồ ăn trực tuyến hiện đại, tối ưu hóa trải nghiệm người dùng với giao diện đậm chất công nghệ và nhiều tính năng thú vị.

---

## 🚀 Giới Thiệu

Cơm 24h không chỉ là một website đặt món đơn thuần. Đây là một ứng dụng web (Web App) hoàn chỉnh được xây dựng với tư duy "Mobile First" và "User Experience Focus". Ứng dụng cung cấp trải nghiệm đặt món mượt mà, từ việc lựa chọn món ăn, tuỳ chỉnh giỏ hàng, đến các tính năng giải trí như quay thưởng và theo dõi thống kê cá nhân.

## ✨ Tính Năng Nổi Bật

### 🛒 Trải Nghiệm Mua Sắm
*   **Menu Đa Dạng**: Hơn 15+ món ăn chia theo danh mục (Cơm 🍚, Mì 🍜, Giải khát 🥤).
*   **Tìm Kiếm & Lọc Thông Minh**: 
    *   Tìm kiếm realtime theo tên món.
    *   Bộ lọc nâng cao theo mức giá, đánh giá sao (⭐️).
    *   Sắp xếp theo giá, tên hoặc độ phổ biến.
*   **Giỏ Hàng Động**: Cập nhật số lượng, tính tổng tiền tự động, lưu trạng thái.
*   **Thanh Toán (Checkout)**: Giao diện 3 bước chuyên nghiệp (Giỏ hàng -> Thông tin -> Xác nhận) với tuỳ chọn COD hoặc Chuyển khoản.

### 🎮 Gamification & Tương Tác (Mới)
*   **Vòng Quay May Mắn (Spin Wheel)**: Tính năng giải trí giúp người dùng nhận mã giảm giá ngẫu nhiên mỗi ngày.
*   **Thành Tựu (Achievements)**: Hệ thống thông báo khi người dùng đạt mốc nhất định (VD: Đơn hàng đầu tiên).
*   **Flash Sale Countdown**: Đồng hồ đếm ngược khuyến mãi theo thời gian thực tạo cảm giác cấp bách.
*   **Hiệu Ứng Confetti**: Pháo giấy chúc mừng khi hoàn thành đơn hàng hoặc quay thưởng.

### 💬 Tiện Ích & Hỗ Trợ
*   **Chat Widget 24/7**: Chatbot mô phỏng hỗ trợ giải đáp thắc mắc, gợi ý menu.
*   **Dark Mode 🌙**: Chế độ tối bảo vệ mắt, chuyển đổi mượt mà.
*   **Thống Kê Cá Nhân**: Bảng điều khiển xem tổng chi tiêu, số đơn hàng và món ăn yêu thích.
*   **Sổ Địa Chỉ & Yêu Thích**: Lưu món ngon vào danh sách yêu thích (Wishlist).

### 📱 Kỹ Thuật (PWA)
*   **Progressive Web App**: Hỗ trợ cài đặt như ứng dụng native trên điện thoại/máy tính (qua `service-worker`).
*   **Responsive Design**: Tương thích hoàn hảo mọi kích thước màn hình (Mobile, Tablet, Desktop).
*   **Performance**: Tối ưu hoá tốc độ tải trang và UX.

---

## 🛠 Công Nghệ Sử Dụng

Dự án được xây dựng hoàn toàn bằng **Vanilla Web Technologies** để đảm bảo hiệu suất cao nhất và dễ dàng tuỳ biến:

*   **HTML5**: Semantic elements, SEO optimized.
*   **CSS3**: Custom properties (variables), Flexbox/Grid, Animations, Glassmorphism effects.
*   **JavaScript (ES6+)**: Xử lý logic phức tạp, DOM manipulation, LocalStorage, Canvas API (cho Spin Wheel).
*   **FontAwesome 6**: Hệ thống icon phong phú.
*   **Google Fonts**: Typography hiện đại với font 'Outfit'.

---

## 📦 Hướng Dẫn Cài Đặt & Chạy

Do không sử dụng Framework nặng hay Backend phức tạp, việc chạy dự án cực kỳ đơn giản:

1.  **Clone dự án** (hoặc tải file zip):
    ```bash
    git clone https://github.com/Peoz28/com24h.git
    cd com24h
    ```

2.  **Chạy dự án**:
    *   **Cách 1 (Khuyên dùng)**: Sử dụng Extension "Live Server" trên VS Code để có trải nghiệm reload tự động.
    *   **Cách 2**: Mở trực tiếp file `index.html` bằng trình duyệt web bất kỳ (Chrome, Edge, Safari...).

---

## 📂 Cấu Trúc Thư Mục

```
web-ban-com/
├── 📄 index.html          # Giao diện chính (Main UI)
├── 🎨 styles.css          # CSS Styles (Design System, Components, Responsive)
├── 🧠 app.js              # Logic ứng dụng (Cart, Filter, Events, Modal)
├── ⚙️ service-worker.js   # Cấu hình PWA (Cache, Offline support)
├── 📄 manifest.json       # Metadata cho PWA
├── 📁 images/             # Tài nguyên hình ảnh, icon
└── 📄 README.md           # Tài liệu dự án
```

## ⚠️ Lưu Ý

*   Đây là **Frontend Project**. Các tính năng như "Đặt hàng", "Chat bot", "Đăng nhập" vận hành ở phía client (Mô phỏng) và dữ liệu được lưu tạm thời trên trình duyệt (hoặc reset khi reload tuỳ tính năng).
*   Để trải nghiệm tốt nhất tính năng PWA, hãy chạy trên môi trường `localhost` hoặc `https`.

---

**Developed with ❤️ by Peoz28**
*Chúc bạn có những bữa ăn ngon miệng cùng Cơm 24h!*
