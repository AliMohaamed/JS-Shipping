"use strict";
fetch("./../components/header/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
    setupMobileMenu();
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
