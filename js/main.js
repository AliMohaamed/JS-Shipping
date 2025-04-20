// Global variable to hold the products
let allProducts = [];

// Async function to fetch and store products globally
async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    allProducts = json.products; // Store in global variable
    console.log("Products loaded:", allProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}
getProducts();

setTimeout(() => {
//   console.log("Using global products:", allProducts);
  allProducts.forEach((product) => {
    console.log(product.category);
  });
}, 2000);
