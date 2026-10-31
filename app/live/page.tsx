import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'vdoc — AI Native Entertainment OS',
  description: 'An AI-native entertainment operating system.',
}

export default function LivePage() {
  redirect('/')
}
