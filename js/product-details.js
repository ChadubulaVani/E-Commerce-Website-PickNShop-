const container = document.getElementById("product-details");
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const product = products.find((p) => p.id === id);

if (product && container) {
  container.innerHTML = `
    <img src="${product.image}" style="width:300px">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <h3>₹${product.price}</h3>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
}
