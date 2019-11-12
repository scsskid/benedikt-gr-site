export default () => {
  function getColorThemeSystemPreference() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  function getColorThemeLocalStorage() {
    return localStorage.getItem('color-theme')
  }

  function saveColorTheme(colorTheme) {
    if ('system' === colorTheme) {
      removeColorThemeLocalStorage()
      return
    }
    localStorage.setItem('color-theme', colorTheme)
  }

  function removeColorThemeLocalStorage() {
    localStorage.removeItem('color-theme')
  }

  function applyColorTheme() {
    let localStorageColorTheme = localStorage.getItem('color-theme')
    let colorTheme = localStorageColorTheme ? localStorageColorTheme : getColorThemeSystemPreference()

    document.documentElement.setAttribute('data-color-theme', colorTheme)
  }

  function themeSwitchHandler() {
    const themeSwitches = document.querySelectorAll('[data-color-theme-toggle]')
    themeSwitches.forEach(el => {
      if (el.value === localStorage.getItem('color-theme')) {
        el.checked = true
      }

      el.addEventListener('change', () => {
        if ('system' !== el.value) {
          saveColorTheme(el.value)
          applyColorTheme(el.value)
        } else {
          removeColorThemeLocalStorage()
          document.documentElement.removeAttribute('data-color-theme')
        }
      })
    })
  }

  function readOutTheme() {
    let setting = localStorage.getItem('color-theme')
    document.querySelector('.theme-readout').innerHTML = getColorThemeLocalStorage()
      ? getColorThemeLocalStorage()
      : 'not set'
  }

  const mql = window.matchMedia('(prefers-color-scheme: dark)')

  function colorThemeTest() {
    applyColorTheme()
  }
  mql.addListener(colorThemeTest)
  // Future Syntax
  // mql.addEventListener('change', e => {
  //   applyColorTheme()
  //   readOutTheme()
  // })

  themeSwitchHandler()
  applyColorTheme()
}
