# @tokidevs/adachi

**Production-oriented React UI primitives** with a **token-driven theme engine** (light, dark, neon, glass), **Tailwind CSS v4**-compiled stylesheet, and **Framer Motion** micro-interactions. Built for teams that want a polished baseline without adopting a massive component framework.

[![npm version](https://img.shields.io/npm/v/@tokidevs/adachi.svg)](https://www.npmjs.com/package/@tokidevs/adachi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install @tokidevs/adachi framer-motion
```

Peer dependencies: `react`, `react-dom`, `framer-motion` (aligned with your app’s versions).

## Quick start

**1. Import styles once** (at your app entry — includes Tailwind layers, design tokens, and focus styles):

```tsx
import '@tokidevs/adachi/styles.css'
```

**2. Wrap your app** with the theme provider (persists to `localStorage` by default):

```tsx
import { ThemeProvider, Button, Card } from '@tokidevs/adachi'

export function App() {
  return (
    <ThemeProvider>
      <Card glass>
        <Button variant="gradient">Ship it</Button>
      </Card>
    </ThemeProvider>
  )
}
```

**3. Switch themes** anywhere in the tree:

```tsx
import { useTheme, type ThemeId } from '@tokidevs/adachi'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeId)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="neon">Neon</option>
      <option value="glass">Glass</option>
    </select>
  )
}
```

`ThemeProvider` accepts an optional `storageKey` prop if multiple apps share an origin.

## Tailwind in your own app

Adachi ships a **pre-built** `styles.css` so consumers do **not** have to add the package to Tailwind `content` paths for the library’s classes to exist. If you also use Tailwind in your project, keep your own `@import "tailwindcss"` entry **separate** and avoid duplicate global resets — Adachi’s bundle already includes Tailwind’s preflight for the tokens layer.

## API

| Export | Description |
|--------|-------------|
| `ThemeProvider`, `useTheme` | `data-theme` on `<html>`, persisted theme |
| `Button` | `primary` \| `gradient` \| `ghost` motion button |
| `Card` | Surface card; `glass` prop for glassmorphism |
| `Input` | Label + hint + focus ring |
| `Modal` | Portal, focus trap, scroll lock, Escape / outside click |
| `Dropdown` | Listbox-style select with keyboard navigation |
| `cn` | Tiny `className` join helper |

Types are exported alongside components (e.g. `ButtonProps`, `ThemeId`).

## Accessibility notes

- **Modal**: uses `focus-trap-react`, locks body scroll, restores on close, `aria-modal` + labelled title.
- **Dropdown**: Arrow keys, Home/End, Enter/Space, Escape; `aria-expanded` / `aria-controls` / `aria-activedescendant`.

## License

MIT — see [LICENSE](../LICENSE) in the repository root.
