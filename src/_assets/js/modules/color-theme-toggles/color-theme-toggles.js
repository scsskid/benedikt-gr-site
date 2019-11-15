export default () => {
  const mqlPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const themeSwitches = document.querySelectorAll('[data-color-theme-toggle]')

  function getSystemPreferenceColorTheme() {
    if (mqlPrefersDark.matches) {
      return 'dark'
    }
    return 'light'
  }

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
    const colorTheme = localStorageColorTheme || getSystemPreferenceColorTheme()
    document.documentElement.setAttribute('data-color-theme', colorTheme)
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
  }

  function colorThemeTest() {
    applyColorTheme()
  }
  mqlPrefersDark.addListener(colorThemeTest)
  // Future Syntax
  // mql.addEventListener('change', e => {
  //   applyColorTheme()
  //   readOutTheme()
  // })
  themeSwitchHandler()
  applyColorTheme()
}
