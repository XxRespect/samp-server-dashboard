"use client"

import NavBar from '@/components/NavBar';
import SideBar from '@/components/appSideBar';
import { ThemeProvider } from '@/components/theme-provider';


export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar />
      <div className="flex min-w-0 flex-1 flex-col">
        <NavBar />
        <main className="flex-1 min-w-0">
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
      </div>
    </div>
  );
}
