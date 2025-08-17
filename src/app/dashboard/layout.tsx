'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck,
  FileSearch,
  Lightbulb,
  Settings,
  Menu,
  ShieldAlert,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/document-verification',
    label: 'Doc Verification',
    icon: FileCheck,
  },
  {
    href: '/dashboard/document-suggestions',
    label: 'Doc Suggestions',
    icon: FileSearch,
  },
  {
    href: '/dashboard/predictive-compliance',
    label: 'Compliance AI',
    icon: Lightbulb,
  },
  {
    href: '/dashboard/fraud-detection',
    label: 'Fraud Detection',
    icon: ShieldAlert,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen w-full">
       <Sidebar collapsible="icon" variant="sidebar" defaultOpen={false}>
        <SidebarContent>
          <SidebarHeader className="flex items-center justify-between p-2">
            <Logo />
            <div className="md:hidden">
              <SidebarTrigger>
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            </div>
             <Button
                variant="ghost"
                size="icon"
                className="hidden h-7 w-7 md:flex"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
          </SidebarHeader>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={{ children: item.label, side: 'right' }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton
                    tooltip={{ children: 'Settings', side: 'right' }}
                  >
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </div>
  );
}
