import { useMemo, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { AnimatedOutlet } from './AnimatedOutlet'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

const titles: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard/analytics': {
    title: 'Analytics',
    subtitle: 'Signals, trends, and activity at a glance',
  },
  '/dashboard/profile': { title: 'Profile', subtitle: 'Identity and presence' },
  '/dashboard/settings': { title: 'Settings', subtitle: 'Preferences and workspace' },
}

export function DashboardLayout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const meta = useMemo(() => {
    const hit = Object.keys(titles).find((path) => matchPath({ path, end: true }, location.pathname))
    return hit ? titles[hit] : { title: 'Dashboard', subtitle: 'Adachi UI System' }
  }, [location.pathname])

  return (
    <div className="flex min-h-dvh bg-[var(--page-bg)]">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <TopNav
          title={meta.title}
          subtitle={meta.subtitle}
          onMenu={() => setMobileOpen(true)}
        />
        <main className="flex flex-1 flex-col overflow-auto p-4 md:p-6">
          <AnimatedOutlet />
        </main>
      </div>
    </div>
  )
}
