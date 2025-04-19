"use strict";
// Call Pages

fetch("./../components/header/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;
  });
