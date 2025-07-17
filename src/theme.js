export const bootstrapTheme = () => {
  const storage = localStorage.getItem('theme');
  if (storage) {
    document.documentElement.setAttribute('data-theme', storage);
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', defaultTheme);
}; 