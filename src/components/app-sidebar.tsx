"use client"

import * as React from "react"
import {
  AlarmClockMinus,
  Bot,
  Church,
  // Gem,
  Group,
  House,
  LayoutDashboard,
  MonitorCheck,
  PieChart,
  ReceiptCent,
  Settings,
  Shield,
  SquareTerminal,
  Users,
  Users2,
  Wallet,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavFavourite } from "./nav-favorites"
import { NavProjects } from "./nav-projects"
import { useFavStore } from "@/store/favourite-store"

// This is sample data.
const data = {
  user: {
    name: "ChMS",
    email: "info@chms.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ChMS Inc",
      logo: Church,
      plan: "Enterprise",
    },
  ],
  favoutites: [
    {
      name: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  navMain: [
    {
      title: "Contribution Mgmt",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Tithes Records",
          url: "/dashboard/contribution-management/tithes",
          icon: MonitorCheck,
        },
        {
          title: "Offering Records",
          url: "/dashboard/contribution-management/offerings",
          icon: ReceiptCent,
        },
      ],
    },
    {
      title: "Member Management",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Member",
          url: "/dashboard/member-management/member",
          icon: Users,
        },
        {
          title: "Visitor",
          url: "/dashboard/member-management/visitor",
          icon: AlarmClockMinus,
        },
        {
          title: "Evangelism - New Convert",
          url: "/dashboard/member-management/new-convert",
          icon: House,
        },
      ],
    },
    {
      title: "Families & Groups",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Group",
          url: "/dashboard/group-management/group",
          icon: Group,
        },
        {
          title: "Family",
          url: "/dashboard/group-management/family",
          icon: Users2,
        },
      ],
    },
    // {
    //   title: "Asset Management",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Facility",
    //       url: "/dashboard/asset-management/facility",
    //       icon: LayoutDashboard,
    //     },
    //     {
    //       title: "Inventory",
    //       url: "/dashboard/asset-management/inventory",
    //       icon: LayoutDashboard,
    //     },
    //   ],
    // },
    // {
    //   title: "Accounting & Finance",
    //   url: "#",
    //   icon: Gem,
    //   items: [
    //     {
    //       title: "Income",
    //       url: "/dashboard/accounting-finance/income",
    //       icon: LayoutDashboard,
    //     },
    //     {
    //       title: "Expenses",
    //       url: "/dashboard/accounting-finance/expenses",
    //       icon: LayoutDashboard,
    //     },
    //     {
    //       title: "Balance sheet",
    //       url: "/dashboard/accounting-finance/balance-sheet",
    //       icon: LayoutDashboard,
    //     },
    //   ],
    // },
    // {
    //   title: "Event & Service Mgmt",
    //   url: "#",
    //   icon: Church,
    //   items: [
    //     {
    //       title: "Service",
    //       url: "/dashboard/event-service/service",
    //       icon: LayoutDashboard,
    //     },
    //     {
    //       title: "Event",
    //       url: "/dashboard/event-service/event",
    //       icon: LayoutDashboard,
    //     },
    //     {
    //       title: "Order of service",
    //       url: "/dashboard/event-service/order-of-service",
    //       icon: LayoutDashboard,
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "User Account",
      url: "#",
      icon: Shield,
    },
    {
      name: "Generate report",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { items } = useFavStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavourite favourites={[...data.favoutites, ...items as any]} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
