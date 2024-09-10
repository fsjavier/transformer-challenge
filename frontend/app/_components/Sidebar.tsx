"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import LinkNavigation from "./LinkNavigation";
import { NavLink, navLinks } from "./NavLinks";
import { usePathname } from "next/navigation";
import { useCollapsible } from "../_hooks/useCollapsible";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isCollapsed: isNavCollapsed, toggle: toggleNav } = useCollapsible();
  const pathname = usePathname();

  return (
    <nav
      className={`row-start-2 col-start-1 h-full overflow-hidden bg-background-dark text-text-light ${className}`}
    >
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col h-full ${
          isNavCollapsed ? "w-16" : "w-52"
        }`}
      >
        <button
          className="self-end p-2 m-2 rounded-full focus:outline-none"
          onClick={toggleNav}
        >
          {isNavCollapsed ? (
            <ChevronRightIcon className="h-6 w-6 rounded-full hover:bg-background-secondary hover:text-text-dark" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6 rounded-full hover:bg-background-secondary hover:text-text-dark" />
          )}
        </button>
        <ul className="space-y-2 p-2">
          {navLinks.map((link: NavLink) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.name}>
                <LinkNavigation
                  link={link}
                  isNavCollapsed={isNavCollapsed}
                  isActive={isActive}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
