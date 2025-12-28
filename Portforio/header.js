const headerHTML = `
<header class="header">
  <a href="index.html">ちゃちゃまる / GattoArtz</a>
  <nav class="nav">
    <a href="index.html">Home</a>
    <a href="works.html">Works</a>
    <a href="blog.html">Blog</a>
    <a href="contact.html">Contact</a>
    <button id="theme-toggle" class="theme-toggle">☀</button>
  </nav>
</header>
`;

document.body.insertAdjacentHTML("afterbegin", headerHTML);
document.dispatchEvent(new Event("headerLoaded"));




