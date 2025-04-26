export function setupProductNavigation(productsGrid) {
  if (!productsGrid) {
    console.error("Products grid element not found");
    return;
  }

  productsGrid.addEventListener("click", handleProductClick);
}

function handleProductClick(e) {
  e.preventDefault();

  if (e.target.closest(".add-to-cart")) return;

  const productLink = e.target.closest(".product-link");
  if (!productLink) return;

  const productId = productLink.dataset.productId;
  if (!productId) {
    console.warn("Product ID not found on clicked element");
    return;
  }

  navigateToProductDetails(productId);
}

function navigateToProductDetails(productId) {
  window.location.href = `../pages/productDetails.html?id=${productId}`;
}
