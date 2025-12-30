window.addEventListener("load", () => {

  /* ===== Home Animation ===== */
  const homeHero = document.querySelector(".home-hero.animate");
  if (homeHero) {
    // 初期状態を確実に適用
    homeHero.classList.remove("show");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        homeHero.classList.add("show");
      });
    });
  }

  /* ===== Detail Page Animation ===== */
  const detailPage = document.querySelector(".detail-page.animate");
  if (detailPage) {
    detailPage.classList.remove("show");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        detailPage.classList.add("show");
      });
    });
  }

});
