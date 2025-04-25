import { fetchCategories, fetchAllUsers,  fetchAllProducts, fetchProductById } from './fetchData.js';

let products = [];
let product = {};
let categories = [];
let users = [];
let categoryImageMap = {};
// All Products
export async function loadProducts(limit) {
  try {
    products = await fetchAllProducts(limit);    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export function getProducts() {
  return products;
}
export async function loadProductById(id) {
  try {
    product = await fetchProductById(id);    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export function getProductById() {
  return product;
}


// All Categories
export async function loadCategories() {
  try {
    categories = await fetchCategories();
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export function getCategories() {
  return categories;
}
// Products Category ByName
export async function loadAllProducts() {
  try {
    products = await fetchAllProducts();

    products.forEach((product) => {
      if (!categoryImageMap[product.category]) {
        categoryImageMap[product.category] = product.images[0];
      }
    });
  } catch (error) {
    console.error('Error loading products:', error);
  }
}
export function getCategoryImage(categoryName) {
  return categoryImageMap[categoryName];
}
////////////////////////////////////////

// Users
export async function loadUsers() {
  try {
    users = await fetchAllUsers();    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export function getAllUsers() {
  return users;
}