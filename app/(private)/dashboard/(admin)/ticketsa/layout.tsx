import { ReactNode } from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tickets",
    description: "Page dedicated to tickets management for admin users.",
}

export default function TicketsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

