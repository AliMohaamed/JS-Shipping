import { fetchProducts, fetchCategories, fetchAllUsers, fetchProductsCategoryByName } from './fetchData.js';

let products = [];
let categories = [];
let users = [];
let productsCategoryByName = [];
// All Products
export async function loadProducts() {
  try {
    products = await fetchProducts();    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export function getProducts() {
  return products;
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
export async function loadProductsCategoryByName(categoryName) {
  try {
    productsCategoryByName = await fetchProductsCategoryByName(categoryName);
    return productsCategoryByName;
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export function getProductsCategoryByName() {
  return productsCategoryByName;
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