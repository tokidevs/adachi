import { motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, Palette, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--accent-muted),transparent)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-24 pt-16 md:px-8 md:pt-24">
        <motion.header
          {...fade}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
            <Palette className="size-3.5 text-[var(--accent)]" />
            Adachi — Aesthetic Dashboard UI System
          </span>
          <h1
            className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Design system energy, shipped as a living dashboard.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-[var(--text-muted)]">
            Four themes, glass cards, motion micro-interactions, and resume-ready example views —
            built with React, TypeScript, Tailwind, and Framer Motion.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="gradient"
              className="gap-2 px-6"
              onClick={() => navigate('/dashboard/analytics')}
            >
              Open dashboard
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore features
            </Button>
          </div>
        </motion.header>

        <motion.section
          id="features"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              title: 'Theme engine',
              body: 'Light, dark, neon, and glassmorphism — token-driven and persistent.',
              icon: Zap,
            },
            {
              title: 'Layout shell',
              body: 'Sidebar, top bar, responsive grid, and animated route transitions.',
              icon: LayoutDashboard,
            },
            {
              title: 'Component kit',
              body: 'Buttons, glass cards, inputs, modals, and dropdowns you can remix.',
              icon: Palette,
            },
          ].map(({ title, body, icon: Icon }, i) => (
            <Card key={title} glass transition={{ delay: i * 0.06 }} className="p-6">
              <Icon className="mb-3 size-8 text-[var(--accent)]" />
              <h3 className="text-base font-semibold text-[var(--text-heading)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{body}</p>
            </Card>
          ))}
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[var(--text-muted)]"
        >
          Tip: try the theme menu inside the dashboard — it is the centerpiece of this showcase.
        </motion.footer>
      </div>
    </div>
  )
}
