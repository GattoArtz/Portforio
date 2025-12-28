function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // 初期状態
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "🌙";
  } else {
    toggle.textContent = "☀";
  }

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    toggle.textContent = isDark ? "🌙" : "☀";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// header.js が生成完了したら初期化
document.addEventListener("headerLoaded", initThemeToggle);

// HTML直書きページ用の保険
document.addEventListener("DOMContentLoaded", initThemeToggle);
