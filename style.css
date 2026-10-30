"use strict";
/* =====================================================================
   TECHZONE - app.js
   Bo cuc file:
   1. Hang so & du lieu mau
   2. LocalStorage (doc/ghi an toan)
   3. Trang thai (state)
   4. Ham tien ich
   5. Nghiep vu: tim kiem - loc - sap xep
   6. Nghiep vu: CRUD san pham
   7. Nghiep vu: gio hang & thanh toan
   8. Hien thi giao dien (render)
   9. Modal, form, su kien
   10. Khoi dong
   ===================================================================== */

/* ---------- 1. HANG SO & DU LIEU MAU ---------- */
const KEYS = { products: "tz_products", cart: "tz_cart", fav: "tz_favorites", theme: "tz_theme" };
const CATEGORIES = ["Laptop", "Điện thoại", "Máy tính bảng", "Tai nghe", "Bàn phím & chuột", "Màn hình", "Phụ kiện"];
// Khoang gia: [nho nhat, lon nhat) - don vi dong
const PRICE_RANGES = {
  all: [0, Infinity], r1: [0, 5e6], r2: [5e6, 15e6], r3: [15e6, 30e6], r4: [30e6, Infinity]
};

// Tao nhanh 1 san pham mau
function sample(id, name, category, brand, price, oldPrice, stock, rating, featured, description) {
  const label = encodeURIComponent(name);
  return {
    id, name, category, brand, price, oldPrice, stock, rating, featured, description,
    image: "https://placehold.co/600x450/1e3a8a/ffffff?text=" + label
  };
}

function getSampleProducts() {
  return [
    sample("SP001", "MacBook Air M2 13 inch", "Laptop", "Apple", 24990000, 27990000, 8, 4.8, true, "Chip M2 mạnh mẽ, mỏng nhẹ, pin đến 18 giờ."),
    sample("SP002", "Dell XPS 13 Plus", "Laptop", "Dell", 36990000, 39990000, 4, 4.6, true, "Màn hình OLED 3.5K, thiết kế tối giản cao cấp."),
    sample("SP003", "Asus TUF Gaming F15", "Laptop", "Asus", 18990000, 0, 10, 4.4, false, "Core i5, RTX 3050, tản nhiệt tốt cho game thủ."),
    sample("SP004", "iPhone 15 128GB", "Điện thoại", "Apple", 19990000, 22990000, 15, 4.7, true, "Chip A16 Bionic, camera 48MP, cổng USB-C."),
    sample("SP005", "Samsung Galaxy S24", "Điện thoại", "Samsung", 17490000, 20990000, 12, 4.5, true, "Màn hình 120Hz, tích hợp Galaxy AI."),
    sample("SP006", "Xiaomi Redmi Note 13", "Điện thoại", "Xiaomi", 4990000, 5490000, 30, 4.3, false, "Pin 5000mAh, camera 108MP, giá dễ tiếp cận."),
    sample("SP007", "iPad Air 5 M1", "Máy tính bảng", "Apple", 14990000, 16990000, 6, 4.7, false, "Chip M1, màn hình 10.9 inch, hỗ trợ Apple Pencil."),
    sample("SP008", "Samsung Galaxy Tab S9 FE", "Máy tính bảng", "Samsung", 9490000, 0, 9, 4.2, false, "Bút S Pen đi kèm, chống nước IP68."),
    sample("SP009", "Sony WH-1000XM5", "Tai nghe", "Sony", 7490000, 8990000, 14, 4.9, true, "Chống ồn hàng đầu, pin 30 giờ."),
    sample("SP010", "AirPods Pro 2", "Tai nghe", "Apple", 5890000, 6790000, 20, 4.6, false, "Chống ồn chủ động, âm thanh không gian."),
    sample("SP011", "Logitech MX Keys S", "Bàn phím & chuột", "Logitech", 2690000, 0, 18, 4.5, false, "Bàn phím không dây, đèn nền thông minh."),
    sample("SP012", "Chuột Logitech MX Master 3S", "Bàn phím & chuột", "Logitech", 2190000, 2490000, 25, 4.8, false, "Cảm biến 8000 DPI, cuộn siêu êm."),
    sample("SP013", "Màn hình LG UltraGear 27 inch 144Hz", "Màn hình", "LG", 5290000, 5990000, 7, 4.4, false, "Tấm nền IPS, 144Hz, phản hồi 1ms."),
    sample("SP014", "Màn hình Dell UltraSharp 32 inch 4K", "Màn hình", "Dell", 16990000, 0, 3, 4.7, false, "Độ phân giải 4K, màu sắc chuẩn cho thiết kế."),
    sample("SP015", "Sạc dự phòng Anker 20000mAh", "Phụ kiện", "Anker", 890000, 1090000, 40, 4.5, false, "Sạc nhanh 22.5W, 2 cổng ra."),
    sample("SP016", "Cáp sạc USB-C 2m", "Phụ kiện", "Baseus", 190000, 250000, 100, 4.2, false, "Cáp bện dù chống đứt, hỗ trợ 100W.")
  ];
}

