
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard-shell";

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
    <DashboardShell fontClassName={dashboardFont.className}>
      {children}
    </DashboardShell>
  );
}
