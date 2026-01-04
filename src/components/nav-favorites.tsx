"use client"

import {
    type LucideIcon,
} from "lucide-react"
import * as Icons from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useNavStore } from "@/store/nav-store"
import { Link } from "react-router-dom";

export function NavFavourite({
    favourites,
}: {
    favourites: {
        name: string
        url: string
        icon: any
    }[],
}) {
    const { selected, toggle } = useNavStore();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Fovourites</SidebarGroupLabel>
            <SidebarMenu>
                {favourites.map((item) => {
                    const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon;

                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild className={cn(selected === item.url && "bg-red-100 hover:bg-red-200")} onClick={() => toggle(item.url)}>
                                <Link to={item.url} className="text-xs font-medium ">
                                    {typeof item.icon === "string" ? <Icon /> : <item.icon />}
                                    <button>{item.name}</button>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}

            </SidebarMenu>
        </SidebarGroup>
    )
}
