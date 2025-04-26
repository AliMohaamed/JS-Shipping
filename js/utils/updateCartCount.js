export function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem("cart"));
    cartCount.textContent = cart ? cart.totalProducts : 0;
  }