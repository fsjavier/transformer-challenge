import {
  ArrowUpTrayIcon,
  HomeIcon,
  TableCellsIcon,
  RectangleGroupIcon,
} from "@heroicons/react/16/solid";
import React from "react";

export interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: "Upload data",
    href: "/upload",
    icon: <ArrowUpTrayIcon className="h-5 w-5" />,
  },
  {
    name: "View data",
    href: "/view",
    icon: <TableCellsIcon className="h-5 w-5" />,
  },
  {
    name: "Enrich data",
    href: "/enrich",
    icon: <RectangleGroupIcon className="h-5 w-5" />,
  },
];
