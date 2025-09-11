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
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

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
  const router = useRouter()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const handleLogout = () => {
    // Simulate logout process
    
    // Simulate logout delay
    setTimeout(() => {
      router.push('/login')
      // In a real app, you would redirect to login page or clear auth state
    }, 1000)
  }

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border/40">
      <SidebarContent className="bg-sidebar">
        {/* Logo Section */}
        <div className={cn(
          "flex items-center gap-2 px-4 py-4 border-b border-border/40",
          isCollapsed ? "justify-center px-2" : "justify-start"
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold shadow-sm">
            R
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-foreground tracking-tight">
              Ribbon
            </span>
          )}
        </div>
        
        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto">
          {navigation.map((group, index) => (
            <SidebarGroup key={index} className="px-2 py-2">
              {!isCollapsed && (
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  {group.title}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {item.subItems && !isCollapsed ? (
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton 
                              className={cn(
                                "flex items-center justify-between w-full rounded-lg",
                                "hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                                "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                                "group data-[state=open]:bg-accent/50"
                              )}
                              tooltip={isCollapsed ? item.title : undefined}
                            >
                              <div className="flex items-center gap-3">
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span className="font-medium">{item.title}</span>}
                              </div>
                              {!isCollapsed && (
                                <ChevronRight className="h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          {!isCollapsed && (
                            <CollapsibleContent className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                              <SidebarMenuSub className="ml-6 mt-1 space-y-1 border-l border-border/40 pl-3">
                                {item.subItems.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link 
                                        href={subItem.url} 
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md px-2 py-1.5"
                                      >
                                        {subItem.title}
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          )}
                        </Collapsible>
                      ) : (
                        <SidebarMenuButton 
                          asChild 
                          className={cn(
                            "rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                            "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                            isCollapsed ? "justify-center" : "justify-start"
                          )}
                          tooltip={isCollapsed ? item.title : undefined}
                        >
                          <Link 
                            href={item.url} 
                            className={cn(
                              "flex items-center gap-3 font-medium",
                              isCollapsed ? "justify-center" : "justify-start"
                            )}
                          >
                            <item.icon className="h-4 w-4 shrink-0" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
        
        {/* Logout Section */}
        <SidebarGroup className="mt-auto border-t border-border/40 px-2 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className={cn(
                    "rounded-lg hover:bg-gray-300 hover:text-destructive-foreground transition-all duration-200",
                    "focus:bg-grey-300 focus:text-destructive-foreground focus:outline-none",
                    "cursor-pointer w-full",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}
                  tooltip={isCollapsed ? "Log out" : undefined}
                >
                  <div className={cn(
                    "flex items-center gap-3 font-medium",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}>
                    <LogOut className="h-4 w-4 shrink-0" />
                    {!isCollapsed && <span>Log out</span>}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}