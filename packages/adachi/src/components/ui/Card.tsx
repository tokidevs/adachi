import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type CardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  /** Stronger glass blur + border */
  glass?: boolean
}

export function Card({ className, children, glass = false, ...props }: CardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        'rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)]',
        glass &&
          'border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--glass-bg)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
