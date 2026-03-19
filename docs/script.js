const toggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');

const applyThemeState = (isDark) => {
  document.body.classList.toggle('dark', isDark);
  toggle.textContent = isDark ? '☀️' : '🌙';
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
};

applyThemeState(savedTheme === 'dark');

if (!savedTheme) {
  toggle.setAttribute('aria-pressed', 'false');
}

toggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  applyThemeState(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((chip) => {
      chip.classList.toggle('active', chip === button);
      chip.setAttribute('aria-selected', String(chip === button));
    });

    projectCards.forEach((card) => {
      const matches = activeFilter === 'all' || card.dataset.category === activeFilter;
      card.hidden = !matches;
    });
  });
});
