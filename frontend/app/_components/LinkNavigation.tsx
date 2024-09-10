import Link from "next/link";
import { NavLink } from "./NavLinks";

interface LinkNavigationProps {
  link: NavLink;
  isNavCollapsed?: boolean;
  isActive?: boolean;
}

export default function LinkNavigation({
  link,
  isNavCollapsed,
  isActive,
}: LinkNavigationProps) {
  return (
    <Link
      href={link.href}
      className={`flex items-center p-2 hover:bg-background-secondary hover:text-text-dark rounded-md
      ${isActive && "text-text-secondary"}
      ${isNavCollapsed && "justify-center"}
      `}
    >
      <span>{link.icon}</span>
      <span
        className={`whitespace-nowrap overflow-hidden ${
          isNavCollapsed ? "w-0 opacity-0" : "ml-2 w-auto opacity-100"
        }`}
      >
        {link.name}
      </span>
    </Link>
  );
}
