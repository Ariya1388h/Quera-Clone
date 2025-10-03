const toggleBtn = document.querySelector(".header__toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  toggleBtn.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
});