"use client";
// Libraries Imports
import {
  Calendar,
  ClipboardMinus,
  DollarSign,
  LayoutDashboard,
  ReceiptText,
  ShieldUser,
} from "lucide-react";
// Local Imports
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: DollarSign,
    },
    {
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: ReceiptText,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: ClipboardMinus,
    },
    {
      title: "Calender",
      url: "/dashboard/calender",
      icon: Calendar,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: ShieldUser,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <div className="flex flex-col justify-start items-start">
          <p className="text-xl">Total on your accounts</p>
          <h2 className="text-xl sm:text-2xl font-extrabold">$68.255</h2>
        </div>
        <Separator />
      </SidebarFooter>
    </Sidebar>
  );
}
