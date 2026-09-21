import type { Metadata } from 'next'
import { SettingsApp } from '@/components/settings/settings-app'

export const metadata: Metadata = {
  title: 'Settings — vdoc',
  description: 'Platform settings, profile, and space role.',
}

export default function SettingsPage() {
  return <SettingsApp />
}
