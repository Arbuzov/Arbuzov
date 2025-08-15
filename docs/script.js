const toggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  toggle.textContent = '☀️';
  toggle.setAttribute('aria-pressed', 'true');
  toggle.setAttribute('aria-label', 'Переключить на светлую тему');
} else {
  toggle.setAttribute('aria-pressed', 'false');
  toggle.setAttribute('aria-label', 'Переключить на тёмную тему');
}

toggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggle.textContent = isDark ? '☀️' : '🌙';
  toggle.setAttribute('aria-pressed', isDark);
  toggle.setAttribute('aria-label', isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
