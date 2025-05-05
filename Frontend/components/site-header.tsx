"use client";
// Libraries Imports
import {
  CircleHelp,
  CircleUserRound,
  FileSearch,
  LogOut,
  Settings,
} from "lucide-react";
// Local Imports
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 bg-[#d7e6c5] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex justify-center items-center gap-2">
          <FileSearch />
          <h2 className="text-xl sm:text-2xl font-medium">FinPlanner</h2>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <CircleHelp className="cursor-pointer" />
          <Settings className="cursor-pointer" />
          <CircleUserRound className="cursor-pointer" />
          <LogOut className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
