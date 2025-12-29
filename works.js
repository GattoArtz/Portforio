document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("worksList");
  const filter = document.getElementById("tagFilter");

  if (!list || !filter) {
    console.error("worksList or tagFilter が見つかりません");
    return;
  }

  const res = await fetch("data/works.json");
  const works = await res.json();

  const tags = new Set(["all"]);
  works.forEach(w => w.tags.forEach(t => tags.add(t)));

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

    works.forEach(w => {
      if (activeTag !== "all" && !w.tags.includes(activeTag)) return;

      const a = document.createElement("a");
      a.href = `work.html?id=${w.id}`;
      a.className = "list-item";

      a.innerHTML = `
        <div>
          <h2>${w.title}</h2>
          <p>${w.description}</p>
        </div>
        <img src="${w.thumb}" class="thumb">
      `;

      list.appendChild(a);

      // 👇 blog.js と同じ
      requestAnimationFrame(() => {
        a.classList.add("show");
      });
    });

    if (typeof observeListItems === "function") {
      observeListItems();
    }
  }

  render();

  filter.addEventListener("click", e => {
    if (!e.target.classList.contains("tag")) return;

    document.querySelectorAll(".tag").forEach(t =>
      t.classList.remove("active")
    );
    e.target.classList.add("active");

    render(e.target.dataset.tag);
  });
});
