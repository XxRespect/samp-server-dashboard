"use client"

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });

import SideBar from "@/components/appSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppFooter from "./AppFooter";

type DashboardShellProps = {
  children: ReactNode
  fontClassName: string
}

export default function DashboardShell({
  children,
  fontClassName,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className={`${fontClassName} flex min-h-screen w-full bg-background`}>
        <SideBar />
        <div className="flex min-w-0 flex-1 flex-col">
          <NavBar />
          <main className="min-w-0 flex-1">{children}</main>
          <AppFooter />
        </div>
      </div>
    </SidebarProvider>
  )
}
