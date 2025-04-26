// add cart

import { showCustomAlert } from "../custom/alert.js";

// for performance and not use requests
export function addToCart(products, productsGrid) {
  if (!productsGrid) {
    console.error("Products grid element not found");
    return;
  }

  productsGrid.addEventListener("click", function (e) {
    const productBtnAddToCart = e.target.closest(".add-to-cart");
    if (!productBtnAddToCart) return;
    const productId = productBtnAddToCart.dataset.productId;
    if (!productId) {
      console.warn("Product ID not found on clicked element");
      return;
    }
    const product = products.find((item) => item.id === Number(productId));
    if (!product) {
      console.warn("Product not found");
      return;
    }
    const { id, title, price, thumbnail } = product;
    // if user logged in
    const isLoggedUser = JSON.parse(localStorage.getItem("user"));
    if (isLoggedUser) {
      // APi
    } else {
      // save in local storage
      // check if cart or not
      const cart = JSON.parse(localStorage.getItem("cart")); // object
      // cart in local storage
      if (cart) {
        //  check product in cart or not
        const checkProductInCart = cart.products.find(
          (item) => item.id === Number(productId)
        );
        if (checkProductInCart) {
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
        localStorage.setItem("cart", JSON.stringify(cart));
        showCustomAlert(
          "success",
          "Success!",
          "Add To Cart.",
          3000,
          "top-right"
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            id: Date.now(),
            products: [{ id, title, price, thumbnail, quantity: 1 }],
            totalPrice: product.price,
            totalProducts: 1,
          })
        );
        showCustomAlert(
          "success",
          "Success!",
          "Add To Cart.",
          3000,
          "top-right"
        );
      }
    }
  });
}
