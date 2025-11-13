"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Church,
  GalleryVerticalEnd,
  Gem,
  LayoutDashboard,
  PieChart,
  Settings,
  Shield,
  SquareTerminal,
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
      title: "Member Management",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Member",
          url: "/dashboard/member-management/member",
        },
        {
          title: "Visitor",
          url: "/dashboard/member-management/visitor",
        },
        {
          title: "Evangelism - New Convert",
          url: "/dashboard/member-management/new-convert",
        },
      ],
    },
    {
      title: "Group Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Department",
          url: "/dashboard/group-management/department",
        },
      ],
    },
    {
      title: "Asset Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Facility",
          url: "#",
        },
        {
          title: "Inventory",
          url: "#",
        },
      ],
    },
    {
      title: "Accounting & Finance",
      url: "#",
      icon: Gem,
      items: [
        {
          title: "Income",
          url: "#",
        },
        {
          title: "Expenses",
          url: "#",
        },
        {
          title: "Balance sheet",
          url: "#",
        },
      ],
    },
    {
      title: "Event & Service Mgmt",
      url: "#",
      icon: Church,
      items: [
        {
          title: "Service",
          url: "#",
        },
        {
          title: "Event",
          url: "#",
        },
        {
          title: "Order of service",
          url: "#",
        },
      ],
    },
    {
      title: "Contribution Management",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Tithes Records",
          url: "#",
        },
      ],
    },
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavourite favourites={data.favoutites} />
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
