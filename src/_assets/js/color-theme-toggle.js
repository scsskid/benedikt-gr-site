function Switcher(el) {
  this.state = { active: false, theme: 'auto' };
  this.el = el;

  // console.log(this.el);
}

Switcher.prototype.init = function () {
  console.log(`init:`, this.el);
};

Switcher.prototype.saveColorTheme = (colorTheme) => {
  if (colorTheme === 'system') {
    this.removeColorThemeLocalStorage();
    return;
  }

  localStorage.setItem('color-theme', colorTheme);
};

Switcher.prototype.removeColorThemeLocalStorage = () => {
  localStorage.removeItem('color-theme');
};

const colorSchemeSwitcher = function () {
  const themeSwitches = document.querySelectorAll('[data-color-theme-toggle]');

  function applyColorTheme() {
    const localStorageColorTheme = localStorage.getItem('color-theme');
    const colorTheme = localStorageColorTheme || null;
    if (colorTheme) {
      document.documentElement.setAttribute('data-color-theme', colorTheme);
    }
  }

  function themeSwitchHandler() {
    themeSwitches.forEach((themeSwitch) => {
      const el = themeSwitch;
      if (el.value === localStorage.getItem('color-theme')) {
        el.checked = true;
      }

      el.addEventListener('change', () => {
        if (el.value !== 'system') {
          saveColorTheme(el.value);
          applyColorTheme(el.value);
        } else {
          removeColorThemeLocalStorage();
          document.documentElement.removeAttribute('data-color-theme');
        }
      });
    });
    applyColorTheme();
  }
  document.addEventListener('DOMContentLoaded', () => {
    themeSwitchHandler();
    applyColorTheme();
  });
};

export default Switcher;
