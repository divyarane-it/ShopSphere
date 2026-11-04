
const products = [
    {
        id: 1,
        name: "Pro Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.8,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        id: 2,
        name: "Smart Watch Series X",
        category: "electronics",
        price: 3299,
        rating: 4.7,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 3,
        name: "Classic Urban Sneakers",
        category: "fashion",
        price: 1899,
        rating: 4.6,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 4,
        name: "Premium Leather Backpack",
        category: "fashion",
        price: 2199,
        rating: 4.5,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    },
    {
        id: 5,
        name: "Minimalist Sunglasses",
        category: "accessories",
        price: 999,
        rating: 4.4,
        badge: "SALE",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 6,
        name: "Elegant Wrist Watch",
        category: "accessories",
        price: 1599,
        rating: 4.7,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600"
    },
    {
        id: 7,
        name: "Modern Table Lamp",
        category: "home",
        price: 1299,
        rating: 4.5,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
    },
    {
        id: 8,
        name: "Ceramic Coffee Set",
        category: "home",
        price: 799,
        rating: 4.3,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600"
    },
    {
        id: 9,
        name: "Wireless Gaming Mouse",
        category: "electronics",
        price: 1499,
        rating: 4.6,
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"
    },
    {
        id: 10,
        name: "Everyday Casual T-Shirt",
        category: "fashion",
        price: 699,
        rating: 4.2,
        badge: "VALUE PICK",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 11,
        name: "Premium Desk Organizer",
        category: "home",
        price: 899,
        rating: 4.4,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600"
    },
    {
        id: 12,
        name: "Luxury Handbag",
        category: "accessories",
        price: 2799,
        rating: 4.8,
        badge: "FEATURED",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    }
];

// Application state
let cart = JSON.parse(localStorage.getItem("shopsphereCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopsphereWishlist")) || [];
let activeCategory = "all";

// DOM elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const maxPrice = document.getElementById("maxPrice");
const categoryButtons = document.querySelectorAll("[data-category]");
const emptyState = document.getElementById("emptyState");
const productCount = document.getElementById("productCount");

const cartPanel = document.getElementById("cartPanel");
const wishlistPanel = document.getElementById("wishlistPanel");
const overlay = document.getElementById("overlay");

const formatPrice = price =>
    "₹" + Number(price).toLocaleString("en-IN");

function saveData() {
    localStorage.setItem("shopsphereCart", JSON.stringify(cart));
    localStorage.setItem("shopsphereWishlist", JSON.stringify(wishlist));
}

// Product rendering
function renderProducts() {
    let filteredProducts = [...products];

    if (activeCategory !== "all") {
        filteredProducts = filteredProducts.filter(
            product => product.category === activeCategory
        );
    }

    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    const selectedPrice = maxPrice.value;

if (selectedPrice !== "all") {
    filteredProducts = filteredProducts.filter(
        product => product.price <= Number(selectedPrice)
    );
}
    const sortValue = sortSelect.value;

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    productCount.textContent =
        `Showing ${filteredProducts.length} products`;

    productGrid.innerHTML = "";

    emptyState.style.display =
        filteredProducts.length === 0 ? "block" : "none";

    filteredProducts.forEach(product => {
        const isWishlisted = wishlist.includes(product.id);

        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge">${product.badge}</span>
                <button class="wishlist-toggle ${isWishlisted ? "active" : ""}"
                    data-wishlist="${product.id}" aria-label="Toggle wishlist">
                    ${isWishlisted ? "♥" : "♡"}
                </button>
            </div>

            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-rating">★ ${product.rating} / 5.0</p>

                <div class="product-bottom">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-cart-btn" data-cart="${product.id}">
                        + Add
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// Category filters
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        categoryButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        renderProducts();
    });
});

// Search and sorting
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
maxPrice.addEventListener("input", renderProducts);

// Event delegation for product buttons
productGrid.addEventListener("click", event => {
    const cartButton = event.target.closest("[data-cart]");
    const wishlistButton = event.target.closest("[data-wishlist]");

    if (cartButton) {
        addToCart(Number(cartButton.dataset.cart));
    }

    if (wishlistButton) {
        toggleWishlist(Number(wishlistButton.dataset.wishlist));
    }
});

