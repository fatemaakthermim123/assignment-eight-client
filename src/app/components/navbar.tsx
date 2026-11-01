"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const NAV_LINKS = [
  {label:'Home', href:'/'},
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo + title */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/library.png"
            alt="BookNook logo"
            width={50}
            height={36}
            className="rounded-full object-cover "
          />
          <span className="font-heading text-2xl font-bold text-primary">
            BookNook
          </span>
        </Link>

        {/* Middle links */}
        <nav aria-label="Main" className="flex items-center gap-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: isActive ? "default" : "ghost" }),
                  // Hover turns the text wine; tailwind-merge overrides ghost's hover:text-foreground
                  "hover:bg-transparent hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Register / Login */}
        <div className="flex items-center gap-2">
         <Link href="/Register"> <Button>Register</Button></Link>
         <Link href="/Login"> <Button variant="outline">Login</Button></Link>
        </div>
      </div>
    </header>
  );
}
