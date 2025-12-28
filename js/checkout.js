document
  .getElementById("checkout-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Optionally, you could collect form values here if needed
    const name = this.querySelector('input[type="text"]').value;
    const address = this.querySelector("textarea").value;
    const phone = this.querySelector('input[type="tel"]').value;

    if (!name || !address || !phone) {
      alert("Please fill all required fields");
      return;
    }

    alert("Order placed successfully!");

    // Clear cart
    localStorage.removeItem("cart");

    // Update cart count on badge if main.js is included
    if (typeof updateCartCount === "function") {
      updateCartCount();
    }

    // Redirect to home page
    window.location.href = "index.html";
  });
