import { Bell, Mail } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Dropdown, type DropdownOption } from '../components/ui/Dropdown'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { ThemeMenu } from '../components/layout/ThemeMenu'

const densityOptions: DropdownOption<'comfortable' | 'compact'>[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
]

export function SettingsPage() {
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')
  const [notif, setNotif] = useState(true)
  const [digest, setDigest] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Card className="p-6">
        <h2 className="text-base font-semibold text-[var(--text-heading)]">Workspace</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Density and defaults for this showcase.</p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Dropdown label="Layout density" value={density} onChange={setDensity} options={densityOptions} />
          <div>
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
              Global theme
            </span>
            <ThemeMenu />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-base font-semibold text-[var(--text-heading)]">Component gallery</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Quick reference for the primitives used across Adachi.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
        </div>
        <div className="mt-6 max-w-md">
          <Input label="Sample input" placeholder="Focus for ring + micro-scale…" />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-base font-semibold text-[var(--text-heading)]">Preferences</h2>
        <ul className="mt-4 divide-y divide-[var(--border)]">
          <li className="flex items-center justify-between py-3">
            <span className="flex items-center gap-2 text-sm text-[var(--text-heading)]">
              <Bell className="size-4 text-[var(--text-muted)]" />
              Product updates
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={notif}
              onClick={() => setNotif((v) => !v)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                notif ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
              }`}
            >
              <span
                className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
                  notif ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </li>
          <li className="flex items-center justify-between py-3">
            <span className="flex items-center gap-2 text-sm text-[var(--text-heading)]">
              <Mail className="size-4 text-[var(--text-muted)]" />
              Weekly digest
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={digest}
              onClick={() => setDigest((v) => !v)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                digest ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
              }`}
            >
              <span
                className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
                  digest ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </li>
        </ul>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Modal example">
        <p className="text-sm text-[var(--text-muted)]">
          This dialog uses Framer Motion for enter/exit and locks to Escape. Wire your own forms or
          confirmations here.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  )
}
