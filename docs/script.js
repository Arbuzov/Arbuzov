const toggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;

const applyThemeState = (isDark) => {
  document.body.classList.toggle('dark', isDark);
  toggle.textContent = isDark ? '☀️' : '🌙';
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
};

applyThemeState(initialIsDark);

const applyProjectFilter = (activeFilter) => {
  filterButtons.forEach((chip) => {
    const isActive = chip.dataset.filter === activeFilter;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });

  projectCards.forEach((card) => {
    const matches = activeFilter === 'all' || card.dataset.category === activeFilter;
    card.hidden = !matches;
  });
};

applyProjectFilter(document.querySelector('.filter-chip.active')?.dataset.filter || 'all');

toggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  applyThemeState(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyProjectFilter(button.dataset.filter);
  });
});
