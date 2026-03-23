
import { Inter } from "next/font/google";
import NavBar from '@/components/NavBar';
import SideBar from '@/components/appSideBar';

import { SidebarProvider } from "@/components/ui/sidebar"
import type { Metadata } from "next";

const dashboardFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brasil RP - Home",
  description: "This website is a dashboard for the SAMP game server, built with Next.js and Tailwind CSS.",
  icons: {
    icon: "/favicon.ico",
  }
};




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
