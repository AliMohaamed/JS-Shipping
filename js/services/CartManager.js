import { showCustomAlert } from "../custom/alert.js";
import { getAllCarts, loadAllCarts } from "../dataLoader.js";
import { fetchAddOrUpdateCart } from "../fetchData.js";

export class CartManager {
  constructor() {
    this.cart = this.loadCart();
  }

  loadCart() {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : this.createEmptyCart();
  }

  createEmptyCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      id: user?.id || Date.now(),
      products: [],
      totalPrice: 0,
      totalProducts: 0,
      totalQuantity: 0,
    };
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartCount();
  }

  updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = this.cart.totalProducts;
    }
  }

  async syncWithServer() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        await fetchAddOrUpdateCart(this.cart);
      } catch (error) {
        console.error("Failed to sync cart with server:", error);
      }
    }
  }

  addProduct(product) {
    const existingProduct = this.cart.products.find(
      (p) => p.productId === product.id
    );

    if (existingProduct) {
      if (existingProduct.quantity >= 10) return false;
      existingProduct.quantity += 1;
    } else {
      this.cart.products.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
      this.cart.totalProducts += 1;
    }

    this.cart.totalQuantity += 1;
    this.cart.totalPrice += product.price;
    this.saveCart();
    this.syncWithServer();
    return true;
  }

  removeProduct(productId) {
    const productIndex = this.cart.products.findIndex(
      (p) => p.productId === productId
    );
    if (productIndex === -1) return false;

    const product = this.cart.products[productIndex];
    this.cart.products.splice(productIndex, 1);
    this.cart.totalProducts -= 1;
    this.cart.totalQuantity -= product.quantity;
    this.cart.totalPrice -= product.price * product.quantity;

    if (this.cart.products.length === 0) {
      localStorage.removeItem("cart");
      this.cart = this.createEmptyCart();
    } else {
      this.saveCart();
    }

    this.syncWithServer();
    return true;
  }

  updateQuantity(productId, change) {
    const product = this.cart.products.find((p) => p.productId === productId);
    if (!product) return false;

    const newQuantity = Math.max(1, product.quantity + change);
    if (newQuantity === product.quantity) return false;

    const oldSubtotal = product.price * product.quantity;
    product.quantity = newQuantity;
    const newSubtotal = product.price * product.quantity;

    this.cart.totalPrice += newSubtotal - oldSubtotal;
    this.cart.totalQuantity += newQuantity - product.quantity;

    this.saveCart();
    this.syncWithServer();
    return true;
  }

  clearCart() {
    localStorage.removeItem("cart");
    this.cart = this.createEmptyCart();
    this.saveCart();
    this.syncWithServer();
  }

  getCart() {
    return this.cart;
  }
}
