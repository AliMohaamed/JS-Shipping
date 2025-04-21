// Fetch Products From API
export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.products;
}
// Fetch Categories From API
export async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
}

export async function fetchCategoriess() {
  const res = await fetch("https://dummyjson.com/products/categories");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
}
