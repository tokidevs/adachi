import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Eye, MousePointerClick, Users } from 'lucide-react'
import { Card } from '@tokidevs/adachi'

const bars = [42, 65, 48, 78, 56, 88, 72, 94, 61, 84, 70, 92]

function MiniBars() {
  return (
    <div className="flex h-36 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--accent)] to-[var(--accent)]/40"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.04, type: 'spring', stiffness: 120, damping: 14 }}
        />
      ))}
    </div>
  )
}

const kpis = [
  { label: 'Active users', value: '12.4k', delta: '+8.2%', up: true, icon: Users },
  { label: 'Page views', value: '284k', delta: '+3.1%', up: true, icon: Eye },
  { label: 'Click rate', value: '4.7%', delta: '-0.4%', up: false, icon: MousePointerClick },
]

export function AnalyticsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map(({ label, value, delta, up, icon: Icon }, i) => (
          <Card key={label} transition={{ delay: i * 0.05 }} className="p-5">
            <div className="flex items-start justify-between">
              <span className="rounded-lg bg-[var(--accent-muted)] p-2 text-[var(--accent)]">
                <Icon className="size-5" />
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  up ? 'text-[var(--success)]' : 'text-[var(--danger)]'
                }`}
              >
                {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight text-[var(--text-heading)]">{value}</p>
            <p className="text-sm text-[var(--text-muted)]">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2" glass>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--text-heading)]">Traffic pulse</h2>
            <span className="text-xs text-[var(--text-muted)]">Last 12 intervals</span>
          </div>
          <MiniBars />
        </Card>
        <Card className="p-5">
          <h2 className="text-base font-semibold text-[var(--text-heading)]">Top sources</h2>
          <ul className="mt-4 space-y-3">
            {['Direct', 'Product hunt', 'Newsletter', 'Social'].map((name, i) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">{name}</span>
                <span className="font-medium text-[var(--text-heading)]">{[38, 24, 18, 12][i]}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
