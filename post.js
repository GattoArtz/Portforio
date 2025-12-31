document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("postDetail");
  if (!container) return;

  const id = new URLSearchParams(location.search).get("id");
  if (!id) {
    container.innerHTML = "<p>記事IDが指定されていません。</p>";
    return;
  }

  fetch("data/blog.json")
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.id === id);
      if (!post) {
        container.innerHTML = "<p>記事が見つかりません。</p>";
        return;
      }

      // ===== content renderer =====
      const renderContent = (blocks) => {
        if (!Array.isArray(blocks)) return "";

        return blocks.map(block => {
          switch (block.type) {
            case "text":
              return `<p>${block.value}</p>`;

            case "image":
              return `
                <div class="media">
                  <img src="${block.src}" alt="" loading="lazy">
                </div>
              `;

            case "video":
              return `
                <div class="media">
                  <video src="${block.src}" controls playsinline></video>
                </div>
              `;

            default:
              return "";
          }
        }).join("");
      };

      // ===== HTML =====
      container.innerHTML = `
        <h1>${post.title}</h1>
        <div class="meta">${post.date} / ${post.tags.join(", ")}</div>

        ${post.thumb ? `
          <div class="media">
            <img src="${post.thumb}" alt="" loading="lazy">
          </div>
        ` : ""}

        <div class="content">
          ${renderContent(post.content)}
        </div>
      `;

      // ===== animation =====
      container.classList.add("animate");
      requestAnimationFrame(() => {
        container.classList.add("show");
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>記事の読み込みに失敗しました。</p>";
    });
});
