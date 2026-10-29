import type { Metadata } from 'next'
import { IntelligenceApp } from '@/components/intelligence/intelligence-app'

export const metadata: Metadata = {
  title: 'Intelligence — vdoc',
  description:
    'Audience intelligence for pains entertainment never solved: top rated, continue watching, unfinished, favourite upcoming, mood match, evening intent.',
}

export default function IntelligencePage() {
  return <IntelligenceApp />
}
