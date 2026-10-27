"use strict";
/* =====================================================================
   TECHZONE - app.js
   Muc luc:
   1. Hang so & du lieu mau        7. Gio hang
   2. LocalStorage                 8. Don hang
   3. Trang thai (state)           9. Yeu thich
   4. Tien ich (format, DOM, toast) 10. Modal & drawer
   5. Tim kiem - loc - sap xep     11. Render giao dien
   6. CRUD san pham                12. Su kien & khoi dong
   ===================================================================== */

/* ---------- 1. HANG SO & DU LIEU MAU ---------- */
const KEYS = {
  products: "techzone_products", cart: "techzone_cart", favorites: "techzone_favorites",
  orders: "techzone_orders", theme: "techzone_theme"
};
const CATEGORIES = ["Laptop", "Điện thoại", "Máy tính bảng", "Tai nghe", "Màn hình", "Bàn phím & chuột", "Phụ kiện"];
const CAT_EMOJI = { "Laptop": "💻", "Điện thoại": "📱", "Máy tính bảng": "📲", "Tai nghe": "🎧", "Màn hình": "🖥️", "Bàn phím & chuột": "⌨️", "Phụ kiện": "🔌" };
const NAV_CATEGORIES = ["Laptop", "Điện thoại", "Máy tính bảng", "Phụ kiện"];
const PAGE_SIZE = 8;
const PRICE_RANGES = { all: [0, Infinity], r1: [0, 5e6], r2: [5e6, 15e6], r3: [15e6, 30e6], r4: [30e6, Infinity] };

// Bieu tuong SVG (khung 100x100) dung de ve anh minh hoa cho tung danh muc
const ICONS = {
  "Laptop": "<rect x='20' y='26' width='60' height='40' rx='3'/><path d='M10 74h80l-6 6H16z'/>",
  "Điện thoại": "<rect x='34' y='12' width='32' height='76' rx='7'/><path d='M46 80h8'/>",
  "Máy tính bảng": "<rect x='22' y='16' width='56' height='68' rx='6'/><path d='M46 76h8'/>",
  "Tai nghe": "<path d='M24 60V50a26 26 0 0 1 52 0v10'/><rect x='18' y='56' width='13' height='24' rx='5'/><rect x='69' y='56' width='13' height='24' rx='5'/>",
  "Màn hình": "<rect x='12' y='20' width='76' height='48' rx='3'/><path d='M50 68v12M36 82h28'/>",
  "Bàn phím & chuột": "<rect x='8' y='34' width='84' height='32' rx='5'/><path d='M18 45h64M18 55h64' stroke-dasharray='5 5'/>",
  "Phụ kiện": "<rect x='30' y='28' width='40' height='52' rx='8'/><path d='M42 18v10M58 18v10M50 80v8'/>"
};

// Tao nhanh 1 san pham mau
function mk(n, name, brand, category, price, oldPrice, stock, rating, reviewCount, featured, description, createdAt) {
  const code = String(n).padStart(3, "0");
  return { id: "SP" + code, sku: "TZ-" + code, name, brand, category, price, oldPrice, image: "", description, rating, reviewCount, stock, featured, createdAt: createdAt + "T08:00:00.000Z" };
}

function getSampleProducts() {
  return [
    mk(1, "MacBook Air 13 inch M2", "Apple", "Laptop", 24990000, 27990000, 8, 4.8, 1240, true, "Chip M2, thiết kế mỏng nhẹ, pin dùng cả ngày. Phù hợp sinh viên và dân văn phòng.", "2026-01-10"),
    mk(2, "Dell XPS 13 Plus", "Dell", "Laptop", 36990000, 39990000, 4, 4.6, 380, true, "Màn hình OLED 3.5K, thiết kế tối giản cao cấp cho người làm sáng tạo.", "2026-02-05"),
    mk(3, "ASUS TUF Gaming F15", "ASUS", "Laptop", 18990000, null, 10, 4.4, 860, false, "Core i5, card RTX 3050, tản nhiệt tốt cho game thủ.", "2026-02-20"),
    mk(4, "Lenovo IdeaPad Slim 3", "Lenovo", "Laptop", 12490000, 13990000, 15, 4.2, 520, false, "Laptop học tập giá hợp lý, bàn phím thoải mái.", "2026-03-01"),
    mk(5, "iPhone 15 128GB", "Apple", "Điện thoại", 19990000, 22990000, 15, 4.7, 2100, true, "Chip A16 Bionic, camera 48MP, cổng USB-C.", "2026-03-12"),
    mk(6, "Samsung Galaxy S24", "Samsung", "Điện thoại", 17490000, 20990000, 12, 4.5, 970, true, "Màn hình 120Hz, tích hợp các tính năng AI.", "2026-03-25"),
    mk(7, "Xiaomi Redmi Note 13", "Xiaomi", "Điện thoại", 4990000, 5490000, 30, 4.3, 1500, false, "Pin 5000mAh, camera 108MP, giá dễ tiếp cận.", "2026-04-02"),
    mk(8, "OPPO A58", "OPPO", "Điện thoại", 4290000, null, 0, 4.0, 310, false, "Thiết kế trẻ trung, sạc nhanh. (Dữ liệu mẫu: đang hết hàng)", "2026-04-15"),
    mk(9, "iPad Air M1", "Apple", "Máy tính bảng", 14990000, 16990000, 6, 4.7, 640, false, "Chip M1, màn hình 10.9 inch, hỗ trợ bút cảm ứng.", "2026-04-20"),
    mk(10, "Samsung Galaxy Tab S9 FE", "Samsung", "Máy tính bảng", 9490000, null, 9, 4.2, 280, false, "Kèm bút S Pen, chống nước, phù hợp ghi chú và giải trí.", "2026-05-03"),
    mk(11, "Sony WH-1000XM5", "Sony", "Tai nghe", 7490000, 8990000, 14, 4.9, 1800, true, "Chống ồn hàng đầu, pin khoảng 30 giờ.", "2026-05-10"),
    mk(12, "AirPods Pro 2", "Apple", "Tai nghe", 5890000, 6790000, 3, 4.6, 2400, false, "Chống ồn chủ động, âm thanh không gian. (Tồn kho thấp)", "2026-05-18"),
    mk(13, "LG UltraGear 27 inch 144Hz", "LG", "Màn hình", 5290000, 5990000, 7, 4.4, 410, false, "Tấm nền IPS, 144Hz, phản hồi 1ms cho game thủ.", "2026-05-25"),
    mk(14, "Dell UltraSharp 32 inch 4K", "Dell", "Màn hình", 16990000, null, 0, 4.7, 150, false, "Độ phân giải 4K, màu chuẩn cho thiết kế. (Dữ liệu mẫu: đang hết hàng)", "2026-06-01"),
    mk(15, "Logitech MX Keys S", "Logitech", "Bàn phím & chuột", 2690000, null, 18, 4.5, 700, false, "Bàn phím không dây, đèn nền thông minh, gõ êm.", "2026-06-08"),
    mk(16, "Logitech MX Master 3S", "Logitech", "Bàn phím & chuột", 2190000, 2490000, 25, 4.8, 1900, true, "Cảm biến 8000 DPI, cuộn siêu êm, kết nối nhiều thiết bị.", "2026-06-12"),
    mk(17, "Sạc dự phòng Anker 20000mAh", "Anker", "Phụ kiện", 890000, 1090000, 40, 4.5, 880, false, "Sạc nhanh 22.5W, 2 cổng ra tiện lợi.", "2026-06-20"),
    mk(18, "Cáp sạc USB-C 2m Baseus", "Baseus", "Phụ kiện", 190000, 250000, 2, 4.2, 330, false, "Cáp bện chống đứt, hỗ trợ sạc 100W. (Tồn kho thấp)", "2026-06-25")
  ];
}

