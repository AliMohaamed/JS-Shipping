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
  const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
}

// Users
const url = "http://localhost:3000/users";
export async function fetchAllUsers() {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data;
}

// auth

export async function signUpUser(userData) {
  try {
    const res = await fetch(url, {
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
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) throw new Error(`Error: ${res.status}`);

    const data = await res.json();
    return data.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}