/* ---------- 2. LOCALSTORAGE ---------- */
// Doc du lieu: neu khong co hoac loi JSON -> tra ve gia tri mac dinh
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Dữ liệu lưu trữ bị lỗi:", key, err);
    return fallback;
  }
}

// Ghi du lieu: tra ve true/false de biet co thanh cong khong
function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    showToast("Không thể lưu dữ liệu vào trình duyệt.", "error");
    return false;
  }
}

// Kiem tra mang san pham doc tu LocalStorage co dung dinh dang khong
function cleanProducts(data) {
  if (!Array.isArray(data)) return null;
  const list = data.filter(p => p && typeof p.id === "string" && typeof p.name === "string"
    && p.name.trim() !== "" && Number.isFinite(p.price) && p.price >= 0
    && Number.isFinite(p.stock) && p.stock >= 0)
    .map(p => ({
      id: p.id, name: p.name, category: String(p.category || "Phụ kiện"), brand: String(p.brand || "Khác"),
      price: p.price, oldPrice: Number.isFinite(p.oldPrice) ? p.oldPrice : 0,
      image: String(p.image || ""), description: String(p.description || ""),
      rating: Number.isFinite(p.rating) ? Math.min(5, Math.max(0, p.rating)) : 4,
      stock: Math.floor(p.stock), featured: Boolean(p.featured)
    }));
  return list.length > 0 || data.length === 0 ? list : null;
}

/* ---------- 3. TRANG THAI ---------- */
let products = cleanProducts(readStorage(KEYS.products, null)) || getSampleProducts();
let cart = [];        // [{id, qty}]
let favorites = [];   // [id]
let editingId = null; // null = dang them moi; co gia tri = dang sua
let pendingConfirm = null; // ham chay khi bam "Dong y"

const filters = { keyword: "", category: "all", brand: "all", price: "all", sort: "default", favOnly: false };

/* ---------- 4. HAM TIEN ICH ---------- */
const $ = id => document.getElementById(id);

// Tao phan tu an toan (dung textContent, khong dung innerHTML)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function clearNode(node) { node.textContent = ""; }

function formatPrice(n) { return new Intl.NumberFormat("vi-VN").format(n) + " ₫"; }

