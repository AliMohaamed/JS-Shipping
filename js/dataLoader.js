import { fetchProducts, fetchCategories } from './fetchData.js';

let products = [];
let categories = [];

export async function loadProducts() {
  try {
    products = await fetchProducts();    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
export async function loadCategories() {
  try {
    categories = await fetchCategories();
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

export function getProducts() {
  return products;
}

export function getCategories() {
  return categories;
}
