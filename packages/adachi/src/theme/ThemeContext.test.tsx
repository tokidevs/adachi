import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

function Probe() {
  const { theme } = useTheme()
  return <span data-testid="theme">{theme}</span>
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.removeItem('adachi-test-theme-empty')
  })

  it('provides default theme', () => {
    render(
      <ThemeProvider storageKey="adachi-test-theme-empty">
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme').textContent).toMatch(/light|dark/)
  })
})