// Bo dau tieng Viet de tim kiem "may tinh" van ra "Máy tính"
function normalize(str) {
  return String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

function starText(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function discountPercent(p) {
  return p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
}

function findProduct(id) { return products.find(p => p.id === id); }

// Tao ma san pham duy nhat: SP + so lon nhat + 1
function generateId() {
  const max = products.reduce((m, p) => {
    const n = parseInt(p.id.replace(/\D/g, ""), 10);
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return "SP" + String(max + 1).padStart(3, "0");
}

// Anh du phong (SVG) neu anh chinh khong tai duoc
const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='100%' height='100%' fill='#dbe7ff'/>" +
  "<text x='50%' y='50%' font-family='Arial' font-size='28' fill='#1e40af' text-anchor='middle'>TechZone - Chưa có ảnh</text></svg>");

function makeImage(src, alt) {
  const img = el("img");
  img.alt = alt;
  img.loading = "lazy";
  img.src = src || FALLBACK_IMG;
  img.onerror = () => { img.onerror = null; img.src = FALLBACK_IMG; };
  return img;
}

// Thong bao nho tren giao dien
function showToast(message, type) {
  const box = $("toastBox");
  const toast = el("div", "toast " + (type || "success"), message);
  box.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ---------- 5. TIM KIEM - LOC - SAP XEP ---------- */
function searchProducts(list, keyword) {
  const k = normalize(keyword.trim());
  return k === "" ? list : list.filter(p => normalize(p.name).includes(k));
}

function filterProducts(list) {
  const [min, max] = PRICE_RANGES[filters.price] || PRICE_RANGES.all;
  return list.filter(p =>
    (filters.category === "all" || p.category === filters.category) &&
    (filters.brand === "all" || p.brand === filters.brand) &&
    p.price >= min && p.price < max &&
    (!filters.favOnly || favorites.includes(p.id)));
}

function sortProducts(list) {
  const arr = [...list]; // sao chep de khong lam doi thu tu goc
  switch (filters.sort) {
    case "priceAsc": arr.sort((a, b) => a.price - b.price); break;
    case "priceDesc": arr.sort((a, b) => b.price - a.price); break;
    case "nameAsc": arr.sort((a, b) => a.name.localeCompare(b.name, "vi")); break;
    case "rating": arr.sort((a, b) => b.rating - a.rating); break;
  }
  return arr;
}

// Ket hop ca 3: tim kiem -> loc -> sap xep
function getVisibleProducts() {
  return sortProducts(filterProducts(searchProducts(products, filters.keyword)));
}

/* ---------- 6. CRUD SAN PHAM ---------- */
function saveProducts() { return writeStorage(KEYS.products, products); }

function addProduct(data) {
  products.push({ id: generateId(), ...data });
  return saveProducts();
}

function updateProduct(id, data) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products[index] = { ...products[index], ...data };
  // Neu ton kho giam, dieu chinh so luong trong gio
  const item = cart.find(c => c.id === id);
  if (item && item.qty > data.stock) item.qty = data.stock;
  cart = cart.filter(c => c.qty > 0);
  saveCart();
  return saveProducts();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  cart = cart.filter(c => c.id !== id);
  favorites = favorites.filter(f => f !== id);
  saveCart();
  writeStorage(KEYS.fav, favorites);
  return saveProducts();
}

// Kiem tra du lieu form san pham. Tra ve {errors, data}
function validateProduct(raw) {
  const errors = {};
  const name = raw.name.trim();
  const brand = raw.brand.trim();
  const price = raw.price.trim() === "" ? NaN : Number(raw.price);
  const stock = raw.stock.trim() === "" ? NaN : Number(raw.stock);
  const oldPrice = raw.oldPrice.trim() === "" ? 0 : Number(raw.oldPrice);
  const rating = raw.rating.trim() === "" ? 4 : Number(raw.rating);
  const image = raw.image.trim();

  if (name === "") errors.name = "Vui lòng nhập tên sản phẩm.";
  if (!CATEGORIES.includes(raw.category)) errors.category = "Vui lòng chọn danh mục.";
  if (brand === "") errors.brand = "Vui lòng nhập thương hiệu.";
  if (!Number.isFinite(price)) errors.price = "Giá bán phải là một số hợp lệ.";
  else if (price < 0) errors.price = "Giá bán không được âm.";
  if (!Number.isFinite(stock)) errors.stock = "Số lượng phải là một số hợp lệ.";
  else if (stock < 0 || !Number.isInteger(stock)) errors.stock = "Số lượng phải là số nguyên không âm.";
  if (!Number.isFinite(oldPrice) || oldPrice < 0) errors.oldPrice = "Giá cũ không hợp lệ.";
  else if (oldPrice > 0 && Number.isFinite(price) && oldPrice <= price) errors.oldPrice = "Giá cũ phải lớn hơn giá bán (hoặc để trống).";
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) errors.rating = "Đánh giá phải từ 0 đến 5.";
  if (image !== "" && !/^https?:\/\/\S+$/i.test(image) && !/^[\w\-./]+\.(png|jpe?g|webp|gif|svg)$/i.test(image)) {
    errors.image = "Đường dẫn ảnh không hợp lệ.";
  }

  return {
    errors,
    data: { name, category: raw.category, brand, price, oldPrice, stock, rating, image,
      description: raw.description.trim(), featured: raw.featured }
  };
}

/* ---------- 7. GIO HANG ---------- */
function saveCart() { writeStorage(KEYS.cart, cart); }

function getCartDetail() {
  return cart.map(c => ({ product: findProduct(c.id), qty: c.qty })).filter(x => x.product);
}

function cartTotal() {
  return getCartDetail().reduce((sum, x) => sum + x.product.price * x.qty, 0);
}

function cartCount() { return cart.reduce((s, c) => s + c.qty, 0); }

function addToCart(id) {
  const p = findProduct(id);
  if (!p) return;
  const item = cart.find(c => c.id === id);
  const current = item ? item.qty : 0;
  if (p.stock <= 0) { showToast("Sản phẩm đã hết hàng.", "error"); return; }
  if (current + 1 > p.stock) { showToast("Chỉ còn " + p.stock + " sản phẩm trong kho.", "error"); return; }
  if (item) item.qty++; else cart.push({ id, qty: 1 });
  updateCart();
  showToast("Đã thêm \"" + p.name + "\" vào giỏ hàng.");
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  const p = findProduct(id);
  if (!item || !p) return;
  const next = item.qty + delta;
  if (next > p.stock) { showToast("Không thể vượt quá tồn kho (" + p.stock + ").", "error"); return; }
  if (next <= 0) { removeFromCart(id); return; }
  item.qty = next;
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

// Luu gio hang + ve lai giao dien lien quan
function updateCart() {
  saveCart();
  renderCartBadge();
  renderCart();
}

function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index === -1) { favorites.push(id); showToast("Đã thêm vào yêu thích.", "info"); }
  else { favorites.splice(index, 1); showToast("Đã bỏ khỏi yêu thích.", "info"); }
  writeStorage(KEYS.fav, favorites);
  renderAll();
}

// Thanh toan mo phong
function checkout(info) {
  const items = getCartDetail();
  if (items.length === 0) { showToast("Giỏ hàng đang trống.", "error"); return false; }
  for (const x of items) {
    if (x.qty > x.product.stock) {
      showToast("\"" + x.product.name + "\" không đủ hàng.", "error");
      return false;
    }
  }
  items.forEach(x => { x.product.stock -= x.qty; }); // tru ton kho that
  const orderCode = "TZ" + Date.now().toString().slice(-6);
  const total = cartTotal();
  cart = [];
  saveProducts();
  saveCart();
  renderAll();
  showToast("Đặt hàng thành công! Mã đơn " + orderCode + " – " + formatPrice(total) + ". Cảm ơn " + info.name + "!");
  return true;
}

/* ---------- 8. HIEN THI GIAO DIEN ---------- */
function createCard(p) {
  const card = el("article", "card");

  const imgWrap = el("div", "card-img");
  imgWrap.appendChild(makeImage(p.image, p.name));
  const pct = discountPercent(p);
  if (pct > 0) imgWrap.appendChild(el("span", "tag-sale", "-" + pct + "%"));
  if (p.featured) imgWrap.appendChild(el("span", "tag-hot", "Nổi bật"));
  const fav = el("button", "icon-btn fav-btn" + (favorites.includes(p.id) ? " on" : ""), "♥");
  fav.type = "button";
  fav.setAttribute("aria-label", "Yêu thích " + p.name);
  fav.setAttribute("aria-pressed", String(favorites.includes(p.id)));
  fav.addEventListener("click", () => toggleFavorite(p.id));
  imgWrap.appendChild(fav);
  card.appendChild(imgWrap);

  const body = el("div", "card-body");
  body.appendChild(el("span", "card-cat", p.category));
  const nameBtn = el("button", "card-name", p.name);
  nameBtn.type = "button";
  nameBtn.addEventListener("click", () => openDetail(p.id));
  body.appendChild(nameBtn);
  body.appendChild(el("span", "card-meta", "Thương hiệu: " + p.brand));
  const rate = el("span", "card-meta");
  rate.appendChild(el("span", "stars", starText(p.rating)));
  rate.appendChild(document.createTextNode(" " + p.rating.toFixed(1)));
  body.appendChild(rate);

  const priceRow = el("div");
  priceRow.appendChild(el("span", "price", formatPrice(p.price)));
  if (p.oldPrice > p.price) priceRow.appendChild(el("span", "old-price", formatPrice(p.oldPrice)));
  body.appendChild(priceRow);

  const stockClass = p.stock === 0 ? "out" : (p.stock <= 5 ? "low" : "");
  const stockText = p.stock === 0 ? "Hết hàng" : "Còn " + p.stock + " sản phẩm";
  body.appendChild(el("span", "stock " + stockClass, stockText));

  const actions = el("div", "card-actions");
  const detailBtn = el("button", "btn btn-outline", "Xem chi tiết");
  detailBtn.type = "button";
  detailBtn.addEventListener("click", () => openDetail(p.id));
  const buyBtn = el("button", "btn btn-buy", "Thêm vào giỏ");
  buyBtn.type = "button";
  buyBtn.disabled = p.stock === 0;
  buyBtn.addEventListener("click", () => addToCart(p.id));
  actions.append(detailBtn, buyBtn);
  body.appendChild(actions);

  card.appendChild(body);
  return card;
}

function renderProducts() {
  const list = getVisibleProducts();
  const grid = $("productGrid");
  clearNode(grid);
  list.forEach(p => grid.appendChild(createCard(p)));
  $("emptyMsg").hidden = list.length > 0;
  $("resultInfo").textContent = "Hiển thị " + list.length + " / " + products.length + " sản phẩm";
}

function renderFeatured() {
  const grid = $("featuredGrid");
  clearNode(grid);
  const list = products.filter(p => p.featured);
  if (list.length === 0) grid.appendChild(el("p", "empty", "Chưa có sản phẩm nổi bật."));
  list.forEach(p => grid.appendChild(createCard(p)));
}

function fillSelect(select, options, current) {
  clearNode(select);
  options.forEach(([value, label]) => {
    const opt = el("option", "", label);
    opt.value = value;
    select.appendChild(opt);
  });
  select.value = options.some(o => o[0] === current) ? current : options[0][0];
}

// Cap nhat o chon danh muc & thuong hieu
function renderFilterOptions() {
  fillSelect($("categoryFilter"), [["all", "Tất cả danh mục"], ...CATEGORIES.map(c => [c, c])], filters.category);
  const brands = [...new Set(products.map(p => p.brand))].sort((a, b) => a.localeCompare(b, "vi"));
  fillSelect($("brandFilter"), [["all", "Tất cả thương hiệu"], ...brands.map(b => [b, b])], filters.brand);
  filters.category = $("categoryFilter").value;
  filters.brand = $("brandFilter").value;
}

function renderChips() {
  const box = $("categoryChips");
  clearNode(box);
  const items = [["all", "Tất cả", products.length], ...CATEGORIES.map(c => [c, c, products.filter(p => p.category === c).length])];
  items.forEach(([value, label, count]) => {
    const chip = el("button", "chip" + (filters.category === value ? " active" : ""), label + " (" + count + ")");
    chip.type = "button";
    chip.addEventListener("click", () => {
      filters.category = value;
      $("categoryFilter").value = value;
      renderAll();
      $("products").scrollIntoView();
    });
    box.appendChild(chip);
  });
}

function renderCartBadge() { $("cartCount").textContent = cartCount(); }

function renderCart() {
  const box = $("cartItems");
  clearNode(box);
  const items = getCartDetail();
  if (items.length === 0) box.appendChild(el("p", "cart-empty", "🛒 Giỏ hàng đang trống. Hãy chọn sản phẩm bạn thích!"));
  items.forEach(({ product: p, qty }) => {
    const row = el("div", "cart-row");
    row.appendChild(makeImage(p.image, p.name));

    const info = el("div");
    info.appendChild(el("div", "name", p.name));
    info.appendChild(el("small", "", formatPrice(p.price)));
    const qtyBox = el("div", "qty");
    const minus = el("button", "", "−");
    minus.type = "button";
    minus.setAttribute("aria-label", "Giảm số lượng");
    minus.addEventListener("click", () => changeQty(p.id, -1));
    const plus = el("button", "", "+");
    plus.type = "button";
    plus.setAttribute("aria-label", "Tăng số lượng");
    plus.disabled = qty >= p.stock;
    plus.addEventListener("click", () => changeQty(p.id, 1));
    qtyBox.append(minus, el("span", "", String(qty)), plus);
    info.appendChild(qtyBox);
    row.appendChild(info);

    const side = el("div", "sub");
    side.appendChild(el("div", "", formatPrice(p.price * qty)));
    const rm = el("button", "remove", "Xóa");
    rm.type = "button";
    rm.addEventListener("click", () => removeFromCart(p.id));
    side.appendChild(rm);
    row.appendChild(side);
    box.appendChild(row);
  });
  $("cartTotal").textContent = formatPrice(cartTotal());
}

function renderManage() {
  $("statProducts").textContent = products.length;
  $("statCategories").textContent = new Set(products.map(p => p.category)).size;
  $("statValue").textContent = formatPrice(products.reduce((s, p) => s + p.price * p.stock, 0));

  const body = $("manageBody");
  clearNode(body);
  products.forEach(p => {
    const tr = el("tr");
    [p.id, p.name, p.category, formatPrice(p.price), String(p.stock)].forEach(t => tr.appendChild(el("td", "", t)));
    const td = el("td");
    const view = el("button", "btn btn-outline", "Xem");
    const edit = el("button", "btn btn-primary", "Sửa");
    const del = el("button", "btn btn-danger", "Xóa");
    [view, edit, del].forEach(b => { b.type = "button"; });
    view.addEventListener("click", () => openDetail(p.id));
    edit.addEventListener("click", () => openForm(p.id));
    del.addEventListener("click", () => confirmDelete(p.id));
    td.append(view, edit, del);
    tr.appendChild(td);
    body.appendChild(tr);
  });
}

// Ve lai toan bo giao dien (goi sau khi du lieu thay doi)
function renderAll() {
  renderFilterOptions();
  renderChips();
  renderFeatured();
  renderProducts();
  renderCartBadge();
  renderCart();
  $("favCount").textContent = favorites.length;
  $("favToggle").setAttribute("aria-pressed", String(filters.favOnly));
  $("clearSearch").hidden = filters.keyword === "";
  if (!$("manageModal").hidden) renderManage();
}

/* ---------- 9. MODAL, FORM, SU KIEN ---------- */
function openModal(id) {
  const modal = $(id);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  const first = modal.querySelector("input, select, button");
  if (first) first.focus();
}

function closeModal(id) {
  $(id).hidden = true;
  if (!document.querySelector(".modal:not([hidden])")) document.body.style.overflow = "";
}

function openDetail(id) {
  const p = findProduct(id);
  if (!p) return;
  const body = $("detailBody");
  clearNode(body);
  body.appendChild(makeImage(p.image, p.name));

  const info = el("div");
  info.appendChild(el("span", "card-cat", p.category));
  info.appendChild(el("h2", "", p.name));
  const priceRow = el("p");
  priceRow.appendChild(el("span", "price", formatPrice(p.price)));
  if (p.oldPrice > p.price) {
    priceRow.appendChild(el("span", "old-price", formatPrice(p.oldPrice)));
    priceRow.appendChild(el("span", "tag-sale", " -" + discountPercent(p) + "%"));
  }
  info.appendChild(priceRow);
  info.appendChild(el("p", "", "Mã sản phẩm: " + p.id));
  info.appendChild(el("p", "", "Thương hiệu: " + p.brand));
  const rate = el("p");
  rate.appendChild(el("span", "stars", starText(p.rating)));
  rate.appendChild(document.createTextNode(" " + p.rating.toFixed(1) + " / 5"));
  info.appendChild(rate);
  info.appendChild(el("p", "stock " + (p.stock === 0 ? "out" : ""), p.stock === 0 ? "Hết hàng" : "Còn " + p.stock + " sản phẩm trong kho"));
  info.appendChild(el("p", "", p.description || "Chưa có mô tả."));

  const actions = el("div", "card-actions");
  const buy = el("button", "btn btn-buy", "Thêm vào giỏ");
  buy.type = "button";
  buy.disabled = p.stock === 0;
  buy.addEventListener("click", () => addToCart(p.id));
  const edit = el("button", "btn btn-primary", "Sửa");
  edit.type = "button";
  edit.addEventListener("click", () => { closeModal("detailModal"); openForm(p.id); });
  const del = el("button", "btn btn-danger", "Xóa");
  del.type = "button";
  del.addEventListener("click", () => confirmDelete(p.id));
  actions.append(buy, edit, del);
  info.appendChild(actions);

  body.appendChild(info);
  openModal("detailModal");
}

// ----- Form them / sua -----
const FORM_FIELDS = ["name", "category", "brand", "price", "oldPrice", "stock", "rating", "image", "description"];

function clearFormErrors() {
  FORM_FIELDS.forEach(f => {
    const err = $("e_" + f);
    if (err) err.textContent = "";
    $("f_" + f).classList.remove("invalid");
  });
}

function openForm(id) {
  editingId = id || null;
  clearFormErrors();
  fillSelect($("f_category"), [["", "-- Chọn danh mục --"], ...CATEGORIES.map(c => [c, c])], "");
  const p = id ? findProduct(id) : null;
  $("formTitle").textContent = p ? "Sửa sản phẩm " + p.id : "Thêm sản phẩm";
  $("saveProductBtn").textContent = p ? "Lưu thay đổi" : "Thêm sản phẩm";
  $("f_name").value = p ? p.name : "";
  $("f_category").value = p ? p.category : "";
  $("f_brand").value = p ? p.brand : "";
  $("f_price").value = p ? p.price : "";
  $("f_oldPrice").value = p && p.oldPrice ? p.oldPrice : "";
  $("f_stock").value = p ? p.stock : "";
  $("f_rating").value = p ? p.rating : "";
  $("f_image").value = p ? p.image : "";
  $("f_description").value = p ? p.description : "";
  $("f_featured").checked = p ? p.featured : false;
  openModal("formModal");
}

function handleProductSubmit(e) {
  e.preventDefault();
  clearFormErrors();
  const raw = {};
  FORM_FIELDS.forEach(f => { raw[f] = $("f_" + f).value; });
  raw.featured = $("f_featured").checked;

  const { errors, data } = validateProduct(raw);
  const keys = Object.keys(errors);
  if (keys.length > 0) {
    keys.forEach(k => { $("e_" + k).textContent = errors[k]; $("f_" + k).classList.add("invalid"); });
    $("f_" + keys[0]).focus();
    return;
  }

  const wasEditing = editingId !== null;
  const ok = wasEditing ? updateProduct(editingId, data) : addProduct(data);
  if (!ok) return; // loi luu tru da duoc bao
  closeModal("formModal");
  renderAll();
  showToast(wasEditing ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm mới.");
}

// ----- Xac nhan -----
function askConfirm(text, onYes) {
  $("confirmText").textContent = text;
  pendingConfirm = onYes;
  openModal("confirmModal");
}

function confirmDelete(id) {
  const p = findProduct(id);
  if (!p) return;
  askConfirm("Bạn có chắc muốn xóa \"" + p.name + "\"? Thao tác này không thể hoàn tác.", () => {
    if (deleteProduct(id)) {
      closeModal("detailModal");
      renderAll();
      showToast("Đã xóa sản phẩm.");
    }
  });
}

// ----- Thanh toan -----
function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = $("c_name").value.trim();
  const phone = $("c_phone").value.trim();
  const address = $("c_address").value.trim();
  let valid = true;
  const setErr = (key, msg) => { $("ec_" + key).textContent = msg; $("c_" + key).classList.toggle("invalid", msg !== ""); if (msg) valid = false; };

  if (cart.length === 0) { showToast("Giỏ hàng đang trống, hãy thêm sản phẩm trước.", "error"); return; }
  setErr("name", name === "" ? "Vui lòng nhập họ tên." : "");
  setErr("phone", /^0\d{9}$/.test(phone) ? "" : "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.");
  setErr("address", address === "" ? "Vui lòng nhập địa chỉ." : "");
  if (!valid) return;

  if (checkout({ name, phone, address })) {
    $("checkoutForm").reset();
    closeModal("cartModal");
  }
}

// ----- Giao dien sang/toi -----
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  $("themeToggle").textContent = theme === "dark" ? "☀ Giao diện sáng" : "🌙 Giao diện tối";
}

