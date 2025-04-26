// addCart.js

import { showCustomAlert } from "../custom/alert.js";
import { getAllCarts, loadAllCarts } from "../dataLoader.js";
import { fetchAddOrUpdateCart } from "../fetchData.js";

export async function addToCart(products, productsGrid) {
  if (!productsGrid) {
    console.error("Products grid element not found");
    return;
  }

  await loadAllCarts();

  productsGrid.addEventListener("click", async (e) => {
    e.preventDefault();

    const productBtn = e.target.closest(".add-to-cart");
    if (!productBtn) return;

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

    if (user) {
      const carts = getAllCarts();
      const userCart = carts.find((c) => c.id === user.id);

      if (userCart) {
        if (!cart) {
          // Create local cart first if it doesn't exist
          cart = createLocalCart(product, user.id);
        } else {
          handleLocalCart(cart, product);
        }
      } else {
        // User has no cart on server
        if (cart) {
          handleLocalCart(cart, product);
          await fetchAddOrUpdateCart(cart);
        } else {
          cart = createLocalCart(product, user.id);
          await fetchAddOrUpdateCart(cart);
        }
      }
    } else {
      // Not logged in user
      if (cart) {
        handleLocalCart(cart, product);
      } else {
        createLocalCart(product);
      }
    }
  });
}

// functions

function handleLocalCart(cart, product) {
  const exists = cart.products.find((item) => item.id === product.id);
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

  cart.products.push(product);
  cart.totalPrice += product.price;
  cart.totalProducts += 1;
  cart.totalQuantity += 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  showCustomAlert("success", "Success!", "Added to cart.", 3000, "top-right");
}

function createLocalCart(product, userId = Date.now()) {
  const newCart = {
    id: userId,
    products: [product],
    totalPrice: product.price,
    totalProducts: 1,
    totalQuantity: 1,
  };

  localStorage.setItem("cart", JSON.stringify(newCart));
  showCustomAlert("success", "Success!", "Added to cart.", 3000, "top-right");
  return newCart;
}
