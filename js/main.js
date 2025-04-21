import { initSlider } from "./slider.js";
import { getCategories, loadCategories } from "./dataLoader.js";


// Run all needed features
initSlider();
loadCategories();
async function initApp() {
  await loadCategories();
  displayCategoriesHeader();

}
initApp();

export function displayCategoriesHeader() {
  const categories = getCategories();
  const categorySelect = document.querySelector(".category-dropdown");
  categories.forEach((category) => {
    const html = `<option value="${category.slug}">${category.name}</option>`;
    categorySelect.insertAdjacentHTML("beforeend", html);
  });
}
