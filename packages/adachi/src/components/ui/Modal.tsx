import { AnimatePresence, motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
  /** Optional id for aria-labelledby when you replace the built-in title */
  titleId?: string
}

export function Modal({ open, onClose, title, children, className, titleId: titleIdProp }: ModalProps) {
  const autoTitleId = useId()
  const titleId = titleIdProp ?? `adachi-modal-title-${autoTitleId}`
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (open) {
      queueMicrotask(() => panelRef.current?.focus())
    }
  }, [open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!open}
        >
          <FocusTrap
            focusTrapOptions={{
              escapeDeactivates: true,
              clickOutsideDeactivates: true,
              onDeactivate: () => onClose(),
              fallbackFocus: () => panelRef.current ?? document.body,
            }}
          >
            <div className="relative flex min-h-full w-full max-w-lg items-center justify-center">
              <motion.div
                role="presentation"
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
              />
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={cn(
                  'relative z-10 w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] outline-none',
                  className,
                )}
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              >
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-[var(--text-heading)]"
                  style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif' }}
                >
                  {title}
                </h2>
                <div className="mt-4">{children}</div>
              </motion.div>
            </div>
          </FocusTrap>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
