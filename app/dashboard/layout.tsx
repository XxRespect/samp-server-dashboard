
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard-shell";
import QueryProvider from "@/app/providers/QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Providers } from '@/app/providers/authProvider';

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
    <Providers>
      <DashboardShell fontClassName={dashboardFont.className}>
        <NuqsAdapter>
          <QueryProvider>
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </DashboardShell>
    </Providers>
  );
}
