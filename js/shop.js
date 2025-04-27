"use strict";

import { addToCart } from "./cart/addToCart.js";
import { backToTop } from "./custom/bactToTop.js";
import {
  getCategories,
  getProducts,
  getProductsByCategoryName,
  getProductsSorted,
  loadCategories,
  loadProductsByCategoryName,
} from "./dataLoader.js";
import {
  displayProducts,
  displayProductsElement,
  displayProductsSorted,
} from "./products/products.js";
import { setupProductNavigation } from "./utils/productNavigation.js";
const productsGrid = document.querySelector(".products-grid");
let products = [];
document.addEventListener("DOMContentLoaded", async function () {
  backToTop();
  await loadCategories();
  displayCategoriesHeader();
  // Display all products initially
  await displayProducts(productsGrid, 50);
  // Setup page features
  executedFunctions(productsGrid);
  products = getProducts();
  // sort products
  sortProducts();
  // in stock or not
  sortDependStocks(products, productsGrid);
  // range slider
  setupRangeSlider(products, productsGrid);
  // filter products by category
  filterProductsByCategory();

  // add to cart
  addToCart(products, productsGrid);
  // product details
  setupProductNavigation(productsGrid);
});
// Sort Products
function sortProducts() {
  const sortSelect = document.querySelector(".sort-select");
  sortSelect.addEventListener("change", async function () {
    if (sortSelect.value === sortSelect.options[0].value) {
      await displayProducts(productsGrid, 20);
      products = getProducts();
    } else if (sortSelect.value === "price-asc") {
      await displayProductsSorted(productsGrid, "price", "asc");
      products = getProductsSorted();
    } else if (sortSelect.value === "price-desc") {
      await displayProductsSorted(productsGrid, "price", "desc");
      products = getProductsSorted();
    } else if (sortSelect.value === "rating") {
      await displayProductsSorted(productsGrid, "rating", "desc");
      products = getProductsSorted();
    } 
    

    addToCart(products, productsGrid);
    sortDependStocks(products, productsGrid);
    setupRangeSlider(products, productsGrid);
    console.log(products);
  });
}

// in stock or not
async function sortDependStocks(products, productsGridElement) {
  const inStock = document.getElementById("inStock");
  const outOfStock = document.getElementById("outOfStock");

  function updateSortedProducts() {
    let sortProducts = [];

    if (inStock.checked && outOfStock.checked) {
      sortProducts = products;
    } else if (inStock.checked) {
      sortProducts = products.filter((product) => product.stock > 0);
    } else if (outOfStock.checked) {
      sortProducts = products.filter((product) => product.stock <= 0);
    } else {
      sortProducts = products;
    }
    console.log(sortProducts);
    productsGridElement.innerHTML = "";
    displayProductsElement(sortProducts, productsGridElement);
  }
  inStock.addEventListener("change", updateSortedProducts);
  outOfStock.addEventListener("change", updateSortedProducts);
}
// Categories Filter
// async function filterProductsByCategory() {
//   const checkboxes = document.querySelectorAll("input[type='checkbox']");
//   const productsGridElement = document.querySelector(".products-grid");

//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", async function () {
//       const selectedCategories = Array.from(checkboxes)
//         .filter((checkbox) => checkbox.checked)
//         .map((checkbox) => checkbox.name);

//       if (selectedCategories.length > 0) {
//         const filteredProducts = products.filter((product) =>
//           selectedCategories.includes(product.category)
//         );
//         productsGridElement.innerHTML = "";
//         displayProductsElement(filteredProducts, productsGridElement);
//       } else {
//         productsGridElement.innerHTML = "";
//         await displayProducts(productsGridElement, 50);
//       }
//     });
//   });
// }
async function filterProductsByCategory() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const productsGridElement = document.querySelector(".products-grid");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", async function (e) {
      const categorySlug = e.target.parentElement.dataset.categorySlug;
      const isChecked = e.target.checked;
      if(!isChecked) return;
      await loadProductsByCategoryName(categorySlug);
      const filteredProducts = getProductsByCategoryName();
      productsGridElement.innerHTML = "";
      displayProductsElement(filteredProducts, productsGridElement);
      // Reset the checkboxes
      checkboxes.forEach((check) => {
        if (check !== e.target) {
          check.checked = false;
        }
      });

    });
})
}

// ============ DISPLAY CATEGORIES ============ //
function displayCategoriesHeader() {
  const categories = getCategories();
  const categoryLabel = document.querySelector(".filter-options");

  if (!categoryLabel) return;

  categories.forEach((category) => {
    const html = `
      <label class="filter-checkbox" data-category-slug="${category.slug}">
        <input type="checkbox" name="${category.slug}"/>
        <span>${category.name}</span>
      </label>`;
    categoryLabel.insertAdjacentHTML("beforeend", html);
  });
}

// ============ SETUP UI INTERACTIONS ============ //
function executedFunctions() {
  setupAccordion();
  setupClearAll();
}

// ============ ACCORDION FILTERS ============ //
function setupAccordion() {
  const arrowButtons = document.querySelectorAll(".filter-title-btn");

  arrowButtons.forEach((arrowButton) => {
    arrowButton.addEventListener("click", function () {
      const filterBottom = arrowButton.nextElementSibling;
      filterBottom.classList.toggle("active");

      arrowButton.querySelector(".filter-arrow").textContent =
        filterBottom.classList.contains("active") ? "↱" : "↴";
    });
  });
}

// ============ PRICE RANGE SLIDER (UI only) ============ //
function setupRangeSlider(products, productsGridElement) {
  const rangeSlider = document.querySelector(".range-slider");
  const priceInputEnd = document.querySelector(".price-input-end");

  let filtersProducts = [];
  if (rangeSlider && priceInputEnd) {
    rangeSlider.addEventListener("input", () => {
      priceInputEnd.value = rangeSlider.value;
    });
    rangeSlider.addEventListener("change", () => {
      productsGridElement.innerHTML = "";
      filtersProducts = products.filter(
        (product) => product.price < Number(rangeSlider.value)
      );
      displayProductsElement(filtersProducts, productsGridElement);
    });
  }
}

// ============ CLEAR ALL FILTERS ============ //
function setupClearAll() {
  const clearBtn = document.querySelector(".clear-btn");

  if (!clearBtn) return;

  clearBtn.addEventListener("click", function () {
    const range = document.querySelector(".range-slider");
    const priceEnd = document.querySelector(".price-input-end");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    if (range) range.value = "0";
    if (priceEnd) priceEnd.value = "34000";

    checkboxes.forEach((check) => (check.checked = false));
  });
}
