// Function to load an HTML component into a placeholder
function loadComponent(selector, url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;

      // Update cart count if header loaded
      if (
        selector === "header-component" &&
        typeof updateCartCount === "function"
      ) {
        updateCartCount();
      }
    })
    .catch((err) => console.error(`Error loading ${url}:`, err));
}

// Load header and footer on page load
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-component", "header.html");
  loadComponent("footer-component", "footer.html");
});
