"use client"

import { Inter } from "next/font/google";
import NavBar from '@/components/NavBar';
import SideBar from '@/components/appSideBar';

import { SidebarProvider } from "@/components/ui/sidebar"
import { Metadata } from "next";

const dashboardFont = Inter({
  subsets: ["latin"],
  display: "swap",
});




export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className={`${dashboardFont.className} flex min-h-screen w-full bg-background`}>

        <SideBar />
        <div className="flex min-w-0 flex-1 flex-col">
          <NavBar />
          <main className="flex-1 min-w-0">

            {children}


          </main>
        </div>
      </div>
    </SidebarProvider>

  );
}
