import { AlignJustify, LayoutDashboard, Mail, Search, Settings } from "lucide-react";
import { ChartNoAxesColumn } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Find",
    url: "#",
    icon: Search,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Mail,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white text-white h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-500"
          >
            <path
              d="M6.06654 8.11095H4.12488V10.0526H6.06654V8.11095Z"
              fill="#EC6316"
            />
            <path
              d="M6.06654 10.8496H4.12488V17.4513H6.06654V10.8496Z"
              fill="#EC6316"
            />
            <path
              d="M9.97154 4.35021H8.02988V6.29188H9.97154V4.35021Z"
              fill="#EC6316"
            />
            <path
              d="M9.97154 7.0889H8.02988V17.4512H9.97154V7.0889Z"
              fill="#EC6316"
            />
            <path
              d="M13.8749 0.548645H11.9332V2.4903H13.8749V0.548645Z"
              fill="#EC6316"
            />
            <path
              d="M13.8749 3.28753H11.9332V17.4514H13.8749V3.28753Z"
              fill="#EC6316"
            />
          </svg>
          <h1 className="font-semibold text-2xl ml-2 text-black">ELT Global</h1>
        </div>

        <div className="flex items-center cursor-pointer">
          <AlignJustify className="text-gray-400 hover:text-orange-500" size={24} />
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">GENERAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <a
                    href={item.url}
                    className="flex items-center p-3 rounded-2xl text-black hover:bg-orange-500 hover:text-white transition-colors duration-300"
                  >
                    <item.icon
                      className="mr-3 text-xl text-orange-500 group-hover:text-white"
                    />
                    <span className="font-medium">{item.title}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
