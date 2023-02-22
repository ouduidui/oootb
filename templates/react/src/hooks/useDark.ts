export default function useDark() {
  const { isDarkMode: isDark, toggle: toggleDark } = useDarkMode()

  const html = document.getElementsByTagName('html')[0]
  useEffect(() => {
    if (isDark)
      html.classList.add('dark')
    else
      html.classList.remove('dark')
  })

  return {
    isDark,
    toggleDark,
  }
}
