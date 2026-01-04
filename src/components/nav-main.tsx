import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";
import { useNavStore } from "@/store/nav-store";
import { cn } from "@/lib/utils";
import { useFavStore } from "@/store/favourite-store";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string,
      icon?: LucideIcon
    }[]
  }[]
}) {

  const { selected, toggle } = useNavStore();
  const { addTo } = useFavStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={selected.includes(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span className="text-xs">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    // const Icon = Icons[subItem.icon as keyof typeof Icons] as LucideIcon;

                    return (<SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className={cn(selected == subItem.url && "bg-red-100 hover:bg-red-200")} onClick={() => {
                        toggle(subItem.url);
                        addTo({ name: subItem.title, url: subItem.url, icon: subItem.icon?.displayName });
                      }}>
                        <Link to={subItem.url}>
                          {subItem.icon && <subItem.icon />}
                          {/* {typeof subItem.icon === "string" && <Icon />} */}
                          <span className="text-xs">{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>)
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
