"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Selected Works" },
  { href: "/contacts", label: "Contacts" },
];

export default function Sidebar({ brandName }: { brandName: string }) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">{brandName}</div>
        <nav>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer">&copy; {new Date().getFullYear()}</div>
    </aside>
  );
}
