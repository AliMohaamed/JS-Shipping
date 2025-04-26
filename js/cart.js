import { fetchAddOrUpdateCart } from "./fetchData.js";

const main = document.querySelector(".main-content");
const cartTableBody = document.querySelector(".cart-table tbody");
const orderTableBody = document.querySelector(".order-card tbody");
const totalPrice = document.querySelector(".total-price");

document.addEventListener("DOMContentLoaded", function () {
  displayCarts();
});

async function displayCarts() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || !cart.products.length) {
    main.innerHTML = emptyCart();
    return;
  }

  cartTableBody.innerHTML = "";
  orderTableBody.innerHTML = "";

  cart.products.forEach((product) => {
    const cartHtml = `
      <tr class="cart-item" data-product-id="${product.productId}">
        <td data-label="Product">
          <div class="cart-product-info">
            <div class="cart-product-image">
              <img src="${product.thumbnail}" alt="${product.title}" />
            </div>
            <div class="cart-product-details">
              <h3>${product.title}</h3>
            </div>
          </div>
        </td>
        <td data-label="Price">$${product.price}</td>
        <td data-label="Quantity">
          <div class="quantity-control">
            <div class="quantity-btn quantity-btn-negative">−</div>
            <input type="text" class="quantity-input" value="${product.quantity}" readonly />
            <div class="quantity-btn quantity-btn-plus">+</div>
          </div>
        </td>
        <td data-label="Subtotal">$${(product.price * product.quantity).toFixed(2)}</td>
        <td>
          <button class="delete-btn">
            ${svgDelete()}
          </button>
        </td>
      </tr>
    `;

    const orderHtml = `
      <tr class="summary-item">
        <td>
          <div class="order-product-name">${product.title}</div>
        </td>
        <td>$${product.price * product.quantity}</td>
      </tr>
    `;

    cartTableBody.insertAdjacentHTML("beforeend", cartHtml);
    orderTableBody.insertAdjacentHTML("beforeend", orderHtml);
  });
  totalPrice.textContent = cart.totalPrice;
  setupQuantityControls(); 
}

function setupQuantityControls() {
  const cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach((item) => {
    const productId = Number(item.dataset.productId);
    const quantityInput = item.querySelector(".quantity-input");
    const plusBtn = item.querySelector(".quantity-btn-plus");
    const minusBtn = item.querySelector(".quantity-btn-negative");

    plusBtn.addEventListener("click", () => updateQuantity(productId, quantityInput, 1));
    minusBtn.addEventListener("click", () => updateQuantity(productId, quantityInput, -1));
  });

}

function updateQuantity(productId, inputElement, change) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return;

  const product = cart.products.find((p) => p.productId === productId);
  if (!product) return;

  product.quantity = Math.max(1, product.quantity + change);
  inputElement.value = product.quantity;

  const subtotalCell = inputElement.closest("tr").querySelector('[data-label="Subtotal"]');
  subtotalCell.textContent = `$${(product.price * product.quantity).toFixed(2)}`;

  localStorage.setItem("cart", JSON.stringify(cart));

  // Update server if user logged in
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    fetchAddOrUpdateCart(cart);
  }
}


function emptyCart() {
  return `
  <div class="container"> 
<div class="empty-container">
   <div class="empty-cart-container">
        <div class="cart-icon-circle">
            <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </div>
        <p class="empty-message">Your cart is empty!</p>
        <a href="./../index.html" class="continue-shopping-btn">Continue Shopping</a>
    </div>
    </div>
</div>  `;
}

function svgDelete() {
  return `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-trash2-icon lucide-trash-2"
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </svg>`;
}