/* ---------- 2. LOCALSTORAGE ---------- */
let storageWarned = false;

// Doc du lieu an toan: loi JSON hoac khong co -> tra ve fallback
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (err) {
    console.warn("Dữ liệu lưu trữ bị lỗi:", key, err);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    if (!storageWarned) { storageWarned = true; showToast("Không thể lưu dữ liệu vào trình duyệt. Thay đổi chỉ tồn tại tới khi tải lại trang.", "error"); }
    return false;
  }
}

// Kiem tra & chuan hoa mang san pham doc tu LocalStorage (tra ve null neu khong hop le)
function sanitizeProducts(data) {
  if (!Array.isArray(data)) return null;
  const seen = new Set();
  const list = [];
  data.forEach(p => {
    if (!p || typeof p.id !== "string" || seen.has(p.id)) return;
    if (typeof p.name !== "string" || p.name.trim() === "") return;
    if (!Number.isFinite(p.price) || p.price <= 0) return;
    if (!Number.isInteger(p.stock) || p.stock < 0) return;
    seen.add(p.id);
    list.push({
      id: p.id, sku: String(p.sku || p.id), name: p.name.trim(), brand: String(p.brand || "Khác"),
      category: CATEGORIES.includes(p.category) ? p.category : "Phụ kiện",
      price: p.price, oldPrice: Number.isFinite(p.oldPrice) && p.oldPrice > p.price ? p.oldPrice : null,
      image: typeof p.image === "string" ? p.image : "", description: String(p.description || ""),
      rating: Number.isFinite(p.rating) ? Math.min(5, Math.max(0, p.rating)) : 4,
      reviewCount: Number.isInteger(p.reviewCount) && p.reviewCount >= 0 ? p.reviewCount : 0,
      stock: p.stock, featured: Boolean(p.featured),
      createdAt: typeof p.createdAt === "string" && !isNaN(Date.parse(p.createdAt)) ? p.createdAt : new Date(0).toISOString()
    });
  });
  return list.length === data.length || (list.length > 0 && data.length > 0) ? list : (data.length === 0 ? [] : null);
}

/* ---------- 3. TRANG THAI ---------- */
let products = [];
let cart = [];       // [{id, qty}]
let favorites = [];  // [id]
let orders = [];     // danh sach don hang da dat
let pendingConfirm = null;
let editingId = null;
let lastFocus = null;
const modalStack = [];
const filters = { keyword: "", category: "all", brand: "all", price: "all", stock: "all", featured: false, sale: false, sort: "default", visible: PAGE_SIZE };

/* ---------- 4. TIEN ICH ---------- */
const $ = id => document.getElementById(id);

// Tao phan tu DOM an toan (khong dung innerHTML). attrs: class, text, onXxx, hoac thuoc tinh.
function h(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k in n) n[k] = v;
    else n.setAttribute(k, v);
  }
  kids.flat().forEach(c => { if (c != null && c !== false) n.append(c); });
  return n;
}
const clear = node => { node.textContent = ""; };

function formatCurrency(n) { return new Intl.NumberFormat("vi-VN").format(n) + " ₫"; }
function formatDate(iso) { return new Date(iso).toLocaleString("vi-VN"); }

