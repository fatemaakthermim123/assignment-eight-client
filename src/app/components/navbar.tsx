


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster, toast } from "@/components/ui/toast";
import { cn } from "cn";
import { Loader2Icon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Session viewer — check the browser console to see the session data.
  useEffect(() => {
    if (isPending) {
      console.log("BookNook session: checking…");
    } else if (user) {
      console.log("BookNook session: logged in as", user);
    } else {
      console.log("BookNook session: no user logged in");
    }
  }, [isPending, user]);

  // First two letters of the username for the avatar fallback.
  const initials = user?.name?.trim()
    ? user.name.trim().slice(0, 2).toUpperCase()
    : "BN";

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      refetch();
      setMenuOpen(false);
      router.push("/");
      toast.add({
        type: "success",
        title: "Logged out",
        description: "See you soon at BookNook!",
      });
    } catch {
      toast.add({
        type: "error",
        title: "Logout failed",
        description: "Could not sign you out. Please try again.",
      });
    } finally {
      setLoggingOut(false);
    }
  }

  const popoverMenuItemClasses =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 hover:bg-muted";

  function renderAvatar(size: "sm" | "default") {
    // Gradient hairline ring does not affect layout, the label sits next to it
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 rounded-full bg-linear-to-tr from-primary via-brass to-primary p-[2px] shadow-md",
          size === "sm" ? "size-6" : "size-9",
        )}
      >
        <Avatar size={size} className="bg-card">
          {user?.image ? (
            <AvatarImage
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
          ) : null}
          <AvatarFallback className="bg-primary font-semibold text-primary-foreground text-[0.6rem] tracking-widest group-data-[size=default]/avatar:text-[0.65rem]">
            {initials}
          </AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
      </span>
    );
  }

  function renderAuthActions() {
    return (
      <>
        <Link href="/Register">
          <Button className="rounded-full px-5 shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
            Register
          </Button>
        </Link>
        <Link href="/Login">
          <Button
            variant="outline"
            className="rounded-full border-primary/30 px-5 text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            Login
          </Button>
        </Link>
      </>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <Toaster />
      {/* Thin gold line at the bottom of the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brass/60 to-transparent"
      />

      {/* Mobile slide-out menu — the Sheet root wraps the whole row so every
          trigger (hamburger + mobile avatar) is inside Dialog.Root */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:gap-4 sm:px-6">
          {/* Mobile hamburger (opens the sheet menu) */}
          <div className="flex items-center gap-1">
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-full md:hidden",
              )}
              aria-label="Open menu"
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className="w-2xs max-w-[80vw] p-0">
              <SheetHeader className="border-b border-border bg-linear-to-br from-primary/10 via-background to-brass/10 p-5">
                <SheetTitle className="flex items-center gap-2.5 font-heading text-xl text-primary">
                  <Image
                    src="/images/library.png"
                    alt="BookNook logo"
                    width={40}
                    height={29}
                    className="rounded-full object-cover ring-2 ring-brass/40"
                  />
                  BookNook
                </SheetTitle>
                <SheetDescription>
                  Your corner of the library awaits
                </SheetDescription>
              </SheetHeader>

              {/* Navigation links */}
              <nav
                aria-label="Main"
                className="flex flex-col gap-1.5 overflow-y-auto p-3"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            buttonVariants({
                              variant: isActive ? "default" : "ghost",
                            }),
                            "h-11 w-full justify-start rounded-xl px-4 text-base",
                            isActive
                              ? "shadow-md shadow-primary/20"
                              : "hover:bg-primary/5 hover:text-primary",
                          )}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Auth actions at the bottom of the sheet */}
              <div className="mt-auto flex flex-col gap-2 border-t border-border bg-muted/30 p-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm ring-1 ring-border/60">
                      {renderAvatar("default")}
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <SheetClose
                      render={
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-xl"
                        >
                          <UserIcon />
                          My Profile
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-xl text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                      disabled={loggingOut}
                    >
                      {loggingOut ? (
                        <Loader2Icon
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <LogOutIcon />
                      )}
                      {loggingOut ? "Logging out…" : "Logout"}
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/Register" className="flex">
                      <Button className="w-full justify-center rounded-xl shadow-md shadow-primary/20">
                        Register
                      </Button>
                    </Link>
                    <Link href="/Login" className="flex">
                      <Button
                        variant="outline"
                        className="w-full justify-center rounded-xl"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>

            {/* Logo + title */}
            <Link href="/" className="group flex items-center gap-2.5">
              <Image
                src="/images/library.png"
                alt="BookNook logo"
                width={50}
                height={36}
                className="rounded-full object-cover ring-2 ring-brass/40 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
              />
              <span className="font-heading text-xl font-bold tracking-tight text-primary sm:text-2xl">
                BookNook
              </span>
            </Link>
          </div>

          {/* Middle links — desktop only */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full bg-muted/60 p-1 ring-1 ring-border/60">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        buttonVariants({
                          variant: isActive ? "default" : "ghost",
                          size: "sm",
                        }),
                        "rounded-full px-4 transition-all duration-200",
                        isActive
                          ? "shadow-md shadow-primary/25"
                          : "hover:bg-card hover:text-primary hover:shadow-sm",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Auth avatar / register-login — desktop and mobile */}
          <div className="flex items-center gap-2">
            {isPending ? (
              <span
                className="size-9 shrink-0 animate-pulse rounded-full bg-muted"
                aria-hidden="true"
              />
            ) : user ? (
              <>
                {/* Compact avatar on mobile — opens the sheet menu */}
                <SheetTrigger
                  aria-label="Open account menu"
                  className="cursor-pointer rounded-full outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring/50 md:hidden"
                >
                  {renderAvatar("default")}
                </SheetTrigger>

                {/* Desktop popover menu */}
                <div className="hidden md:block">
                  <Popover>
                    <PopoverTrigger
                      aria-label="Account menu"
                      className="cursor-pointer rounded-full outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      {renderAvatar("default")}
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-64 gap-0 overflow-hidden rounded-2xl p-0 shadow-xl ring-ring/40"
                    >
                      {/* Username / profile summary */}
                      <PopoverHeader className="flex-row items-center gap-3 border-b border-border bg-linear-to-br from-primary/10 via-background to-brass/10 p-4">
                        {renderAvatar("default")}
                        <div className="flex min-w-0 flex-col text-left">
                          <span className="truncate font-medium">
                            {user.name}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </PopoverHeader>
                      <div className="flex flex-col gap-1 p-1.5">
                        <Link
                          href="/Profile"
                          className={popoverMenuItemClasses}
                        >
                          <UserIcon className="size-4" aria-hidden="true" />
                          My Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={loggingOut}
                          className={cn(
                            popoverMenuItemClasses,
                            "text-destructive hover:bg-destructive/10",
                          )}
                        >
                          {loggingOut ? (
                            <Loader2Icon
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <LogOutIcon
                              className="size-4"
                              aria-hidden="true"
                            />
                          )}
                          {loggingOut ? "Logging out…" : "Logout"}
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            ) : (
              /* Desktop: register + login inline */
              <div className="hidden items-center gap-2 md:flex">
                {renderAuthActions()}
              </div>
            )}
          </div>
        </div>
      </Sheet>
    </header>
  );
}