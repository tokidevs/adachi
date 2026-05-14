import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
  icon?: ReactNode
}

type DropdownProps<T extends string = string> = {
  value: T
  onChange: (v: T) => void
  options: DropdownOption<T>[]
  label?: string
  className?: string
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selected = options.find((o) => o.value === value)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, close])

  return (
    <div ref={rootRef} className={cn('relative inline-block text-left', className)}>
      {label ? (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
          {label}
        </span>
      ) : null}
      <motion.button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.98 }}
        className="flex w-full min-w-[10rem] items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--text-heading)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--accent)]/40"
      >
        <span className="flex items-center gap-2 truncate">
          {selected?.icon}
          {selected?.label ?? value}
        </span>
        <ChevronDown
          className={cn('size-4 shrink-0 text-[var(--text-muted)] transition-transform', open && 'rotate-180')}
        />
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-1 min-w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--shadow-lg)]"
          >
            {options.map((opt) => (
              <li key={opt.value} role="option" aria-selected={opt.value === value}>
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--accent-muted)]',
                    opt.value === value && 'bg-[var(--accent-muted)] font-medium text-[var(--accent)]',
                  )}
                  onClick={() => {
                    onChange(opt.value)
                    close()
                  }}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
