let cart = [];

function toggleSearch() {
    const box = document.getElementById("searchBox");

    if (box.style.display === "block") {
        box.style.display = "none";
    } else {
        box.style.display = "block";
        document.getElementById("searchInput").focus();
    }
}

function searchProducts() {
    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    document.querySelectorAll(".product").forEach(product => {
        const text = product.innerText.toLowerCase();

        product.style.display =
            text.includes(search) ? "block" : "none";
    });
}

function filterProducts(category) {
    document.querySelectorAll(".product").forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}

function addToCart(name, price, currency) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            currency: currency,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

function updateCart() {

    const container = document.getElementById("cartItems");

    container.innerHTML = "";

    let itemCount = 0;
    let usd = 0;
    let iqd = 0;

    cart.forEach((item, index) => {

        itemCount += item.quantity;

        if (item.currency === "USD") {
            usd += item.price * item.quantity;
        }

        if (item.currency === "IQD") {
            iqd += item.price * item.quantity;
        }

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>
                ${item.price.toLocaleString()} ${item.currency}
                × ${item.quantity}
            </p>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        container.appendChild(div);
    });

    document.getElementById("cartCount").textContent = itemCount;
    document.getElementById("usdTotal").textContent =
        "$" + usd.toLocaleString();

    document.getElementById("iqdTotal").textContent =
        iqd.toLocaleString() + " IQD";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    document.getElementById("cart").classList.add("open");
}

function closeCart() {
    document.getElementById("cart").classList.remove("open");
}