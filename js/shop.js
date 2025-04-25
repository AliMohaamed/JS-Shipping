"use strict";

import { getCategories, getProductById, loadCategories, loadProductById } from "./dataLoader.js";
import { displayProducts } from "./products/products.js";
export let product = {};
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
  // product details
  getProduct();

});

function getProduct() {
  productsGrid.addEventListener("click", (e) => {
    e.preventDefault();
    // prevent add to cart
    const addToCartPrevent = e.target.closest('.add-to-cart');
    if(addToCartPrevent) return;
    // click to any thing
    const clickedElement = e.target.closest('.product-link');
    console.log(clickedElement);
    if (!clickedElement) return;
    
    const productId = clickedElement.dataset.productId;
    if (!productId) return;
    console.log(productId);
    window.location.href = `../pages/productDetails.html?id=${productId}`;
  });
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