// Bo dau tieng Viet de tim kiem de hon
function normalize(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim(); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

const findProduct = id => products.find(p => p.id === id);
const discountPercent = p => (p.oldPrice && p.oldPrice > p.price) ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

// Anh minh hoa SVG tu ve (khong can Internet), moi san pham co mau rieng
function productArt(p) {
  let hash = 0;
  for (const c of p.id + p.name) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  const hue = 190 + (hash % 90);
  const icon = ICONS[p.category] || ICONS["Phụ kiện"];
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='hsl(" + hue + ",85%,93%)'/><stop offset='1' stop-color='hsl(" + (hue + 25) + ",75%,82%)'/></linearGradient></defs>" +
    "<rect width='400' height='300' fill='url(#g)'/><g transform='translate(120 46) scale(1.6)' fill='none' stroke='hsl(" + hue + ",70%,32%)' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'>" + icon + "</g>" +
    "<text x='200' y='276' text-anchor='middle' font-family='Arial' font-size='20' font-weight='700' fill='hsl(" + hue + ",70%,28%)'>" + esc(p.brand).slice(0, 20) + "</text></svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Tao the <img>: neu URL anh loi -> dung anh minh hoa
function productImage(p, cls) {
  const img = h("img", { class: cls, src: p.image || productArt(p), alt: p.name, loading: "lazy" });
  img.addEventListener("error", () => { img.src = productArt(p); }, { once: true });
  return img;
}

function stars(rating) { const r = Math.round(rating); return "★".repeat(r) + "☆".repeat(5 - r); }

function ratingNode(p) {
  return h("div", { class: "rating", "aria-label": "Đánh giá " + p.rating.toFixed(1) + " trên 5" },
    h("span", { class: "stars", text: stars(p.rating) }), " " + p.rating.toFixed(1) + " (" + p.reviewCount + " · demo)");
}

function stockNode(p) {
  if (p.stock === 0) return h("span", { class: "stock none", text: "Hết hàng" });
  if (p.stock <= 5) return h("span", { class: "stock low", text: "Sắp hết: còn " + p.stock });
  return h("span", { class: "stock", text: "Còn hàng (" + p.stock + ")" });
}

// Thong bao nho (toast)
function showToast(message, type = "success") {
  const icons = { success: "✔", error: "✖", info: "ℹ", warn: "⚠" };
  const toast = h("div", { class: "toast " + type, role: "status" },
    h("span", { text: icons[type] || "ℹ", "aria-hidden": "true" }),
    h("span", { text: message }),
    h("button", { type: "button", "aria-label": "Đóng thông báo", text: "✕", onClick: () => toast.remove() }));
  $("toastBox").append(toast);
  while ($("toastBox").children.length > 4) $("toastBox").firstChild.remove();
  setTimeout(() => toast.remove(), 3800);
}

/* ---------- 5. TIM KIEM - LOC - SAP XEP ---------- */
// Tim theo ten, thuong hieu, danh muc
function searchProducts(list, keyword) {
  const k = normalize(keyword);
  if (!k) return list;
  return list.filter(p => normalize(p.name + " " + p.brand + " " + p.category).includes(k));
}

function filterProducts(list) {
  const [min, max] = PRICE_RANGES[filters.price] || PRICE_RANGES.all;
  return list.filter(p =>
    (filters.category === "all" || p.category === filters.category) &&
    (filters.brand === "all" || p.brand === filters.brand) &&
    p.price >= min && p.price < max &&
    (filters.stock === "all" || (filters.stock === "in" ? p.stock > 0 : p.stock === 0)) &&
    (!filters.featured || p.featured) &&
    (!filters.sale || discountPercent(p) > 0));
}

function sortProducts(list) {
  const a = [...list];
  switch (filters.sort) {
    case "priceAsc": a.sort((x, y) => x.price - y.price); break;
    case "priceDesc": a.sort((x, y) => y.price - x.price); break;
    case "nameAsc": a.sort((x, y) => x.name.localeCompare(y.name, "vi")); break;
    case "rating": a.sort((x, y) => y.rating - x.rating); break;
    case "newest": a.sort((x, y) => Date.parse(y.createdAt) - Date.parse(x.createdAt)); break;
  }
  return a;
}

// Ket hop: tim kiem -> loc -> sap xep (tren cung mot tap ket qua)
function getFilteredProducts() { return sortProducts(filterProducts(searchProducts(products, filters.keyword))); }

function setFilter(key, value) {
  filters[key] = value;
  filters.visible = PAGE_SIZE;
  renderFilters();
  renderProducts();
}

function resetFilters() {
  Object.assign(filters, { keyword: "", category: "all", brand: "all", price: "all", stock: "all", featured: false, sale: false, sort: "default", visible: PAGE_SIZE });
  $("searchInput").value = "";
  renderFilters();
  renderProducts();
}

function scrollToProducts() { $("products").scrollIntoView(); }

/* ---------- 6. CRUD SAN PHAM ---------- */
function saveProducts() { return writeStorage(KEYS.products, products); }

function generateId() {
  let n = products.reduce((m, p) => Math.max(m, parseInt(p.id.replace(/\D/g, ""), 10) || 0), 0) + 1;
  while (findProduct("SP" + String(n).padStart(3, "0"))) n++;
  return "SP" + String(n).padStart(3, "0");
}

function addProduct(data) {
  const id = generateId();
  products.push({ id, sku: "TZ-" + id.slice(2), reviewCount: 0, createdAt: new Date().toISOString(), ...data });
  return saveProducts();
}

function updateProduct(id, data) {
  const i = products.findIndex(p => p.id === id);
  if (i === -1) return false;
  products[i] = { ...products[i], ...data, id }; // giu nguyen ID
  syncCart();
  return saveProducts();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  cart = cart.filter(c => c.id !== id);
  favorites = favorites.filter(f => f !== id);
  writeStorage(KEYS.cart, cart);
  writeStorage(KEYS.favorites, favorites);
  return saveProducts();
}

// Kiem tra form san pham: tra ve { errors, data }
function validateProductForm(raw) {
  const errors = {};
  const num = s => (s.trim() === "" ? NaN : Number(s));
  const name = raw.name.trim(), brand = raw.brand.trim(), image = raw.image.trim();
  const price = num(raw.price), stock = num(raw.stock);
  const oldPrice = raw.oldPrice.trim() === "" ? null : Number(raw.oldPrice);
  const rating = raw.rating.trim() === "" ? 4 : Number(raw.rating);

  if (!name) errors.name = "Vui lòng nhập tên sản phẩm.";
  if (!brand) errors.brand = "Vui lòng nhập thương hiệu.";
  if (!CATEGORIES.includes(raw.category)) errors.category = "Vui lòng chọn danh mục hợp lệ.";
  if (!Number.isFinite(price)) errors.price = "Giá bán phải là số hợp lệ.";
  else if (price <= 0) errors.price = "Giá bán phải lớn hơn 0.";
  if (!Number.isFinite(stock)) errors.stock = "Tồn kho phải là số hợp lệ.";
  else if (!Number.isInteger(stock) || stock < 0) errors.stock = "Tồn kho phải là số nguyên không âm.";
  if (oldPrice !== null) {
    if (!Number.isFinite(oldPrice)) errors.oldPrice = "Giá gốc không hợp lệ.";
    else if (Number.isFinite(price) && oldPrice <= price) errors.oldPrice = "Giá gốc phải lớn hơn giá bán (hoặc để trống).";
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) errors.rating = "Đánh giá phải từ 0 đến 5.";
  if (image && !/^https?:\/\/\S+$/i.test(image) && !/^[\w\-./]+\.(png|jpe?g|webp|gif|svg)$/i.test(image)) errors.image = "URL hình ảnh không hợp lệ.";

  return { errors, data: { name, brand, category: raw.category, price, oldPrice, stock, rating, image, description: raw.description.trim(), featured: raw.featured } };
}

/* ---------- 7. GIO HANG ---------- */
function saveCart() { return writeStorage(KEYS.cart, cart); }

// Dong bo gio hang voi kho: bo san pham khong ton tai/het hang, gioi han so luong
function syncCart() {
  const before = JSON.stringify(cart);
  cart = cart.filter(c => findProduct(c.id) && findProduct(c.id).stock > 0)
    .map(c => ({ id: c.id, qty: Math.min(c.qty, findProduct(c.id).stock) })).filter(c => c.qty > 0);
  const changed = before !== JSON.stringify(cart);
  if (changed) saveCart();
  return changed;
}

const cartLines = () => cart.map(c => ({ p: findProduct(c.id), qty: c.qty })).filter(l => l.p);
const calculateCartTotal = () => cartLines().reduce((s, l) => s + l.p.price * l.qty, 0);
const cartCount = () => cart.reduce((s, c) => s + c.qty, 0);

function addToCart(id) {
  const p = findProduct(id);
  if (!p) { showToast("Sản phẩm không còn tồn tại.", "error"); return; }
  if (p.stock <= 0) { showToast("Sản phẩm đã hết hàng.", "error"); return; }
  const item = cart.find(c => c.id === id);
  if ((item ? item.qty : 0) + 1 > p.stock) { showToast("Chỉ còn " + p.stock + " sản phẩm trong kho.", "warn"); return; }
  if (item) item.qty++; else cart.push({ id, qty: 1 });
  updateCart();
  showToast("Đã thêm \"" + p.name + "\" vào giỏ hàng.");
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id), p = findProduct(id);
  if (!item || !p) return;
  const next = item.qty + delta;
  if (next > p.stock) { showToast("Không thể vượt quá tồn kho (" + p.stock + ").", "warn"); return; }
  if (next <= 0) { removeFromCart(id); return; }
  item.qty = next;
  updateCart();
}

function removeFromCart(id) { cart = cart.filter(c => c.id !== id); updateCart(); }

function updateCart() { saveCart(); renderBadges(); renderCart(); }

/* ---------- 8. DON HANG ---------- */
function saveOrders() { return writeStorage(KEYS.orders, orders); }

function newOrderCode() {
  const d = new Date();
  const day = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  let code;
  do { code = "TZ-" + day + "-" + String(Math.floor(1000 + Math.random() * 9000)); } while (orders.some(o => o.code === code));
  return code;
}

function validateCheckout(raw) {
  const e = {};
  if (!raw.name) e.name = "Vui lòng nhập họ tên.";
  if (!/^(0\d{9}|\+84\d{9})$/.test(raw.phone)) e.phone = "Số điện thoại gồm 10 số (bắt đầu bằng 0) hoặc +84.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.email)) e.email = "Email không hợp lệ.";
  if (!raw.address) e.address = "Vui lòng nhập địa chỉ nhận hàng.";
  return e;
}

function placeOrder(customer) {
  if (syncCart()) { renderCart(); renderBadges(); showToast("Giỏ hàng đã được điều chỉnh theo tồn kho. Vui lòng kiểm tra lại.", "warn"); showCartView(); return; }
  const lines = cartLines();
  if (lines.length === 0) { showToast("Giỏ hàng đang trống.", "error"); return; }

  const order = {
    code: newOrderCode(), createdAt: new Date().toISOString(), customer,
    items: lines.map(l => ({ id: l.p.id, name: l.p.name, price: l.p.price, qty: l.qty })), // luu gia tai thoi diem dat
    total: calculateCartTotal(), status: "Đang xử lý (demo)"
  };
  lines.forEach(l => { l.p.stock -= l.qty; });
  orders.unshift(order);
  cart = [];
  saveProducts(); saveOrders(); saveCart();
  $("checkoutForm").reset();
  closeModal("cartDrawer");
  renderAll();

  const body = $("successBody");
  clear(body);
  body.append(h("p", { text: "Cảm ơn " + customer.name + "! Mã đơn hàng của bạn:" }),
    h("div", { class: "order-code", text: order.code }),
    h("p", { class: "muted small", text: "Tổng tiền " + formatCurrency(order.total) + ". Đây là đơn mô phỏng, chỉ lưu trên trình duyệt này." }));
  openModal("successModal");
}

/* ---------- 9. YEU THICH ---------- */
function toggleFavorite(id) {
  const i = favorites.indexOf(id);
  if (i === -1) { favorites.push(id); showToast("Đã thêm vào yêu thích.", "info"); }
  else { favorites.splice(i, 1); showToast("Đã bỏ khỏi yêu thích.", "info"); }
  writeStorage(KEYS.favorites, favorites);
  renderAll();
}

/* ---------- 10. MODAL & DRAWER ---------- */
function openModal(id) {
  const m = $(id);
  if (!m.hidden) return;
  lastFocus = document.activeElement;
  m.hidden = false;
  modalStack.push(id);
  document.body.style.overflow = "hidden";
  const first = m.querySelector("input:not([type=checkbox]), select, textarea, .btn-primary, .btn-accent, button");
  if (first) first.focus({ preventScroll: true });
}

function closeModal(id) {
  const m = $(id);
  if (m.hidden) return;
  m.hidden = true;
  const i = modalStack.lastIndexOf(id);
  if (i !== -1) modalStack.splice(i, 1);
  if (modalStack.length === 0 && !$("filterPanel").classList.contains("open")) document.body.style.overflow = "";
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  if (id === "manageModal") setActiveNav(filters.category !== "all" && NAV_CATEGORIES.includes(filters.category) ? filters.category : "home");
}

function askConfirm(text, onYes) {
  $("confirmText").textContent = text;
  pendingConfirm = onYes;
  openModal("confirmModal");
}

function toggleFilterPanel(open) {
  $("filterPanel").classList.toggle("open", open);
  $("filterBackdrop").classList.toggle("show", open);
  document.body.style.overflow = open || modalStack.length ? "hidden" : "";
}

function setActiveNav(key) {
  document.querySelectorAll("#mainNav button").forEach(b => b.classList.toggle("active", b.dataset.nav === key));
}

// Dieu huong chung cho menu, footer, nut CTA
function goTo(key) {
  $("header").querySelector(".header-nav").classList.remove("open");
  $("menuBtn").setAttribute("aria-expanded", "false");
  if (key === "home") { window.scrollTo({ top: 0 }); setActiveNav("home"); }
  else if (key === "all") { resetFilters(); scrollToProducts(); setActiveNav("all"); }
  else if (key === "manage") { renderManage(); openModal("manageModal"); setActiveNav("manage"); }
  else if (CATEGORIES.includes(key)) { setFilter("category", key); scrollToProducts(); setActiveNav(NAV_CATEGORIES.includes(key) ? key : "all"); }
}

/* ---------- 11. RENDER GIAO DIEN ---------- */
function createCard(p) {
  const pct = discountPercent(p);
  const fav = favorites.includes(p.id);
  const img = h("div", { class: "card-img" }, productImage(p),
    h("div", { class: "badges" }, pct > 0 && h("span", { class: "badge sale", text: "-" + pct + "%" }), p.featured && h("span", { class: "badge hot", text: "Nổi bật" }), p.stock === 0 && h("span", { class: "badge out", text: "Hết hàng" })),
    h("button", { class: "icon-btn fav" + (fav ? " on" : ""), type: "button", text: "♥", "aria-pressed": String(fav), "aria-label": (fav ? "Bỏ yêu thích " : "Yêu thích ") + p.name, onClick: () => toggleFavorite(p.id) }));

  return h("article", { class: "card" }, img,
    h("div", { class: "card-body" },
      h("span", { class: "card-meta", text: p.brand + " · " + p.category }),
      h("button", { class: "card-name", type: "button", text: p.name, onClick: () => openDetail(p.id) }),
      ratingNode(p),
      h("div", { class: "price-row" }, h("span", { class: "price", text: formatCurrency(p.price) }), p.oldPrice && h("span", { class: "old-price", text: formatCurrency(p.oldPrice) })),
      stockNode(p),
      h("div", { class: "card-actions" },
        h("button", { class: "btn btn-outline", type: "button", text: "Chi tiết", onClick: () => openDetail(p.id) }),
        h("button", { class: "btn btn-accent", type: "button", text: p.stock === 0 ? "Hết hàng" : "Thêm giỏ", disabled: p.stock === 0, onClick: () => addToCart(p.id) }))));
}

function emptyState(title, text, withReset) {
  return h("div", { class: "empty" }, h("h3", { text: title }), h("p", { class: "muted", text }),
    withReset && h("button", { class: "btn btn-primary", type: "button", text: "Xóa bộ lọc", onClick: resetFilters }));
}

function renderProducts() {
  const grid = $("productGrid");
  clear(grid);
  const list = getFilteredProducts();
  $("resultCount").textContent = "Hiển thị " + Math.min(list.length, filters.visible) + " / " + list.length + " sản phẩm";
  if (products.length === 0) grid.append(emptyState("Chưa có sản phẩm", "Hãy mở Quản lý sản phẩm để thêm sản phẩm mới.", false));
  else if (list.length === 0) grid.append(emptyState("Không tìm thấy sản phẩm phù hợp", "Hãy thử đổi từ khóa hoặc nới lỏng bộ lọc.", true));
  list.slice(0, filters.visible).forEach(p => grid.append(createCard(p)));
  const more = list.length - filters.visible;
  $("loadMoreWrap").hidden = more <= 0;
  $("loadMoreBtn").textContent = "Xem thêm (" + Math.max(more, 0) + " sản phẩm)";
  $("clearSearch").hidden = filters.keyword === "";
}

function renderFeatured() {
  const grid = $("featuredGrid");
  clear(grid);
  const list = products.filter(p => p.featured).slice(0, 4);
  if (!list.length) grid.append(emptyState("Chưa có sản phẩm nổi bật", "Đánh dấu \"nổi bật\" khi thêm hoặc sửa sản phẩm.", false));
  list.forEach(p => grid.append(createCard(p)));
}

function fillSelect(sel, options, value) {
  clear(sel);
  options.forEach(([v, label]) => sel.append(h("option", { value: v, text: label })));
  sel.value = options.some(o => o[0] === value) ? value : options[0][0];
}

function renderFilters() {
  fillSelect($("fCategory"), [["all", "Tất cả danh mục"], ...CATEGORIES.map(c => [c, c])], filters.category);
  const brands = [...new Set(products.map(p => p.brand))].sort((a, b) => a.localeCompare(b, "vi"));
  fillSelect($("fBrand"), [["all", "Tất cả thương hiệu"], ...brands.map(b => [b, b])], filters.brand);
  filters.category = $("fCategory").value;
  filters.brand = $("fBrand").value;
  $("fPrice").value = filters.price; $("fStock").value = filters.stock; $("sortSelect").value = filters.sort;
  $("fFeatured").checked = filters.featured; $("fSale").checked = filters.sale;
  renderQuickCats();
}

function renderQuickCats() {
  const box = $("quickCats");
  clear(box);
  CATEGORIES.forEach(c => {
    const n = products.filter(p => p.category === c).length;
    box.append(h("button", { class: "cat-card" + (filters.category === c ? " active" : ""), type: "button", "aria-pressed": String(filters.category === c), onClick: () => goTo(c) },
      h("span", { class: "ico", text: CAT_EMOJI[c], "aria-hidden": "true" }), c, h("small", { text: n + " sản phẩm" })));
  });
}

function renderFooterCats() {
  const box = $("footerCats");
  clear(box);
  CATEGORIES.forEach(c => box.append(h("button", { class: "link-btn", type: "button", text: c, onClick: () => goTo(c) })));
}

function renderBadges() {
  $("cartCount").textContent = cartCount();
  $("favCount").textContent = favorites.length;
  $("cartCount").hidden = cartCount() === 0;
  $("favCount").hidden = favorites.length === 0;
}

function renderCart() {
  const list = $("cartList");
  clear(list);
  const lines = cartLines();
  $("cartFoot").hidden = lines.length === 0;
  if (!lines.length) {
    list.append(h("div", { class: "cart-empty" }, h("p", { text: "🛒 Giỏ hàng đang trống." }), h("button", { class: "btn btn-primary", type: "button", text: "Tiếp tục mua hàng", onClick: () => { closeModal("cartDrawer"); scrollToProducts(); } })));
  }
  lines.forEach(({ p, qty }) => {
    list.append(h("div", { class: "cart-row" }, productImage(p),
      h("div", {}, h("div", { class: "nm", text: p.name }), h("small", { class: "muted", text: formatCurrency(p.price) }),
        h("div", { class: "qty" },
          h("button", { type: "button", text: "−", "aria-label": "Giảm số lượng " + p.name, onClick: () => changeQty(p.id, -1) }),
          h("span", { text: String(qty), "aria-live": "polite" }),
          h("button", { type: "button", text: "+", "aria-label": "Tăng số lượng " + p.name, disabled: qty >= p.stock, onClick: () => changeQty(p.id, 1) }))),
      h("div", { class: "cart-side" }, h("strong", { text: formatCurrency(p.price * qty) }), h("button", { class: "remove", type: "button", text: "Xóa", onClick: () => removeFromCart(p.id) }))));
  });
  $("cartTotal").textContent = formatCurrency(calculateCartTotal());
  $("checkoutTotal").textContent = formatCurrency(calculateCartTotal());
}

function showCartView() { $("cartView").hidden = false; $("checkoutView").hidden = true; $("cartDrawer").removeAttribute("data-static"); }
function showCheckoutView() {
  if (!cartLines().length) { showToast("Giỏ hàng đang trống, hãy thêm sản phẩm trước.", "error"); return; }
  $("cartView").hidden = true; $("checkoutView").hidden = false; $("cartDrawer").setAttribute("data-static", "");
  $("k_name").focus();
}

function renderFavorites() {
  const box = $("favBody");
  clear(box);
  const list = favorites.map(findProduct).filter(Boolean);
  if (!list.length) { box.append(h("div", { class: "cart-empty" }, h("p", { text: "♡ Bạn chưa có sản phẩm yêu thích." }), h("p", { class: "small", text: "Bấm biểu tượng trái tim trên thẻ sản phẩm để lưu lại." }))); return; }
  list.forEach(p => box.append(h("div", { class: "cart-row" }, productImage(p),
    h("div", {}, h("div", { class: "nm", text: p.name }), h("small", { class: "muted", text: p.brand + " · " + formatCurrency(p.price) }), h("div", {}, stockNode(p))),
    h("div", { class: "cart-side" },
      h("button", { class: "btn btn-accent btn-sm", type: "button", text: "Thêm giỏ", disabled: p.stock === 0, onClick: () => addToCart(p.id) }),
      h("button", { class: "remove", type: "button", text: "Bỏ thích", onClick: () => toggleFavorite(p.id) })))));
}

function renderOrders() {
  const box = $("ordersBody");
  clear(box);
  if (!orders.length) { box.append(h("div", { class: "cart-empty", text: "📦 Chưa có đơn hàng nào. Đơn hàng bạn đặt sẽ hiển thị ở đây." })); return; }
  orders.forEach(o => box.append(h("details", { class: "order" },
    h("summary", {}, h("span", { text: o.code + " · " + formatDate(o.createdAt) }), h("span", { text: formatCurrency(o.total) + " · " + o.status })),
    h("div", { class: "body" },
      h("p", { text: "Khách hàng: " + o.customer.name + " · " + o.customer.phone + " · " + o.customer.email }),
      h("p", { text: "Địa chỉ: " + o.customer.address }),
      o.customer.note && h("p", { text: "Ghi chú: " + o.customer.note }),
      h("ul", {}, o.items.map(i => h("li", { text: i.name + " — " + i.qty + " × " + formatCurrency(i.price) + " = " + formatCurrency(i.qty * i.price) })))))));
}

function renderManage() {
  $("stTotal").textContent = products.length;
  $("stIn").textContent = products.filter(p => p.stock > 0).length;
  $("stOut").textContent = products.filter(p => p.stock === 0).length;
  $("stValue").textContent = formatCurrency(products.reduce((s, p) => s + p.price * p.stock, 0));
  const body = $("mBody");
  clear(body);
  const list = searchProducts(products, $("mSearch").value);
  if (!list.length) body.append(h("tr", {}, h("td", { colSpan: 6, text: "Không có sản phẩm phù hợp." })));
  list.forEach(p => {
    const tag = p.stock === 0 ? h("span", { class: "tag none", text: "Hết hàng" }) : h("span", { class: "tag" + (p.stock <= 5 ? " low" : ""), text: String(p.stock) });
    body.append(h("tr", {}, h("td", { text: p.id }), h("td", {}, p.name, h("small", { text: p.brand })), h("td", { text: p.category }), h("td", { text: formatCurrency(p.price) }), h("td", {}, tag),
      h("td", {},
        h("button", { class: "btn btn-outline btn-sm", type: "button", text: "Xem", onClick: () => openDetail(p.id) }),
        h("button", { class: "btn btn-primary btn-sm", type: "button", text: "Sửa", onClick: () => openProductForm(p.id) }),
        h("button", { class: "btn btn-danger btn-sm", type: "button", text: "Xóa", onClick: () => confirmDelete(p.id) }))));
  });
}

function renderAll() {
  renderFilters();
  renderFeatured();
  renderProducts();
  renderBadges();
  renderCart();
  if (!$("manageModal").hidden) renderManage();
  if (!$("favModal").hidden) renderFavorites();
  if (!$("ordersModal").hidden) renderOrders();
}

function openDetail(id) {
  const p = findProduct(id);
  if (!p) { showToast("Sản phẩm không còn tồn tại.", "error"); return; }
  const pct = discountPercent(p);
  const body = $("detailBody");
  clear(body);
  body.append(productImage(p),
    h("div", {},
      h("span", { class: "card-meta", text: p.brand + " · " + p.category }),
      h("h2", { text: p.name }),
      ratingNode(p),
      h("div", { class: "price-row" }, h("span", { class: "price", text: formatCurrency(p.price) }), p.oldPrice && h("span", { class: "old-price", text: formatCurrency(p.oldPrice) }), pct > 0 && h("span", { class: "badge sale", text: "-" + pct + "%" })),
      h("p", { text: p.description || "Chưa có mô tả." }),
      h("dl", { class: "spec" }, h("dt", { text: "Mã SP" }), h("dd", { text: p.id }), h("dt", { text: "SKU" }), h("dd", { text: p.sku }), h("dt", { text: "Tồn kho" }), h("dd", {}, stockNode(p)), h("dt", { text: "Ngày tạo" }), h("dd", { text: new Date(p.createdAt).toLocaleDateString("vi-VN") })),
      h("div", { class: "card-actions" },
        h("button", { class: "btn btn-accent", type: "button", text: "Thêm vào giỏ", disabled: p.stock === 0, onClick: () => addToCart(p.id) }),
        h("button", { class: "btn btn-outline", type: "button", text: favorites.includes(p.id) ? "Bỏ yêu thích" : "♥ Yêu thích", onClick: () => { toggleFavorite(p.id); openDetailRefresh(p.id); } }))));
  openModal("detailModal");
}
function openDetailRefresh(id) { $("detailModal").hidden = true; modalStack.splice(modalStack.lastIndexOf("detailModal"), 1); openDetail(id); }

/* ----- Form them / sua san pham ----- */
const FORM_FIELDS = ["name", "brand", "category", "price", "oldPrice", "stock", "rating", "image", "description"];

function clearFormErrors() {
  FORM_FIELDS.forEach(f => { const e = $("e_" + f); if (e) e.textContent = ""; $("f_" + f).classList.remove("invalid"); });
}

function openProductForm(id) {
  editingId = id || null;
  clearFormErrors();
  fillSelect($("f_category"), [["", "-- Chọn danh mục --"], ...CATEGORIES.map(c => [c, c])], "");
  const p = id ? findProduct(id) : null;
  if (id && !p) { showToast("Sản phẩm không còn tồn tại.", "error"); return; }
  $("formTitle").textContent = p ? "Sửa sản phẩm " + p.id : "Thêm sản phẩm";
  $("saveProductBtn").textContent = p ? "Lưu thay đổi" : "Thêm sản phẩm";
  const set = (f, v) => { $("f_" + f).value = v == null ? "" : v; };
  set("name", p && p.name); set("brand", p && p.brand); set("category", p && p.category); set("price", p && p.price);
  set("oldPrice", p && p.oldPrice); set("stock", p && p.stock); set("rating", p && p.rating); set("image", p && p.image); set("description", p && p.description);
  $("f_featured").checked = p ? p.featured : false;
  openModal("formModal");
}

function handleProductSubmit(e) {
  e.preventDefault();
  clearFormErrors();
  const raw = {};
  FORM_FIELDS.forEach(f => { raw[f] = $("f_" + f).value; });
  raw.featured = $("f_featured").checked;
  const { errors, data } = validateProductForm(raw);
  const keys = Object.keys(errors);
  if (keys.length) {
    keys.forEach(k => { $("e_" + k).textContent = errors[k]; $("f_" + k).classList.add("invalid"); });
    $("f_" + keys[0]).focus();
    return;
  }
  const editing = editingId !== null;
  if (editing && !findProduct(editingId)) { showToast("Sản phẩm không còn tồn tại.", "error"); closeModal("formModal"); return; }
  const ok = editing ? updateProduct(editingId, data) : addProduct(data);
  closeModal("formModal");
  renderAll();
  showToast(editing ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm mới." + (ok ? "" : " (chưa lưu được vào trình duyệt)"), ok ? "success" : "warn");
}

function confirmDelete(id) {
  const p = findProduct(id);
  if (!p) { showToast("Sản phẩm không còn tồn tại.", "error"); return; }
  askConfirm("Xóa \"" + p.name + "\"? Sản phẩm cũng sẽ bị gỡ khỏi giỏ hàng và danh sách yêu thích.", () => {
    deleteProduct(id);
    closeModal("detailModal");
    renderAll();
    showToast("Đã xóa sản phẩm.");
  });
}

/* ---------- 12. SU KIEN & KHOI DONG ---------- */
function handleCheckoutSubmit(e) {
  e.preventDefault();
  const raw = { name: $("k_name").value.trim(), phone: $("k_phone").value.trim(), email: $("k_email").value.trim(), address: $("k_address").value.trim(), note: $("k_note").value.trim() };
  ["name", "phone", "email", "address"].forEach(k => { $("ek_" + k).textContent = ""; $("k_" + k).classList.remove("invalid"); });
  const errors = validateCheckout(raw);
  const keys = Object.keys(errors);
  if (keys.length) { keys.forEach(k => { $("ek_" + k).textContent = errors[k]; $("k_" + k).classList.add("invalid"); }); $("k_" + keys[0]).focus(); return; }
  placeOrder(raw);
}

function handleNewsletter(e) {
  e.preventDefault();
  const msg = $("newsMsg"), email = $("newsEmail").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.className = "news-msg bad"; msg.textContent = "Email không hợp lệ, vui lòng kiểm tra lại."; return; }
  msg.className = "news-msg ok";
  msg.textContent = "Email hợp lệ. (Bản demo: chưa gửi tới máy chủ nào.)";
  $("newsEmail").value = "";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  $("themeBtn").textContent = theme === "dark" ? "☀️" : "🌙";
}

function bindEvents() {
  // Tim kiem
  $("searchInput").addEventListener("input", e => setFilter("keyword", e.target.value));
  $("searchForm").addEventListener("submit", e => { e.preventDefault(); setFilter("keyword", $("searchInput").value); scrollToProducts(); });
  $("clearSearch").addEventListener("click", () => { $("searchInput").value = ""; setFilter("keyword", ""); $("searchInput").focus(); });

  // Loc & sap xep
  $("fCategory").addEventListener("change", e => setFilter("category", e.target.value));
  $("fBrand").addEventListener("change", e => setFilter("brand", e.target.value));
  $("fPrice").addEventListener("change", e => setFilter("price", e.target.value));
  $("fStock").addEventListener("change", e => setFilter("stock", e.target.value));
  $("fFeatured").addEventListener("change", e => setFilter("featured", e.target.checked));
  $("fSale").addEventListener("change", e => setFilter("sale", e.target.checked));
  $("sortSelect").addEventListener("change", e => setFilter("sort", e.target.value));
  $("resetBtn").addEventListener("click", () => { resetFilters(); showToast("Đã xóa bộ lọc.", "info"); });
  $("loadMoreBtn").addEventListener("click", () => { filters.visible += PAGE_SIZE; renderProducts(); });
  $("filterToggle").addEventListener("click", () => toggleFilterPanel(true));
  $("closeFilters").addEventListener("click", () => toggleFilterPanel(false));
  $("filterBackdrop").addEventListener("click", () => toggleFilterPanel(false));

  // Header & dieu huong
  document.querySelectorAll("[data-nav]").forEach(b => b.addEventListener("click", () => goTo(b.dataset.nav)));
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => goTo(b.dataset.go)));
  $("menuBtn").addEventListener("click", () => {
    const nav = $("header").querySelector(".header-nav");
    const open = nav.classList.toggle("open");
    $("menuBtn").setAttribute("aria-expanded", String(open));
  });
  $("themeBtn").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next); writeStorage(KEYS.theme, next);
  });
  $("cartBtn").addEventListener("click", () => { showCartView(); renderCart(); openModal("cartDrawer"); });
  $("favBtn").addEventListener("click", () => { renderFavorites(); openModal("favModal"); });
  $("ordersBtn").addEventListener("click", () => { renderOrders(); openModal("ordersModal"); });
  window.addEventListener("scroll", () => $("header").classList.toggle("scrolled", window.scrollY > 10), { passive: true });

  // CTA
  $("heroExplore").addEventListener("click", () => goTo("all"));
  $("heroDeals").addEventListener("click", () => { resetFilters(); setFilter("sale", true); scrollToProducts(); });
  $("promoBtn").addEventListener("click", () => { resetFilters(); setFilter("sale", true); scrollToProducts(); });
  $("viewAllBtn").addEventListener("click", () => { resetFilters(); setFilter("featured", true); scrollToProducts(); });

  // Gio hang
  $("goCheckout").addEventListener("click", showCheckoutView);
  $("continueBtn").addEventListener("click", () => { closeModal("cartDrawer"); scrollToProducts(); });
  $("backCart").addEventListener("click", showCartView);
  $("checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  $("seeOrders").addEventListener("click", () => { closeModal("successModal"); renderOrders(); openModal("ordersModal"); });

  // Quan ly
  $("mAdd").addEventListener("click", () => openProductForm(null));
  $("mSearch").addEventListener("input", renderManage);
  $("mReset").addEventListener("click", () => askConfirm("Khôi phục dữ liệu demo? Sản phẩm, giỏ hàng, yêu thích và lịch sử đơn hàng hiện tại sẽ bị xóa.", () => {
    products = getSampleProducts(); cart = []; favorites = []; orders = [];
    saveProducts(); saveCart(); writeStorage(KEYS.favorites, favorites); saveOrders();
    renderAll(); showToast("Đã khôi phục dữ liệu demo.", "info");
  }));
  $("productForm").addEventListener("submit", handleProductSubmit);
  $("newsForm").addEventListener("submit", handleNewsletter);

  // Xac nhan
  $("confirmYes").addEventListener("click", () => { const fn = pendingConfirm; pendingConfirm = null; closeModal("confirmModal"); if (fn) fn(); });

  // Dong modal: nut [data-close] hoac bam nen (tru modal data-static)
  document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => {
    if (e.target.closest("[data-close]") || (e.target === m && !m.hasAttribute("data-static"))) closeModal(m.id);
  }));
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (modalStack.length) closeModal(modalStack[modalStack.length - 1]);
    else if ($("filterPanel").classList.contains("open")) toggleFilterPanel(false);
  });
}