// Cart functions
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveData();
    updateCart();
    showToast("Product added to cart!");
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const panelCount = document.getElementById("cartPanelCount");
    const cartTotal = document.getElementById("cartTotal");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    cartCount.textContent = totalQuantity;
    panelCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
        cartItems.innerHTML =
            `<p class="panel-empty">Your cart is empty. Start shopping!</p>`;
        return;
    }

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return "";

        return `
            <div class="panel-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="panel-item-info">
                    <h4>${product.name}</h4>
                    <p>${formatPrice(product.price)}</p>

                    <div class="panel-item-actions">
                        <button data-decrease="${product.id}">−</button>
                        <span>${item.quantity}</span>
                        <button data-increase="${product.id}">+</button>
                        <button class="remove-item" data-remove="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

document.getElementById("cartItems").addEventListener("click", event => {
    const decrease = event.target.closest("[data-decrease]");
    const increase = event.target.closest("[data-increase]");
    const remove = event.target.closest("[data-remove]");

    if (decrease) changeQuantity(Number(decrease.dataset.decrease), -1);
    if (increase) changeQuantity(Number(increase.dataset.increase), 1);
    if (remove) removeFromCart(Number(remove.dataset.remove));
});

function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    saveData();
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveData();
    updateCart();
    showToast("Product removed from cart.");
}

// Wishlist functions
function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast("Removed from wishlist.");
    } else {
        wishlist.push(productId);
        showToast("Added to wishlist!");
    }

    saveData();
    updateWishlist();
    renderProducts();
}

function updateWishlist() {
    const wishlistItems = document.getElementById("wishlistItems");
    const wishlistCount = document.getElementById("wishlistCount");

    wishlistCount.textContent = wishlist.length;

    if (wishlist.length === 0) {
        wishlistItems.innerHTML =
            `<p class="panel-empty">Your wishlist is empty.</p>`;
        return;
    }

    wishlistItems.innerHTML = wishlist.map(id => {
        const product = products.find(p => p.id === id);
        if (!product) return "";

        return `
            <div class="panel-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="panel-item-info">
                    <h4>${product.name}</h4>
                    <p>${formatPrice(product.price)}</p>
                    <div class="panel-item-actions">
                        <button data-wish-cart="${product.id}">Add to Cart</button>
                        <button class="remove-item" data-wish-remove="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

document.getElementById("wishlistItems").addEventListener("click", event => {
    const addButton = event.target.closest("[data-wish-cart]");
    const removeButton = event.target.closest("[data-wish-remove]");

    if (addButton) {
        addToCart(Number(addButton.dataset.wishCart));
    }

    if (removeButton) {
        toggleWishlist(Number(removeButton.dataset.wishRemove));
    }
});

// Panel controls
function openPanel(panel) {
    closePanels();
    panel.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closePanels() {
    cartPanel.classList.remove("active");
    wishlistPanel.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("cartBtn").addEventListener("click", () => {
    openPanel(cartPanel);
});

document.getElementById("wishlistBtn").addEventListener("click", () => {
    openPanel(wishlistPanel);
});

document.getElementById("closeCart").addEventListener("click", closePanels);
document.getElementById("closeWishlist").addEventListener("click", closePanels);
overlay.addEventListener("click", closePanels);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePanels();
});

// Checkout demo
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with ShopSphere! This is a demo checkout.");
});

// Reset filters
document.getElementById("resetFilters").addEventListener("click", () => {
    activeCategory = "all";
    searchInput.value = "";
    maxPrice.value = "";

    categoryButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === "all"
        );
    });

    sortSelect.selectedIndex = 0;
    renderProducts();
});

// Small notification
function showToast(message) {
    let toast = document.getElementById("shopToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "shopToast";

        Object.assign(toast.style, {
            position: "fixed",
            bottom: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#252b3b",
            color: "#fff",
            padding: "13px 22px",
            borderRadius: "10px",
            border: "1px solid rgba(146,112,255,.5)",
            zIndex: "200",
            fontSize: "13px",
            boxShadow: "0 8px 25px rgba(0,0,0,.3)"
        });

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
        toast.style.display = "none";
    }, 2200);
}

// Initial rendering
renderProducts();
updateCart();
updateWishlist();
