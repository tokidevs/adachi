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

export type ThemeContextValue = {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
  resolvedBase: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyDomTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
}

export type ThemeProviderProps = {
  children: ReactNode
  /** Override persisted storage key (e.g. multi-app on same origin) */
  storageKey?: string
}

export function ThemeProvider({ children, storageKey = STORAGE_KEY }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem(storageKey) as ThemeId | null
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
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

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

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
