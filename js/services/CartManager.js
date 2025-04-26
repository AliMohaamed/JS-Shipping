import { showCustomAlert } from "../custom/alert.js";
import { getAllCarts, loadAllCarts } from "../dataLoader.js";
import { fetchAddOrUpdateCart } from "../fetchData.js";

export class CartManager {
    constructor(user) {
      this.user = user;
      this.cart = JSON.parse(localStorage.getItem("cart")) || null;
    }
  
    async load() {
      await loadAllCarts();
      const carts = getAllCarts();
      if (this.user) {
        const serverCart = carts.find(c => c.id === this.user.id);
        if (serverCart && !this.cart) {
          this.cart = serverCart;
          localStorage.setItem("cart", JSON.stringify(this.cart));
        }
      }
    }
  
    async addProduct(product) {
      if (!this.cart) {
        this.createCart(product);
        if (this.user) await fetchAddOrUpdateCart(this.cart);
        return;
      }
  
      const exists = this.cart.products.find(p => p.id === product.id);
      if (exists) {
        showCustomAlert("warning", "Cart", "Product already in cart", 3000, "top-right");
        return;
      }
  
      this.cart.products.push(product);
      this.cart.totalPrice += product.price;
      this.cart.totalProducts += 1;
      this.cart.totalQuantity += 1;
  
      localStorage.setItem("cart", JSON.stringify(this.cart));
  
      if (this.user) {
        await fetchAddOrUpdateCart(this.cart);
      }
  
      showCustomAlert("success", "Success!", "Added to cart.", 3000, "top-right");
    }
  
    createCart(product) {
      this.cart = {
        id: this.user ? this.user.id : Date.now(),
        products: [product],
        totalPrice: product.price,
        totalProducts: 1,
        totalQuantity: 1,
      };
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  }
  