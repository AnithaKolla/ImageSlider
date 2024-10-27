const slider = document.querySelector(".slider");
const navDots =
  document.querySelectorAll(".nav-dot");

let currentIndex = 0;
const slideInterval = 3000; // 3 seconds interval

function goToSlide(index) {
  const slideWidth = slider.clientWidth;
  slider.scrollTo({
    left: index * slideWidth,
    behavior: "smooth",
  });
  updateActiveDot(index);
  currentIndex = index;
}

function updateActiveDot(index) {
  navDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function autoScroll() {
  currentIndex =
    (currentIndex + 1) % navDots.length;
  goToSlide(currentIndex);
}

// Start the auto-scrolling
let autoScrollInterval = setInterval(
  autoScroll,
  slideInterval
);

// Pause auto-scrolling on mouse over and resume on mouse leave
slider.addEventListener("mouseenter", () =>
  clearInterval(autoScrollInterval)
);
slider.addEventListener("mouseleave", () => {
  autoScrollInterval = setInterval(
    autoScroll,
    slideInterval
  );
});

// Manually navigate to a slide when clicking on navigation dots
navDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
    clearInterval(autoScrollInterval); // Pause auto-scrolling on manual navigation
    autoScrollInterval = setInterval(
      autoScroll,
      slideInterval
    ); // Resume auto-scrolling
  });
});
