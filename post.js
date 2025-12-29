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

      container.innerHTML = `
        <h1>${post.title}</h1>
        <div class="meta">${post.date} / ${post.tags.join(", ")}</div>
        ${post.thumb ? `
          <div class="media">
            <img src="${post.thumb}" alt="">
          </div>
        ` : ""}
        <div class="content">
          ${post.content.split("\n").map(line => `<p>${line}</p>`).join("")}
        </div>
      `;

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
