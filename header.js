const headerHTML = `
<header class="header">
  <a href="index.html" class="logo">ちゃちゃまる / GattoArtz</a>

  <nav class="nav pc-nav">
    <a href="index.html">Home</a>
    <a href="works.html">Works</a>
    <a href="blog.html">Blog</a>
    <a href="contact.html">Contact</a>
    <button id="theme-toggle" class="theme-toggle">☀</button>
  </nav>


  <div class="menu-toggle" id="menuToggle">☰</div>
</header>

<nav class="mobile-nav" id="mobileNav">
  <a href="index.html">Home</a>
  <a href="works.html">Works</a>
  <a href="blog.html">Blog</a>
  <a href="contact.html">Contact</a>
</header>
`;

document.body.insertAdjacentHTML("afterbegin", headerHTML);

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mobileNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

