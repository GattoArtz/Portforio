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

      // ===== media描画関数（★ここ重要）=====
      const renderMedia = (src) => {
        if (typeof src !== "string") return "";

        if (src.endsWith(".mp4")) {
          return `
            <div class="media">
              <video src="${src}" controls playsinline></video>
            </div>
          `;
        }

        return `
          <div class="media">
            <img src="${src}" alt="">
          </div>
        `;
      };

      // ===== media HTML生成 =====
      let mediaHTML = "";
      if (Array.isArray(w.media)) {
        mediaHTML = w.media.map(renderMedia).join("");
      } else if (w.media) {
        mediaHTML = renderMedia(w.media);
      }

      // ===== 本文描画 =====
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

      // ===== アニメーションON =====
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
