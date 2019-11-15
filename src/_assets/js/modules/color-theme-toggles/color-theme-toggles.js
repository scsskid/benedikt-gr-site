export default () => {
  const mqlPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const themeSwitches = document.querySelectorAll('[data-color-theme-toggle]')

  function getSystemPreferenceColorTheme() {
    if (mqlPrefersDark.matches) {
      return 'dark'
    }
    return 'light'
  }

  function getSettingColorTheme() {
    return localStorage.getItem('color-theme')
  }

  function removeColorThemeLocalStorage() {
    localStorage.removeItem('color-theme')
  }

  function saveColorTheme(colorTheme) {
    if ('system' === colorTheme) {
      removeColorThemeLocalStorage()
      return
    }
    localStorage.setItem('color-theme', colorTheme)
  }

  function applyColorTheme() {
    let localStorageColorTheme = localStorage.getItem('color-theme')
    let colorTheme = localStorageColorTheme ? localStorageColorTheme : getSystemPreferenceColorTheme()
    document.documentElement.setAttribute('data-color-theme', colorTheme)
  }

  function themeSwitchHandler() {
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

        readOutTheme()
      })
    })
  }

  function readOutTheme() {
    let setting = localStorage.getItem('color-theme')
    document.querySelector('.theme-readout').innerHTML = getSettingColorTheme() ? getSettingColorTheme() : 'not set'
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
