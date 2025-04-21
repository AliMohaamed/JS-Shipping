"use strict";
import { loadCategories, getCategories } from "./dataLoader.js";

fetch("./../components/header/header.html")
  .then((res) => res.text())
  .then(async (data) => {
    document.getElementById("header-container").innerHTML = data;
    setupMobileMenu();
    await loadCategories(); 
    displayCategoriesHeader(); 
  })
  .catch((err) => {
    console.log(err.message);
  });

function setupMobileMenu() {
  const navLinks = document.querySelector(".main-nav");
  const menu = document.querySelector(".mobile-menu-toggle");
  menu?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menu.firstElementChild.src = navLinks.classList.contains("active")
      ? "../../assets/icons/x.svg"
      : "../../assets/icons/menu.svg";
  });
}

function displayCategoriesHeader() {
  const categories = getCategories();
  const categorySelect = document.querySelector(".category-dropdown");

  if (!categorySelect) return;

  categories.forEach((category) => {
    const html = `<option value="${category.slug}">${category.name}</option>`;
    categorySelect.insertAdjacentHTML("beforeend", html);
  });
}