function initApp() {
  // Tai san pham: khong co -> du lieu mau; hong -> khoi phuc + bao
  const raw = readStorage(KEYS.products, null);
  const clean = raw === null ? null : sanitizeProducts(raw);
  if (raw !== null && clean === null) showToast("Dữ liệu sản phẩm đã lưu bị lỗi, đã khôi phục dữ liệu mẫu.", "warn");
  products = clean || getSampleProducts();
  if (!clean) saveProducts();

  const rawCart = readStorage(KEYS.cart, []);
  cart = Array.isArray(rawCart) ? rawCart.filter(c => c && typeof c.id === "string" && Number.isInteger(c.qty) && c.qty > 0) : [];
  const rawFav = readStorage(KEYS.favorites, []);
  favorites = Array.isArray(rawFav) ? [...new Set(rawFav.filter(id => typeof id === "string" && findProduct(id)))] : [];
  const rawOrders = readStorage(KEYS.orders, []);
  orders = Array.isArray(rawOrders) ? rawOrders.filter(o => o && typeof o.code === "string" && o.customer && Array.isArray(o.items) && Number.isFinite(o.total)) : [];
  syncCart();

  applyTheme(readStorage(KEYS.theme, "light") === "dark" ? "dark" : "light");
  bindEvents();
  renderFooterCats();
  renderAll();
  setActiveNav("home");
}

initApp();
