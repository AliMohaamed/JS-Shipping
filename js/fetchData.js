// Fetch Products From API
export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.products;
}
// Get More than 194 products
export async function fetchAllProducts(limit = 194) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.products;
}
// Get all Categories From API
export async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
}

export async function fetchProductsCategoryByName(categoryName) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${categoryName}`
  );
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
}
// Get a single product
export async function fetchProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
}
// sort products by key
export async function fetchProductsSorted(key, order) {
  const res = await fetch(
    `https://dummyjson.com/products?sortBy=${key}&order=${order}`
  );
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.products;
}
// Get products by a category
export async function fetchProductsByCategoryName(categoryName) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${categoryName}`
  );
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.products;
}

// Users
const urlUsers = "http://localhost:3000/users";
export async function fetchAllUsers() {
  const res = await fetch(urlUsers, { method: "GET" });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data;
}

// auth
export async function signUpUser(userData) {
  try {
    const res = await fetch(urlUsers, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);

    const data = await res.json();
    console.log("User saved:", data);
    return data;
  } catch (error) {
    console.error("Sign up failed:", error.message);
  }
}

export async function loginUser(userData) {
  try {
    const res = await fetch(urlUsers, { method: "GET" });
    if (!res.ok) throw new Error(`Error: ${res.status}`);

    const data = await res.json();
    return data.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

// cart
const urlCart = "http://localhost:3000/carts";
// add cart


export async function fetchAddOrUpdateCart(cart) {
  try {

    const existingCart = await fetchGetCartById(cart.id).catch(() => null);

    const url = existingCart ? `${urlCart}/${cart.id}` : urlCart;
    const method = existingCart ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);

    const data = await res.json();
    // return data;
  } catch (error) {
    console.error("Add or update cart failed:", error.message);
  }
}

// get all carts
export async function fetchGetAllCarts() {
  const res = await fetch(urlCart, { method: "GET" });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data;
}
// get cart using id
export async function fetchGetCartById(cartId) {
  const res = await fetch(`${urlCart}/${cartId}`, { method: "GET" });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data;
}
