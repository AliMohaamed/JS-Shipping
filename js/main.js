"use strict";
import { initSlider } from "./slider.js";
import {
  getCategories,
  getCategoryImage,
  loadAllProducts,
  loadCategories,
} from "./dataLoader.js";
import { displayProducts } from "./products/products.js";

const categoryGrid = document.querySelector(".category-grid");
const productsGrid = document.querySelector(".products-grid");
document.addEventListener("DOMContentLoaded", function () {
  // Run all needed features
  initSlider();
});
// loadCategories();
async function initApp() {
  displayAllCategories();
  displayProducts(productsGrid);
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



