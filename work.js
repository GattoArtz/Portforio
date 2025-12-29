// work.js（works.json 構造対応版）

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("workDetail");

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
      ? w.media
          .map(src => `
            <div class="media">
              <img src="${src}" alt="">
            </div>
          `)
          .join("")
      : w.media
        ? `<div class="media"><img src="${w.media}" alt=""></div>`
        : "";

    container.innerHTML = `
      <h1>${w.title}</h1>
      <div class="meta">${w.year} / ${w.tags.join(", ")}</div>
      ${mediaHTML}
      <div class="content">
        ${w.content
          .split("\n")
          .map(line => `<p>${line}</p>`)
          .join("")}
      </div>
    `;
  });
const detail = document.querySelector(".detail-page");
if (detail) {
  detail.classList.add("animate");
  requestAnimationFrame(() => {
    detail.classList.add("show");
  });
}

});
