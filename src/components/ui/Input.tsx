import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, hint, id, ...props },
  ref,
) {
  const inputId = id ?? props.name ?? label?.replace(/\s+/g, '-').toLowerCase()

  return (
    <label className="group block w-full space-y-1.5" htmlFor={inputId}>
      {label ? (
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
          {label}
        </span>
      ) : null}
      <span className="relative block transition-transform duration-200 ease-out group-focus-within:scale-[1.01]">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2.5 text-sm text-[var(--text-heading)] shadow-[var(--shadow-sm)] placeholder:text-[var(--text-muted)] outline-none transition-[border-color,box-shadow,background-color] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-muted),0_8px_24px_var(--accent-glow)]',
            className,
          )}
          {...props}
        />
      </span>
      {hint ? <p className="text-xs text-[var(--text-muted)]">{hint}</p> : null}
    </label>
  )
})
