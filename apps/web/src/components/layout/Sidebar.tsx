import {
  BarChart3,
  Home,
  LayoutDashboard,
  Settings2,
  UserRound,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@tokidevs/adachi'

const links = [
  { to: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/dashboard/profile', label: 'Profile', icon: UserRound },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings2 },
]

type SidebarProps = {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--sidebar-bg)]/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
          !mobileOpen && '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold text-[var(--text-heading)]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
            onClick={onCloseMobile}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
              <LayoutDashboard className="size-5" />
            </span>
            <span>Adachi</span>
          </NavLink>
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--accent-muted)] lg:hidden"
            aria-label="Close menu"
            onClick={onCloseMobile}
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Workspace
          </p>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-heading)]',
                )
              }
            >
              <Icon className="size-[18px] shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-[var(--border)] p-3">
          <NavLink
            to="/"
            onClick={onCloseMobile}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-heading)]"
          >
            <Home className="size-[18px]" />
            Landing preview
          </NavLink>
        </div>
      </aside>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close overlay"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={onCloseMobile}
        />
      ) : null}
    </>
  )
}
