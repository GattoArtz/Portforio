document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("workDetail");
  if (!container) return;

  const id = new URLSearchParams(location.search).get("id");
  if (!id) {
    container.innerHTML = "<p>作品が見つかりません。</p>";
    return;
  }

  fetch("data/works.json")
    .then(r => r.json())
    .then(works => {
      const w = works.find(x => x.id === id);
      if (!w) {
        container.innerHTML = "<p>作品が見つかりません。</p>";
        return;
      }

      const mediaHTML = Array.isArray(w.media)
        ? w.media.map(src => `
            <div class="media">
              <img src="${src}" alt="">
            </div>
          `).join("")
        : w.media
          ? `<div class="media"><img src="${w.media}" alt=""></div>`
          : "";

      container.innerHTML = `
        <h1>${w.title}</h1>
        <div class="meta">${w.year} / ${w.tags.join(", ")}</div>
        ${mediaHTML}
        <div class="content">
          ${w.content.split("\n").map(line => `<p>${line}</p>`).join("")}
        </div>
      `;

      // ★ ここで初めてアニメON
      container.classList.add("animate");
      requestAnimationFrame(() => {
        container.classList.add("show");
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>読み込みに失敗しました。</p>";
    });
});
