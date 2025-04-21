"use strict";
// Call Pages

fetch("./../components/header/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
    const navLinks = document.querySelector(".nav-container");
    const menu = document.querySelector(".mobile-menu-toggle");
    menu.addEventListener("click", () => {
      let div = document.createElement("div");
      div.classList.add("menu-responsive");
      
      div.append(navLinks);
      menu.after(div);
      console.log(div.parentElement);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
