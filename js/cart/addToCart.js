// addCart.js

import { CartManager } from "../services/CartManager.js";
import { showCustomAlert } from "../custom/alert.js";

const MAX_QUANTITY = 10;

export async function addToCart(products, productsGrid) {
  if (!productsGrid) {
    console.error("Products grid element not found");
    return;
  }

  const cartManager = new CartManager();

  productsGrid.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.closest("form")) e.stopPropagation();

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

    try {
      if (cartManager.addProduct(product)) {
        showCustomAlert(
          "success",
          "Success!",
          "Added to cart.",
          3000,
          "top-right"
        );
      } else {
        showCustomAlert(
          "warning",
          "Cart",
          "Maximum quantity (10) reached for this product",
          3000,
          "top-right"
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showCustomAlert(
        "error",
        "Error",
        "Failed to add product to cart",
        3000,
        "top-right"
      );
    }
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
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  } catch (error) {
    console.error("Error saving cart:", error);
    showCustomAlert("error", "Error", "Failed to save cart", 3000, "top-right");
  }
}
