import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ThemeId = 'light' | 'dark' | 'neon' | 'glass'

const STORAGE_KEY = 'adachi-theme'

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
  /** Maps light/dark pair for quick toggle */
  resolvedBase: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyDomTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    let initial: ThemeId
    if (stored === 'light' || stored === 'dark' || stored === 'neon' || stored === 'glass') {
      initial = stored
    } else {
      initial = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    document.documentElement.dataset.theme = initial
    return initial
  })

  useEffect(() => {
    applyDomTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t)
  }, [])

  const resolvedBase: 'light' | 'dark' =
    theme === 'light' ? 'light' : theme === 'dark' ? 'dark' : 'dark'

  const value = useMemo(
    () => ({ theme, setTheme, resolvedBase }),
    [theme, setTheme, resolvedBase],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- colocated hook for theme context
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
