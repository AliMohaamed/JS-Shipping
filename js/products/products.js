import { generateStarRating } from "../custom/generateStarRating.js";
import { getProducts, getProductsSorted, loadProducts, loadProductsSorted } from "../dataLoader.js";

export async function displayProducts(productsGridElement, limit = 8) {
  productsGridElement.innerHTML = "";
  await loadProducts(limit);
  const products = getProducts();
  displayProductsElement(products, productsGridElement);
}
export async function displayProductsSorted(productsGridElement, key,order) {
  productsGridElement.innerHTML = "";
  await loadProductsSorted(key,order);
  const products = getProductsSorted();
  displayProductsElement(products, productsGridElement);
}


export function displayProductsElement(products,productsGridElement) {
  products.forEach((product) => {
    const html = `
          <a href="#" class="product-link" data-product-id="${product.id}">
            <div class="product-card" >
              <div class="product-image" >
                <img src="${product.images[0]}" />
              </div>
              <div class="ratings">
                <div>${generateStarRating(product.rating)}</div>
                <p class="stock">(${product.rating})</p>
              </div>
              <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="price-container">
                  <div class="current-price">$${product.price}</div>
                  <div class="original-price">$${(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}</div>
              </div>
              </div>
              <div class="product-actions">
                <button class="action-btn add-to-cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to Cart
                </button>
                <button class="action-btn view-details">
                  <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </a>
      `;
    productsGridElement.insertAdjacentHTML("beforeend", html);
  });
}
