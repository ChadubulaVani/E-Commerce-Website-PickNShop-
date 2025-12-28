let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) {
    alert("Product not found!");
    return;
  }

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  alert("Item added to cart");
}

// Save cart and update badge
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count badge
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (countEl) {
    countEl.innerText = total;
  }
}

// Display cart items on cart page
function displayCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    if (totalEl) totalEl.innerText = 0;
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
        <div>
          <button onclick="changeQty(${item.id}, -1)">−</button>
          ${item.quantity}
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeItem(${item.id})">❌</button>
        </div>
      </div>
    `;
  });

  if (totalEl) totalEl.innerText = total;
}

// Change quantity of a cart item
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeItem(id);
  } else {
    saveCart();
    displayCart();
  }
}

// Remove item from cart
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  displayCart();
}

// Initialize cart on page load
updateCartCount();
displayCart();
