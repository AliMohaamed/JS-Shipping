export function initSlider() {
  const dots = document.querySelectorAll(".dot");
  const slides = document.querySelectorAll(".slide");
  const slideCount = slides.length;
  let currentIndex = 0;
  let isAnimating = false;

  function updateSlider() {
    if (isAnimating) return;
    isAnimating = true;

    slides.forEach((slide) => slide.classList.remove("active", "prev", "next"));

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    slides[currentIndex].classList.add("active");

    const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
    const nextIndex = (currentIndex + 1) % slideCount;

    slides[prevIndex].classList.add("prev");
    slides[nextIndex].classList.add("next");

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // Init
  updateSlider();

  let autoSlideInterval = setInterval(nextSlide, 5000);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (currentIndex === index || isAnimating) return;

      clearInterval(autoSlideInterval);
      currentIndex = index;
      updateSlider();
      autoSlideInterval = setInterval(nextSlide, 5000);
    });
  });
}
