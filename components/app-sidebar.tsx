"use client"

import {
  ChevronRight,
  Home,
  BarChart3,
  Table,
  Users,
  Settings,
  LogOut,
  CreditCard,
  TrendingUp,
  FileText,
  Shield,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard Alt",
        url: "/dashboard-alt",
        icon: BarChart3,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Data",
    items: [
      {
        title: "Tables",
        url: "/tables",
        icon: Table,
      },
      {
        title: "Reports",
        url: "/reports",
        icon: FileText,
        subItems: [
          {
            title: "Monthly Reports",
            url: "/reports/monthly",
          },
          {
            title: "Annual Reports",
            url: "/reports/annual",
          },
        ],
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Team",
        url: "/team",
        icon: Users,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-semibold">
            R
          </div>
          <span className="text-lg font-semibold">Ribbon</span>
        </div>
        
        {navigation.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.subItems ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            className="flex items-center justify-between w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            <ChevronRight className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url} className="text-sm">
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}