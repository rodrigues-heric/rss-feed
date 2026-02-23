import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserIcon, NewspaperIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { JSX } from 'react';

export function AppSidebar(): JSX.Element {
  const { toggleSidebar } = useSidebar();
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="font-serif text-xl font-black tracking-tighter uppercase">
          RSS Feed
        </h2>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          <h3 className="text-xs font-bold tracking-widest uppercase opacity-60">
            Navigation
          </h3>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/home">
                <NewspaperIcon size={16} />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/profile">
                <UserIcon size={16} />
                Profile
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <h3 className="mt-4 text-xs font-bold tracking-widest uppercase opacity-60">
            Themes
          </h3>

          <h3 className="mt-4 text-xs font-bold tracking-widest uppercase opacity-60">
            Languages
          </h3>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={toggleSidebar}
          className="text-foreground h-14 w-full rounded-none border border-[#1a1a1a] bg-[#fcfaf7] text-sm font-bold tracking-[0.15em] uppercase transition-all hover:cursor-pointer hover:bg-[#fcfaf7]/90"
        >
          Close
        </Button>
        <Button
          onClick={logout}
          className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-none text-sm font-bold tracking-[0.15em] uppercase transition-all hover:cursor-pointer"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
