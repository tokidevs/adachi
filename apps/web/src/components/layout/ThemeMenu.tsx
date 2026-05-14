import { Droplet, GlassWater, Moon, Sun } from 'lucide-react'
import { Dropdown, useTheme, type DropdownOption, type ThemeId } from '@tokidevs/adachi'

const options: DropdownOption<ThemeId>[] = [
  { value: 'light', label: 'Light', icon: <Sun className="size-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="size-4" /> },
  { value: 'neon', label: 'Neon', icon: <Droplet className="size-4 text-[var(--accent)]" /> },
  { value: 'glass', label: 'Glass', icon: <GlassWater className="size-4" /> },
]

export function ThemeMenu() {
  const { theme, setTheme } = useTheme()
  return (
    <Dropdown<ThemeId>
      value={theme}
      onChange={setTheme}
      options={options}
      className="min-w-[11rem]"
    />
  )
}
