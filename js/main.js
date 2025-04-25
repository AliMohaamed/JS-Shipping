"use strict";
import { initSlider } from "./slider.js";
import {
  getCategories,
  loadCategories,
  loadProductsCategoryByName,
} from "./dataLoader.js";

const categoryGrid = document.querySelector(".category-grid");
document.addEventListener("DOMContentLoaded", function () {
  // Run all needed features
  initSlider();
});
// loadCategories();
async function initApp() {
  // await loadCategories();
  // displayCategoriesHeader();
  displayAllCategories();
}
initApp();

async function displayAllCategories() {
  categoryGrid.innerHTML = "";
  await loadCategories();
  const categories = getCategories();
  console.log(categories);
  categories.forEach(async(category) => {
    const data = await loadProductsCategoryByName(category.slug);
    const html = `
      <a href="../pages/shop.html" class="category-link">
        <div class="category-item">
          <div class="category-circle">
            <img src="${data.products[0].images[0]}" />
          </div>
          <div class="category-name">${category.name}</div>
        </div>
      </a>
    `;
    categoryGrid.insertAdjacentHTML('beforeend',html);
  });

}
