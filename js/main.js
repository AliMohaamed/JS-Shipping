import { initSlider } from "./slider.js";
import {  loadCategories } from "./dataLoader.js";


// Run all needed features
initSlider();
loadCategories();
async function initApp() {
  // await loadCategories();
  // displayCategoriesHeader();

}
initApp();

