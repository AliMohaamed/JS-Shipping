// addCart.js

import { showCustomAlert } from "../custom/alert.js";
import {  loadAllCarts } from "../dataLoader.js";
import { fetchAddOrUpdateCart } from "../fetchData.js";
import { updateCartCount } from "../utils/updateCartCount.js";

export async function addToCart(products, productsGrid) {
  if (!productsGrid) {
    console.error("Products grid element not found");
    return;
  }

  await loadAllCarts();

  productsGrid.addEventListener("click", async (e) => {
    e.preventDefault()
    if (e.target.closest("form")) e.stopPropagation();
    const productBtn = e.target.closest(".add-to-cart");
    if (!productBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const productId = Number(productBtn.dataset.productId);
    if (!productId) {
      console.warn("Product ID not found");
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.warn("Product not found");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = createLocalCart(user, product);
    } else {
      const exists = cart.products.find(
        (item) => item.productId === product.id
      );
      if (exists) {
        showCustomAlert(
          "warning",
          "Cart",
          "Product already in cart",
          3000,
          "top-right"
        );
        return;
      }

      cart.products.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
      cart.totalPrice += product.price;
      cart.totalProducts += 1;
      cart.totalQuantity += 1;

      saveCart(cart);
    }

    if (user) {
      await fetchAddOrUpdateCart(cart);
    }

    showCustomAlert("success", "Success!", "Added to cart.", 3000, "top-right");
  });
}

// Helper Functions

function createLocalCart(user, product) {
  const cart = {
    id: user ? user.id : Date.now(),
    products: [
      {
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      },
    ],
    totalPrice: product.price,
    totalProducts: 1,
    totalQuantity: 1,
  };

  saveCart(cart);
  return cart;
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
