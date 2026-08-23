import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.archstrucgroup.com',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}