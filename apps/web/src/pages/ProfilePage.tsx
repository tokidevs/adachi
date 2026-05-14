import { motion } from 'framer-motion'
import { Camera, MapPin, Shield } from 'lucide-react'
import { useState } from 'react'
import { Button, Card, Input } from '@tokidevs/adachi'

export function ProfilePage() {
  const [name, setName] = useState('Jordan Adachi')
  const [role, setRole] = useState('Product Designer')
  const [location, setLocation] = useState('Tokyo · Remote')

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6 lg:grid-cols-[220px_1fr]">
      <Card glass className="flex h-fit flex-col items-center p-6 text-center">
        <motion.div
          layoutId="avatar"
          className="relative mb-4 size-28 overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 shadow-[var(--shadow-md)] ring-4 ring-[var(--accent-muted)]"
        >
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
            JA
          </span>
        </motion.div>
        <h2 className="text-lg font-semibold text-[var(--text-heading)]">{name}</h2>
        <p className="text-sm text-[var(--text-muted)]">{role}</p>
        <p className="mt-2 flex items-center justify-center gap-1 text-xs text-[var(--text-muted)]">
          <MapPin className="size-3.5" />
          {location}
        </p>
        <Button variant="ghost" className="mt-5 w-full gap-2 text-sm">
          <Camera className="size-4" />
          Update photo
        </Button>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-base font-semibold text-[var(--text-heading)]">Public profile</h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            These fields power how you appear across the workspace.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <div className="sm:col-span-2">
              <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="primary">Save changes</Button>
            <Button variant="ghost">Discard</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-[var(--accent-muted)] p-2 text-[var(--accent)]">
              <Shield className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-heading)]">Security</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Two-factor authentication and session controls ship in a “real” app — here, the card
                demonstrates hierarchy and icon rhythm.
              </p>
              <Button variant="gradient" className="mt-4">
                Enable 2FA (demo)
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
