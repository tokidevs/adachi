import { AnimatePresence, motion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
  icon?: ReactNode
}

export type DropdownProps<T extends string = string> = {
  value: T
  onChange: (v: T) => void
  options: DropdownOption<T>[]
  label?: string
  className?: string
  /** Passed to the trigger for form association / testing */
  name?: string
  id?: string
}

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn('size-4 shrink-0 text-[var(--text-muted)] transition-transform', open && 'rotate-180', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
  name,
  id,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const baseId = id ?? `adachi-dd-${listId.replace(/:/g, '')}`

  const initialIndex = useMemo(
    () => Math.max(0, options.findIndex((o) => o.value === value)),
    [options, value],
  )
  const [highlighted, setHighlighted] = useState(initialIndex)

  const selected = options.find((o) => o.value === value)

  const close = useCallback(() => setOpen(false), [])

  const toggleMenu = useCallback(() => {
    setOpen((o) => {
      if (!o) {
        setHighlighted(Math.max(0, options.findIndex((x) => x.value === value)))
        return true
      }
      return false
    })
  }, [options, value])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        triggerRef.current?.focus()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlighted((i) => (i + 1 >= options.length ? 0 : i + 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlighted((i) => (i - 1 < 0 ? options.length - 1 : i - 1))
        return
      }
      if (e.key === 'Home') {
        e.preventDefault()
        setHighlighted(0)
        return
      }
      if (e.key === 'End') {
        e.preventDefault()
        setHighlighted(options.length - 1)
        return
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const opt = options[highlighted]
        if (opt) {
          onChange(opt.value)
          close()
          triggerRef.current?.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, highlighted, options, onChange, close])

  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        setHighlighted(Math.max(0, options.findIndex((o) => o.value === value)))
        setOpen(true)
      }
    }
  }

  return (
    <div ref={rootRef} className={cn('relative inline-block text-left', className)}>
      {label ? (
        <span
          id={`${baseId}-label`}
          className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]"
        >
          {label}
        </span>
      ) : null}
      <motion.button
        ref={triggerRef}
        type="button"
        id={baseId}
        name={name}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={label ? `${baseId}-label ${baseId}` : undefined}
        aria-activedescendant={open ? `${listId}-opt-${highlighted}` : undefined}
        onKeyDown={onTriggerKeyDown}
        onClick={toggleMenu}
        whileTap={{ scale: 0.98 }}
        className="flex w-full min-w-[10rem] items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--text-heading)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--accent)]/40"
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
          {selected?.icon}
          <span className="truncate">{selected?.label ?? value}</span>
        </span>
        <ChevronIcon open={open} />
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={label ? `${baseId}-label` : baseId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-1 min-w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--shadow-lg)]"
          >
            {options.map((opt, index) => (
              <li key={String(opt.value)} role="presentation">
                <button
                  id={`${listId}-opt-${index}`}
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                    index === highlighted && 'bg-[var(--accent-muted)]/80',
                    opt.value === value && 'font-medium text-[var(--accent)]',
                    opt.value !== value && 'text-[var(--text-heading)] hover:bg-[var(--accent-muted)]',
                  )}
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => {
                    onChange(opt.value)
                    close()
                    triggerRef.current?.focus()
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
