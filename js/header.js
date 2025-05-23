"use strict";
import { loadCategories, getCategories } from "./dataLoader.js";
import { updateCartCount } from "./utils/updateCartCount.js";

fetch("../components/header/header.html")
  .then((res) => res.text())
  .then(async (data) => {
    document.getElementById("header-container").innerHTML = data;
    await new Promise((resolve) => setTimeout(resolve));
    const authHeader = document.querySelector(".auth-header");
    setupMobileMenu();
    await loadCategories();
    displayCategoriesHeader();
    // Auth
    const isLoggedUser = JSON.parse(localStorage.getItem("user"));
    const userName = document.querySelector(".username");
    authHeader.textContent = isLoggedUser ? "Logout" : "Login";
    userName.textContent = isLoggedUser ? `Hi ${isLoggedUser.name.split(" ")[0]}` : "Hi Guest";     
    console.log(userName);
    console.log(userName.textContent);
    authHeader.addEventListener("click", function (e) {
      e.preventDefault();
      if (isLoggedUser) {
        // logout
        localStorage.removeItem("user");
        location.reload();
      } else {
        // login
        location.href = "../pages/login.html";
      }
    });
    // cart
    updateCartCount();
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
