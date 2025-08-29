import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Logo from "@/assets/icons/Logo";
import { TRole } from "@/types";

function isActive(target: string, pathname: string) {
  if (!target) return false;
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(target + "/");
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const role = userData?.data?.role as string | undefined;

  const groups = React.useMemo(
    () => (role ? getSidebarItems(role as TRole) : []) ?? [],
    [role]
  );
  const { pathname } = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center">
        <Logo />
      </SidebarHeader>

      <div id="main-nav" className="">
        <SidebarContent>
          {groups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const active = isActive(item.url, pathname);
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild isActive={active}>
                          <Link to={item.url}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
