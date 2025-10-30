import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/components/AppSidebar.tsx';
import { TopAppBar } from '@/components/TopAppBar.tsx';

export const Admin = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      
      <SidebarInset className="relative max-h-[calc(100dvh-16px)] overflow-auto">
        <TopAppBar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};
