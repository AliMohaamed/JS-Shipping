import {
  fetchCategories,
  fetchAllUsers,
  fetchAllProducts,
  fetchProductById,
  fetchProductsSorted,
  fetchProductsByCategoryName,
  fetchGetCartById,
  fetchGetAllCarts,
} from "./fetchData.js";

let products = [];
let product = {};
let categories = [];
let users = [];
let categoryImageMap = {};
let cart = {};
let carts = [];
// All Products
export async function loadProducts(limit) {
  try {
    products = await fetchAllProducts(limit);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getProducts() {
  return products;
}
// load product by id
export async function loadProductById(id) {
  try {
    product = await fetchProductById(id);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getProductById() {
  return product;
}
// load sort Products
export async function loadProductsSorted(key, order) {
  try {
    products = await fetchProductsSorted(key, order);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getProductsSorted() {
  return products;
}

// All Categories
export async function loadCategories() {
  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getCategories() {
  return categories;
}
// Products Category Image
export async function loadAllProducts() {
  try {
    products = await fetchAllProducts();

    products.forEach((product) => {
      if (!categoryImageMap[product.category]) {
        categoryImageMap[product.category] = product.images[0];
      }
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}
export function getCategoryImage(categoryName) {
  return categoryImageMap[categoryName];
}
// Get products by a category
export async function loadProductsByCategoryName(categoryName) {
  try {
    products = await fetchProductsByCategoryName(categoryName);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getProductsByCategoryName() {
  return products;
}

/* ------------------Users---------------------- */

// Users
export async function loadUsers() {
  try {
    users = await fetchAllUsers();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getAllUsers() {
  return users;
}

/* ------------------Carts---------------------- */

// Get all carts
export async function loadAllCarts() {
  try {
    carts = await fetchGetAllCarts();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getAllCarts() {
  return carts;
}
// Get a single cart
export async function loadCartById(id) {
  try {
    cart = await fetchGetCartById(id);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
export function getCartById() {
  return cart;
}
