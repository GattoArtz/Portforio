// Dark Mode only
const toggle = document.getElementById('modeToggle');
const saved = localStorage.getItem('theme');

if (saved === 'dark') {
  document.body.classList.add('dark');
}

toggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
});

// Tag Filter
document.querySelectorAll('.tags button').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    btn.parentElement.querySelectorAll('button')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.list-item').forEach(item => {
      const tags = item.dataset.tags || '';
      item.style.display =
        filter === 'all' || tags.includes(filter) ? 'flex' : 'none';
    });
  });
});
