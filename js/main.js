"use strict";
import { initSlider } from "./slider.js";
import {
  getCategories,
  getCategoryImage,
  getProducts,
  loadAllProducts,
  loadCategories,
  loadProducts,
} from "./dataLoader.js";

const categoryGrid = document.querySelector(".category-grid");
const productsGrid = document.querySelector(".products-grid");
document.addEventListener("DOMContentLoaded", function () {
  // Run all needed features
  initSlider();
});
// loadCategories();
async function initApp() {
  // await loadCategories();
  // displayCategoriesHeader();
  displayAllCategories();
  displayProducts();
}
initApp();

async function displayAllCategories() {
  categoryGrid.innerHTML = "";

  await loadAllProducts();
  await loadCategories();

  const categories = getCategories();

  categories.forEach((category) => {
    const image = getCategoryImage(category.slug);

    const html = `
      <a href="../pages/shop.html" class="category-link">
        <div class="category-item">
          <div class="category-circle">
            <img src="${image || "fallback.jpg"}" />
          </div>
          <div class="category-name">${category.name}</div>
        </div>
      </a>
    `;
    categoryGrid.insertAdjacentHTML("beforeend", html);
  });
}

async function displayProducts() {
  productsGrid.innerHTML = "";

  await loadProducts(8);

  const products = getProducts();

  products.forEach((product) => {
    console.log(product);
    const html = `
        <a href="#" class="product-link">
          <div class="product-card">
            <div class="product-image">
              <img src="${product.images[0]}" />
            </div>
            <div class="product-rating">
              <div class="ratings">${renderStars(product.rating)}</div>
              <p class="stock">(${product.stock})</p>
            </div>
            <div class="product-info">
              <h3 class="product-title">${product.title}</h3>
              <div class="price-container">
                <div class="current-price">$${product.price}</div>
                <div class="original-price">$${(
                  product.price -
                  (product.price * product.discountPercentage) / 100
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
        </a>
    `;
    productsGrid.insertAdjacentHTML("beforeend", html);
  });
}

/*

            <div class="ratings"><div><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="fill-gray-4"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill=""></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="fill-gray-4"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill=""></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="fill-gray-4"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill=""></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="fill-gray-4"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill=""></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="fill-gray-4"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill=""></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg></div><p class="stock">(${
              product.stock
            })</p></div>
*/

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const totalStars = 5;
  let starsHTML = "";

  for (let i = 1; i <= totalStars; i++) {
    const fillClass = i <= fullStars ? "fill-gold" : "fill-gray-4";
    starsHTML += `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="${fillClass}">
        <g clip-path="url(#clip0_375_9172)">
          <path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" />
        </g>
        <defs>
          <clipPath id="clip0_375_9172">
            <rect width="18" height="18" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `;
  }

  return starsHTML;
}

