"use strict";

import { getCategories, loadCategories } from "./dataLoader.js";
import { displayProducts, displayProductsSorted } from "./products/products.js";
import { setupProductNavigation } from "./utils/productNavigation.js";
const productsGrid = document.querySelector(".products-grid");
document.addEventListener("DOMContentLoaded", async function () {
  await loadCategories();
  displayCategoriesHeader();
  // Range
  inputRange();
  // Open Or Close filter title btn
  openAndClose();
  // Clear All
  clearAll();
  // All Products
  await displayProducts(productsGrid, 20);
  sortProducts();
  // product details
  setupProductNavigation(productsGrid);
});

function sortProducts(){
  const sortSelect = document.querySelector('.sort-select');
  sortSelect.addEventListener('change',async function(){
    if (sortSelect.value === "default") {
      await displayProducts(productsGrid, 20);
    }else if(sortSelect.value === "price-asc"){
      await displayProductsSorted(productsGrid,'price','asc')
    }else if(sortSelect.value === "price-desc"){
      await displayProductsSorted(productsGrid,'price','desc')
    }else if(sortSelect.value === "rating"){
      await displayProductsSorted(productsGrid,'rating','desc')
    }
  })
}

// Display All Products
function displayCategoriesHeader() {
  const categories = getCategories();
  const categoryLabel = document.querySelector(".filter-options");

  if (!categoryLabel) return;

  categories.forEach((category) => {
    const html = `<label class="filter-checkbox">
                    <input type="checkbox" name="${category.slug}"/>
                    <span>${category.name}</span>
                    
                  </label>`;
    categoryLabel.insertAdjacentHTML("beforeend", html);
  });
}
function openAndClose() {
  const arrowButtons = document.querySelectorAll(".filter-title-btn");
  const filterBottomAll = document.querySelectorAll(".filter-bottom");
  arrowButtons.forEach((arrowButton)=>{
    arrowButton.addEventListener("click", function () {
      const filterBottom = arrowButton.nextElementSibling;
      filterBottom.classList.toggle("active");
      arrowButton.querySelector(".filter-arrow").textContent = filterBottom.classList.contains("active")
        ? "↱"
        : "↴";
    });
  })
}

// Range
function inputRange() {
  const rangeSlider = document.querySelector(".range-slider");
  const priceInputStart = document.querySelector(".price-input-start");
  const priceInputEnd = document.querySelector(".price-input-end");
  rangeSlider.addEventListener("input", () => {
    priceInputEnd.value = rangeSlider.value;
  });
}

// clear all
function clearAll(){
    const clearBtn = document.querySelector('.clear-btn');
    clearBtn.addEventListener('click',function(){
        document.querySelector(".price-input-end").value = '999';
        document.querySelector(".range-slider").value = '0';
        document.querySelectorAll("input[type='checkbox']").forEach((check)=>{
            check.checked = false
        })
    })
}

// 