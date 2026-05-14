import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'gradient' | 'ghost'

export type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: Variant
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-45'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-white shadow-[var(--shadow-sm)] hover:bg-[var(--accent-hover)] active:scale-[0.98]',
  gradient:
    'bg-gradient-to-r from-[var(--accent)] via-[#a855f7] to-[#ec4899] text-white shadow-[var(--shadow-md)] hover:brightness-110 active:scale-[0.98]',
  ghost:
    'bg-transparent text-[var(--text-heading)] ring-1 ring-[var(--border)] hover:bg-[var(--accent-muted)] hover:ring-[var(--accent)]/30',
}

export function Button({ className, variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}
