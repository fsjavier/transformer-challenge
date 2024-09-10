"use client";

import LinkNavigation from "./LinkNavigation";
import { NavLink, navLinks } from "./NavLinks";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  className?: string;
}

export default function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className={`bg-background-dark text-text-light ${className}`}>
      <ul className="flex justify-around">
        {navLinks.map((link: NavLink) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <LinkNavigation
                link={link}
                isActive={isActive}
                isNavCollapsed={true}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
