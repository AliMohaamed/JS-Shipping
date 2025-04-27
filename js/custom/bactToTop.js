export function backToTop() {
  // Back to Top Button Functionality
  
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

}
