function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const cartCountEl = document.getElementById("cart-count");
  if (!cartCountEl) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEl.innerText = totalItems;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
