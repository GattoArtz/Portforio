document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("blogList");
  const filter = document.getElementById("blogTagFilter");

  if (!list || !filter) {
    console.error("blogList or blogTagFilter が見つかりません");
    return;
  }

  const res = await fetch("data/blog.json");
  const posts = await res.json();

  const tags = new Set(["all"]);
  posts.forEach(p => p.tags.forEach(t => tags.add(t)));

  // タグ生成
  tags.forEach(tag => {
    const el = document.createElement("div");
    el.className = "tag";
    el.textContent = tag;
    el.dataset.tag = tag;
    if (tag === "all") el.classList.add("active");
    filter.appendChild(el);
  });

  function render(activeTag = "all") {
    list.innerHTML = "";

    posts.forEach(post => {
      if (activeTag !== "all" && !post.tags.includes(activeTag)) return;

      const a = document.createElement("a");
      a.href = `post.html?id=${post.id}`;
      a.className = "list-item";

      a.innerHTML = `
        <div>
          <h2>${post.title}</h2>
          <p>${post.date}</p>
        </div>
        <img src="${post.thumb}" class = "thumb">
      `;

      list.appendChild(a);
      requestAnimationFrame(() => a.classList.add("show"));
    });

    if (typeof observeListItems === "function") {
      observeListItems();
    }
  }

  render();

  filter.addEventListener("click", e => {
    if (!e.target.classList.contains("tag")) return;

    document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");

    render(e.target.dataset.tag);
  });
});
