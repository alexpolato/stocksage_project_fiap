"use client";

import * as React from "react";
import { Calendar, Home, Search, Sparkles } from "lucide-react";

import { NavMain } from "@/components/shad-comp/nav-main";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const navMain = [
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Home",
    url: "/app/dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Previsions",
    url: "/app/previsions",
    icon: Sparkles,
  },
  {
    title: "Calendar",
    url: "/app/calendar",
    icon: Calendar,
  },
];

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = React.useState(navMain);
  const handleItemClick = (title: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.title === title
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
  };
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data} onItemClick={handleItemClick} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
