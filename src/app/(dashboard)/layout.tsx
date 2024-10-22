import { MobileSidebar } from "@/components/components-dashboard-mobile-sidebar";
import { Navbar } from "@/components/components-dashboard-navbar";
import { Sidebar } from "@/components/components-dashboard-sidebar2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-neutral-100 dark:bg-[#121212]'>
      <Sidebar />
      <div className='flex flex-col '>
        <MobileSidebar />
        <Navbar />
        <main className='flex-1 p-6 xl:ml-64'>{children}</main>
      </div>
    </div>
  );
}