function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  writeStorage(KEYS.theme, next);
}

// ----- Dang ky su kien -----
function bindEvents() {
  // Tim kiem: cap nhat khi go
  $("searchInput").addEventListener("input", e => { filters.keyword = e.target.value; renderProducts(); $("clearSearch").hidden = filters.keyword === ""; });
  $("clearSearch").addEventListener("click", () => { filters.keyword = ""; $("searchInput").value = ""; $("searchInput").focus(); renderAll(); });

  // Loc & sap xep
  $("categoryFilter").addEventListener("change", e => { filters.category = e.target.value; renderAll(); });
  $("brandFilter").addEventListener("change", e => { filters.brand = e.target.value; renderProducts(); });
  $("priceFilter").addEventListener("change", e => { filters.price = e.target.value; renderProducts(); });
  $("sortSelect").addEventListener("change", e => { filters.sort = e.target.value; renderProducts(); });
  $("resetFilters").addEventListener("click", () => {
    Object.assign(filters, { keyword: "", category: "all", brand: "all", price: "all", sort: "default", favOnly: false });
    $("searchInput").value = "";
    $("priceFilter").value = "all";
    $("sortSelect").value = "default";
    renderAll();
    showToast("Đã đặt lại bộ lọc.", "info");
  });

  // Nut tren header
  $("favToggle").addEventListener("click", () => {
    filters.favOnly = !filters.favOnly;
    renderAll();
    $("products").scrollIntoView();
  });
  $("themeToggle").addEventListener("click", toggleTheme);
  $("openManage").addEventListener("click", () => { renderManage(); openModal("manageModal"); });
  $("openCart").addEventListener("click", () => { renderCart(); openModal("cartModal"); });

  // Quan ly
  $("addProductBtn").addEventListener("click", () => openForm(null));
  $("resetDataBtn").addEventListener("click", () => askConfirm("Khôi phục dữ liệu mẫu ban đầu? Mọi thay đổi sản phẩm và giỏ hàng sẽ bị mất.", () => {
    products = getSampleProducts();
    cart = [];
    favorites = [];
    saveProducts(); saveCart(); writeStorage(KEYS.fav, favorites);
    renderAll();
    showToast("Đã khôi phục dữ liệu mẫu.", "info");
  }));

  // Form
  $("productForm").addEventListener("submit", handleProductSubmit);
  $("checkoutForm").addEventListener("submit", handleCheckoutSubmit);
  $("confirmYes").addEventListener("click", () => {
    const action = pendingConfirm;
    pendingConfirm = null;
    closeModal("confirmModal");
    if (action) action();
  });

  // Dong modal: nut [data-close] hoac bam ra ngoai nen toi
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.hasAttribute("data-close")) closeModal(modal.id);
    });
  });
  // Phim Esc dong modal tren cung
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const open = [...document.querySelectorAll(".modal:not([hidden])")];
    if (open.length) closeModal(open[open.length - 1].id);
  });
}

/* ---------- 10. KHOI DONG ---------- */
function init() {
  const savedCart = readStorage(KEYS.cart, []);
  cart = Array.isArray(savedCart) ? savedCart.filter(c => c && typeof c.id === "string" && Number.isInteger(c.qty) && c.qty > 0) : [];
  // Bo san pham khong con ton tai & gioi han so luong theo ton kho
  cart = cart.filter(c => findProduct(c.id)).map(c => ({ id: c.id, qty: Math.min(c.qty, findProduct(c.id).stock) })).filter(c => c.qty > 0);
  const savedFav = readStorage(KEYS.fav, []);
  favorites = Array.isArray(savedFav) ? savedFav.filter(id => typeof id === "string") : [];

  const theme = readStorage(KEYS.theme, "light");
  applyTheme(theme === "dark" ? "dark" : "light");
  saveProducts(); // ghi lai du lieu da lam sach
  bindEvents();
  renderAll();
}

init();
