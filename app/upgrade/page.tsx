import type { Metadata } from 'next'
import { UpgradeApp } from '@/components/upgrade/upgrade-app'

export const metadata: Metadata = {
  title: 'Upgrade — vdoc',
  description: 'Choose a floor, attach modules, and hold the mix on this device. Payment is not live.',
}

export default function UpgradePage() {
  return <UpgradeApp />
}
