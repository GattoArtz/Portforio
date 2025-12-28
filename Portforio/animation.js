function observeListItems() {
  const items = document.querySelectorAll(".list-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(item => observer.observe(item));
}

// 初回
document.addEventListener("DOMContentLoaded", observeListItems);

// 再描画用（タグ切替など）
window.observeListItems = observeListItems;
