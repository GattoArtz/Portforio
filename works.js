fetch("data/works.json")
  .then(r => r.json())
  .then(works => {
    const list = document.getElementById("worksList");
    const filter = document.getElementById("tagFilter");
    const tags = new Set(["all"]);

    works.forEach(w => w.tags.forEach(t => tags.add(t)));

    tags.forEach(t => {
      const el = document.createElement("div");
      el.className = "tag";
      el.textContent = t;
      el.dataset.tag = t;
      if (t === "all") el.classList.add("active");
      filter.appendChild(el);
    });

    function render(tag = "all") {
      list.innerHTML = "";
      works.forEach(w => {
        if (tag !== "all" && !w.tags.includes(tag)) return;
        const a = document.createElement("a");
        a.href = `work.html?id=${w.id}`;
        a.className = "list-item show";
        a.innerHTML = `
          <div>
            <h2>${w.title}</h2>
            <p>${w.description}</p>
          </div>
          <img src="${w.thumb}" class="thumb">
        `;
        list.appendChild(a);
      });


    }
  
    
document.querySelectorAll(".list-item").forEach(item => {
  item.classList.remove("show");
});

    render();
    setTimeout(observeListItems, 50);


    filter.addEventListener("click", e => {
      if (!e.target.classList.contains("tag")) return;
      document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");
      render(e.target.dataset.tag);
    });
  });

  function render(filter = "all") {
  list.innerHTML = "";

  works.forEach(w => {
    if (filter !== "all" && !w.tags.includes(filter)) return;

    const a = document.createElement("a");
    a.href = `work.html?id=${w.id}`;
    a.className = "list-item";
    a.dataset.tag = w.tags.join(" ");

    a.innerHTML = `
      <div>
        <h2>${w.title}</h2>
        <p>${w.description}</p>
      </div>
      <img src="${w.thumb}" class="thumb">
    `;

    list.appendChild(a);
  });

  // 👇 これを追加
  observeListItems();
}
