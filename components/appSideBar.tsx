"use client";

import { useSyncExternalStore, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Ban,
  Blocks,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Gamepad2,
  House,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Logs,
  Map,
  MessageSquareX,
  MonitorCog,
  Settings,
  Shield,
  ShoppingBag,
  Sparkles,
  SquareKanban,
  Ticket,
  Trophy,
  UserRound,
  Users,
  Waypoints,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type NavIcon = ComponentType<{ className?: string }>;

type NavItem = {
  title: string;
  href: string;
  icon: NavIcon;
};

type NavSection = {
  title: string;
  icon: NavIcon;
  badge?: string;
  items: NavItem[];
};

const workspaceItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: LifeBuoy,
  },
  {
    title: "Clan",
    href: "/dashboard/clan",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const generalItems: NavItem[] = [
  {
    title: "Players",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Clans",
    href: "/dashboard/clans",
    icon: Shield,
  },
  {
    title: "Zones",
    href: "/dashboard/zones",
    icon: Waypoints,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: House,
  },
  {
    title: "Ranking",
    href: "/dashboard/tops",
    icon: Trophy,
  },
  {
    title: "Modes",
    href: "/dashboard/modes",
    icon: Gamepad2,
  },
  {
    title: "Shop",
    href: "/dashboard/shops",
    icon: ShoppingBag,
  },
];

const administrationItems: NavItem[] = [
  {
    title: "Tickets",
    href: "/dashboard/tickets",
    icon: Ticket,
  },
  {
    title: "Banneds",
    href: "/dashboard/banneds",
    icon: Ban,
  },
  {
    title: "IP Banneds",
    href: "/dashboard/ipbanneds",
    icon: Blocks,
  },
  {
    title: "Muted",
    href: "/dashboard/muted",
    icon: MessageSquareX,
  },
  {
    title: "Jail",
    href: "/dashboard/jail",
    icon: SquareKanban,
  },
  {
    title: "Admins",
    href: "/dashboard/admins",
    icon: Users,
  },
  {
    title: "Auditorium",
    href: "/dashboard/auditorium",
    icon: Command,
  },
  {
    title: "Logs",
    href: "/dashboard/logs",
    icon: Logs,
  },
  {
    title: "Chat Logs",
    href: "/dashboard/chatlogs",
    icon: LifeBuoy,
  },
  {
    title: "Purchases",
    href: "/dashboard/purchases",
    icon: CreditCard,
  },
  {
    title: "Server",
    href: "/dashboard/server",
    icon: MonitorCog,
  },
];

const ownerItems: NavItem[] = [
  {
    title: "Accounts",
    href: "/dashboard/accounts",
    icon: Users,
  },
  {
    title: "Anti Cheat",
    href: "/dashboard/anticheat",
    icon: Bot,
  },
  {
    title: "Objects",
    href: "/dashboard/objects",
    icon: SquareKanban,
  },
  {
    title: "Serial Banneds",
    href: "/dashboard/serials",
    icon: Blocks,
  },
  {
    title: "Maps",
    href: "/dashboard/maps",
    icon: Map,
  },
];

function getInitials(name?: string) {
  if (!name) {
    return "GP";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const SideBar = () => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const pathname = usePathname();
  const { data: session } = useSession();

  const sections: NavSection[] = [
    {
      title: "Workspace",
      icon: Sparkles,
      badge: "Core",
      items: workspaceItems,
    },
    {
      title: "General",
      icon: Users,
      items: generalItems,
    },
  ];

  if (session?.user?.role !== "USER") {
    sections.push({
      title: "Administration",
      icon: Shield,
      badge: "Staff",
      items: administrationItems,
    });

    sections.push({
      title: "Owner",
      icon: Command,
      badge: "Root",
      items: ownerItems,
    });
  }

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="border-none bg-transparent"
    >
      <div className="flex size-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,14,18,0.98),rgba(9,9,12,0.95))] text-white shadow-2xl shadow-black/50">
        <SidebarHeader className="gap-3 px-3 pb-3 pt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                className="h-auto rounded-2xl bg-white/[0.04] p-3 hover:bg-white/[0.07] data-[active=true]:bg-white/[0.08]"
              >
                <Link href="/dashboard">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-black shadow-lg shadow-orange-900/30">
                    <Command className="size-5" />
                  </div>
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-semibold text-white">
                      Game Panel
                    </span>
                    <span className="truncate text-xs text-zinc-400">
                      Dashboard control center
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-3 group-data-[collapsible=icon]:hidden">
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/15">
                Online
              </Badge>
              <Badge variant="outline" className="border-white/10 text-zinc-300">
                Panel v2
              </Badge>
            </div>
            <p className="text-sm font-medium text-zinc-100">
              Navegação renovada
            </p>
            <p className="mt-1 text-xs leading-5 text-zinc-400">
              Acesse áreas principais, ferramentas administrativas e atalhos do
              servidor com um layout mais limpo.
            </p>
          </div>
        </SidebarHeader>

        <SidebarSeparator className="mx-3 bg-white/10" />

        <SidebarContent className="px-2 py-3">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1 pt-2">
              {sections.map((section) => {
                const sectionIsActive = section.items.some((item) =>
                  isRouteActive(pathname, item.href),
                );

                return (
                  <Collapsible
                    key={section.title}
                    defaultOpen={sectionIsActive || section.title === "Workspace"}
                    className="group/collapsible"
                  >
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={section.title}
                            isActive={sectionIsActive}
                            className="h-11 rounded-xl px-3 text-zinc-200 hover:bg-white/[0.05] hover:text-white data-[active=true]:bg-white/[0.07] data-[active=true]:text-white"
                          >
                            <section.icon className="size-4" />
                            <span className="font-medium">{section.title}</span>
                            {section.badge && (
                              <Badge
                                variant="outline"
                                className="ml-auto border-white/10 bg-white/[0.03] text-[10px] text-zinc-400 group-data-[collapsible=icon]:hidden"
                              >
                                {section.badge}
                              </Badge>
                            )}
                            <ChevronRight className="size-4 text-zinc-500 transition-transform group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                    </SidebarMenu>

                    <CollapsibleContent className="pt-1">
                      <SidebarMenuSub className="mx-0 ml-5 border-l border-white/10 px-2 py-1">
                        {section.items.map((item) => {
                          const active = isRouteActive(pathname, item.href);

                          return (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={active}
                                className="h-9 rounded-lg px-3 text-zinc-400 hover:bg-white/[0.05] hover:text-white data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-500/15 data-[active=true]:to-transparent data-[active=true]:text-orange-100 data-[active=true]:shadow-[inset_0_0_0_1px_rgba(251,146,60,0.18)]"
                              >
                                <Link href={item.href}>
                                  <item.icon className="size-4" />
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator className="mx-3 bg-white/10" />

        <SidebarFooter className="px-3 pb-4 pt-3">
          <SidebarMenu>
            <SidebarMenuItem>
              {mounted ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="h-auto rounded-2xl border border-white/10 bg-white/[0.04] p-3 hover:bg-white/[0.07]"
                    >
                      <Avatar className="size-10 rounded-2xl border border-white/10">
                        <AvatarFallback className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 font-semibold text-black">
                          {getInitials(session?.user?.Nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left">
                        <span className="truncate text-sm font-medium text-white">
                          {session?.user?.Nome ?? "Guest"}
                        </span>
                        <span className="truncate text-xs uppercase tracking-[0.18em] text-zinc-500">
                          {session?.user?.role ?? "User"}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4 text-zinc-500" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-xl border-white/10 bg-zinc-950 text-zinc-100"
                  >
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard/profile">
                        <UserRound className="size-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard/settings">
                        <Settings className="size-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard/support">
                        <LifeBuoy className="size-4" />
                        Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SidebarMenuButton
                  size="lg"
                  className="h-auto rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <Avatar className="size-10 rounded-2xl border border-white/10">
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 font-semibold text-black">
                      {getInitials(session?.user?.Nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-medium text-white">
                      {session?.user?.Nome ?? "Guest"}
                    </span>
                    <span className="truncate text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {session?.user?.role ?? "User"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-zinc-500" />
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default SideBar;
