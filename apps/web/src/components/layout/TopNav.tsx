import { motion } from 'framer-motion'
import { Menu, Sparkles } from 'lucide-react'
import { ThemeMenu } from './ThemeMenu'

type TopNavProps = {
  title: string
  subtitle?: string
  onMenu: () => void
}

export function TopNav({ title, subtitle, onMenu }: TopNavProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--page-bg)]/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="rounded-xl p-2 text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] lg:hidden"
          aria-label="Open menu"
          onClick={onMenu}
        >
          <Menu className="size-5" />
        </button>
        <div className="min-w-0">
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="truncate text-lg font-semibold text-[var(--text-heading)] md:text-xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <p className="truncate text-sm text-[var(--text-muted)]">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text-muted)] sm:inline-flex">
          <Sparkles className="size-3.5 text-[var(--accent)]" />
          UI System
        </span>
        <ThemeMenu />
      </div>
    </header>
  )
}
