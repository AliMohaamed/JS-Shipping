// Selectors
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");
const slideCount = slides.length;
let currentIndex = 0;
let isAnimating = false;

function updateSlider() {
  if (isAnimating) return;
  isAnimating = true;

  // Remove all transition classes
  slides.forEach((slide) => {
    slide.classList.remove("active", "prev", "next");
  });

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  // Add appropriate classes based on direction
  slides[currentIndex].classList.add("active");

  const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
  const nextIndex = (currentIndex + 1) % slideCount;

  slides[prevIndex].classList.add("prev");
  slides[nextIndex].classList.add("next");

  // Reset animation flag after transition
  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

// Next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  updateSlider();
}

// Previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Initialize slider
updateSlider();

// Auto slide every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

// Add click handlers for dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (currentIndex === index || isAnimating) return;

    clearInterval(autoSlideInterval);
    currentIndex = index;
    updateSlider();

    // Restart auto slide
    autoSlideInterval = setInterval(nextSlide, 5000);
  });
});

