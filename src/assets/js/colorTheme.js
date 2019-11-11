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
      localStorage.removeItem('color-theme')
      return
    }
    localStorage.setItem('color-theme', colorTheme)
  }

  function applyColorTheme() {
    let localStorageColorTheme = localStorage.getItem('color-theme')
    let colorTheme = localStorageColorTheme ? localStorageColorTheme : getColorThemeSystemPreference()

    document.documentElement.setAttribute('data-color-theme', colorTheme)
  }

  applyColorTheme()

  function themeSwitchHandler() {
    const themeSwitches = document.querySelectorAll('.color-scheme-toggle input')
    themeSwitches.forEach(el => {
      if (el.value === localStorage.getItem('color-theme')) {
        el.checked = true
      }

      el.addEventListener('change', () => {
        saveColorTheme(el.value)
        applyColorTheme(el.value)
        readOutTheme()
      })
    })
  }
  themeSwitchHandler()

  function readOutTheme() {
    let setting = localStorage.getItem('color-theme')
    document.querySelector('.theme-readout').innerHTML = getColorThemeLocalStorage()
      ? getColorThemeLocalStorage()
      : 'not set'
  }

  var theme_OS = window.matchMedia('(prefers-color-scheme: light)')
  theme_OS.addEventListener('change', function(e) {
    applyColorTheme()
    readOutTheme()
  })

  readOutTheme()
}
