function Switcher(el) {
  this.el = el;
}

Switcher.prototype.init = function () {
  this.applyColorThemeSetting();
  this.addEventListeners();
};

Switcher.prototype.addEventListeners = function () {
  this.el.querySelectorAll('input').forEach((input) => {
    if (input.value === localStorage.getItem('color-theme')) {
      input.checked = true;
    }

    input.addEventListener('change', () => {
      this.saveColorTheme(input.value);
      this.applyColorThemeSetting();
    });
  });
};

Switcher.prototype.saveColorTheme = function (colorTheme) {
  if (colorTheme === 'system') {
    localStorage.removeItem('color-theme');
    return;
  }

  localStorage.setItem('color-theme', colorTheme);
};

Switcher.prototype.applyColorThemeSetting = function () {
  const colorTheme = localStorage.getItem('color-theme') || null;
  if (colorTheme) {
    document.documentElement.setAttribute('data-color-theme', colorTheme);
  } else {
    document.documentElement.removeAttribute('data-color-theme');
  }
};

export default Switcher;
