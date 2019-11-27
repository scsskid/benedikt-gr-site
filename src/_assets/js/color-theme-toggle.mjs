const themeSwitches = document.querySelectorAll('[data-color-theme-toggle]')

function removeColorThemeLocalStorage() {
  localStorage.removeItem('color-theme')
}

function saveColorTheme(colorTheme) {
  if (colorTheme === 'system') {
    removeColorThemeLocalStorage()
    return
  }
  localStorage.setItem('color-theme', colorTheme)
}

function applyColorTheme() {
  const localStorageColorTheme = localStorage.getItem('color-theme')
  const colorTheme = localStorageColorTheme || null
  if (colorTheme) {
    document.documentElement.setAttribute('data-color-theme', colorTheme)
  }
}

function themeSwitchHandler() {
  themeSwitches.forEach(themeSwitch => {
    const el = themeSwitch
    if (el.value === localStorage.getItem('color-theme')) {
      el.checked = true
    }

    el.addEventListener('change', () => {
      if (el.value !== 'system') {
        saveColorTheme(el.value)
        applyColorTheme(el.value)
      } else {
        removeColorThemeLocalStorage()
        document.documentElement.removeAttribute('data-color-theme')
      }
    })
  })
  applyColorTheme()
}
document.addEventListener('DOMContentLoaded', () => {
  themeSwitchHandler()
  applyColorTheme()
})
