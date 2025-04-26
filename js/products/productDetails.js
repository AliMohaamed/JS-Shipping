import { showCustomAlert } from "../custom/alert.js";
import { generateStarRating } from "../custom/generateStarRating.js";
import { loadProductById, getProductById } from "./../dataLoader.js";
let product = {};
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  if (!productId) {
    console.log("Product ID Not Found");
    return;
  }
  await loadAndDisplayProduct(productId);
  displayProduct(product);
  // Initialize quantity controls
  setupQuantityControls();
  // Products
  console.log(getProductById(productId));
});

async function loadAndDisplayProduct(id) {
  await loadProductById(id);
  const productFromAPI = getProductById();

  if (!productFromAPI) {
    showCustomAlert("error", "Error!", "Product not found!", 5000, "top-right");
    return;
  }
  product = productFromAPI;
}

function displayProduct(product) {
  const productDetailsContainer = document.querySelector(
    ".product-details-container"
  );
  productDetailsContainer.innerHTML = "";
  const html = `
        <div class="product-details-gallery">
          <di v class="product-details-main-image">
              <img src="${product.images[0]}" alt="${product.title}">
              <!-- <div class="fullscreen-icon">⤢</div> -->
          </di>
          <div class="thumbnail-container">
              <div class="thumbnail active">
                  <img src="${product.thumbnail}" alt="iMac front view">
              </div>
          </div>
        </div>
      
      <div class="product-details-info">
          <h1 class="product-details-title">${product.title}</h1>
          
          <div class="rating">
              <div class="rating-stars">
                ${generateStarRating(product.rating)}
              </div>
              <div class="review-container">
              <span class="review-count">(${product.reviews.length} customer reviews)</span>
              
              <div class="stock-status ${stock(product.stock)}">
                  <div class="stock-icon ${stock(product.stock)}-icon"></div>
                  ${product.availabilityStatus}
              </div>
              </div>
          </div>
          
          <div class="price-container">
              <span class="price">Price: $${product.price}</span>
              <span class="old-price">$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
              <span class="discount-badge">${Math.floor(product.discountPercentage)}% OFF</span>
          </div>
          
          <div class="delivery-info">
              <div class="info-item">
                  <div class="info-icon"></div>
                  ${product.warrantyInformation}
              </div>
              <div class="info-item">
                  <div class="info-icon"></div>
                  Sales ${Math.floor(product.discountPercentage)}% Off Use Code: PROMO30
              </div>
          </div>

          <div class="quantity-controls">
              <button class="quantity-btn quantity-btn-negative">−</button>
              <input type="number" readonly class="quantity-input" value="1">
              <button class="quantity-btn quantity-btn-plus">+</button>
          </div>
          
          <div class="buttons-container">
              <button class="purchase-btn">Purchase Now</button>
              <button class="cart-btn">Add to Cart</button>
          </div>
      </div>
  `;
  productDetailsContainer.insertAdjacentHTML('beforeend',html);
}

function stock(stockNumber) {
  if (stockNumber > 5) 
    return "in"
  else if(stockNumber > 3) return "warning"
  else if(stockNumber <= 0) return "out"
}


function setupQuantityControls() {
  
  const quantityInput = document.querySelector('.quantity-input');
  const plusBtn = document.querySelector('.quantity-btn-plus');
  const minusBtn = document.querySelector('.quantity-btn-negative');

  function handleQuantityChange(e) {
    const isIncrement = e.currentTarget.classList.contains('quantity-btn-plus');
    let value = Number(quantityInput.value);
    
    value = isIncrement ? value + 1 : Math.max(1, value - 1);
    quantityInput.value = value;
    quantityInput.dispatchEvent(new Event('change'));
  }

  plusBtn.addEventListener('click', handleQuantityChange);
  minusBtn.addEventListener('click', handleQuantityChange);
}