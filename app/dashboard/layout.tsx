import react from 'react';
import Link from 'next/link';
import appSidebar from '@/components/appSideBar';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/appSideBar';


export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (

    <main className="w-full">
      <SideBar />
      <div className='px-4'>{children}</div>
      <NavBar />
    </main>

  );
}
