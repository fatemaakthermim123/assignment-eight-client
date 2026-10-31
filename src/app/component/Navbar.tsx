"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users as UsersIcon, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/Users", label: "Users", icon: UsersIcon },
  { href: "/add-new-user", label: "Add New User", icon: UserPlus },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center gap-1 px-4">
        <Link href="/" className="mr-4 text-base font-semibold tracking-tight">
          User Manager
        </Link>
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              isActive(href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
