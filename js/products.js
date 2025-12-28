// Get DOM elements
const categoryFilter = document.getElementById("category-filter");
const subcategoryFilter = document.getElementById("subcategory-filter");
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

// Populate categories dynamically
function populateCategories() {
  const categories = [...new Set(products.map((p) => p.category))];

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Populate subcategories based on selected category
function populateSubcategories(category) {
  // Clear old options
  subcategoryFilter.innerHTML =
    '<option value="all">All Sub Categories</option>';

  if (category === "all") return;

  const subCategories = [
    ...new Set(
      products
        .filter((p) => p.category === category)
        .map((p) => p.subCategory?.trim())
        .filter(Boolean)
    ),
  ];

  subCategories.forEach((sub) => {
    const option = document.createElement("option");
    option.value = sub;
    option.textContent = sub;
    subcategoryFilter.appendChild(option);
  });
}

// Show products based on filters
function showProducts() {
  const category = categoryFilter.value;
  const subCategory = subcategoryFilter.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (subCategory !== "all") {
    filtered = filtered.filter((p) => p.subCategory === subCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
  }

  // Render products
  productList.innerHTML = "";
  if (filtered.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach((p) => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Event listeners
categoryFilter.addEventListener("change", () => {
  populateSubcategories(categoryFilter.value);
  showProducts();
});

subcategoryFilter.addEventListener("change", showProducts);
searchInput.addEventListener("input", showProducts);

// Initial setup
populateCategories();
populateSubcategories(categoryFilter.value);
showProducts();
