"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "cn";
import {
  Loader2Icon,
  LogOutIcon,
  MailIcon,
  UserRoundIcon,
} from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  const [signingOut, setSigningOut] = useState(false);

  // Console log so the session payloads stay easy to inspect while developing.
  useEffect(() => {
    if (isPending) {
      console.log("Profile session: checking…");
    } else if (user) {
      console.log("Profile session: logged in as", user);
    } else {
      console.log("Profile session: no user logged in");
    }
  }, [isPending, user]);

  // First two letters of the username for the avatar fallback.
  const initials = user?.name?.trim()
    ? user.name.trim().slice(0, 2).toUpperCase()
    : "BN";

  async function handleLogout() {
    setSigningOut(true);
    try {
      await authClient.signOut();
      refetch();
      // After signing out, always land back on the homepage.
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setSigningOut(false);
    }
  }

  function renderAvatar(size: "default" | "lg") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 rounded-full bg-linear-to-tr from-primary via-brass to-primary p-[2px] shadow-sm",
          size === "lg" ? "size-12" : "size-8",
        )}
      >
        <Avatar size={size} className="rounded-full bg-card">
          {user?.image ? (
            <AvatarImage
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
          ) : null}
          <AvatarFallback className="bg-primary font-semibold tracking-widest text-primary-foreground text-sm">
            {initials}
          </AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
      </span>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page heading */}
      <header className="mb-8 flex flex-col items-center gap-2 text-center sm:mb-10 sm:gap-3">
        <span className="text-xs font-semibold tracking-[0.25em] text-accent uppercase sm:text-sm">
          The BookNook Library
        </span>
        <h1 className="font-heading text-primary">My Profile</h1>
        <p className="text-pretty max-w-md text-sm text-muted-foreground sm:text-base">
          Your little corner of the library — who you are to BookNook.
        </p>
        <div aria-hidden="true" className="mt-1 h-px w-20 bg-accent/60" />
      </header>

      {/* Profile card */}
      <div className="flex justify-center">
        {isPending ? (
          <Card className="w-full max-w-sm">
            <CardHeader className="flex-row items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex min-w-0 flex-col gap-1.5">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3.5 w-40" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              <Skeleton className="h-11 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </CardContent>
          </Card>
        ) : user ? (
          <Card className="w-full max-w-sm">
            <CardHeader className="flex-row items-center gap-3">
              {renderAvatar("lg")}
              <div className="flex min-w-0 flex-col">
                <CardTitle className="truncate">{user.name}</CardTitle>
                <CardDescription className="truncate">
                  {user.email}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2.5 rounded-lg bg-muted p-3">
                <UserRoundIcon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">Username</span>
                <span className="ml-auto truncate font-medium">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg bg-muted p-3">
                <MailIcon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">Email</span>
                <span className="ml-auto truncate font-medium">
                  {user.email}
                </span>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant="outline"
                className="w-full text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
                disabled={signingOut}
              >
                {signingOut ? (
                  <Loader2Icon
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <LogOutIcon aria-hidden="true" />
                )}
                {signingOut ? "Logging out…" : "Logout"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>No profile yet</CardTitle>
              <CardDescription>
                You are browsing as a guest — log in or register to see your
                BookNook profile.
              </CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Link href="/Login" className="flex">
                <Button>Login</Button>
              </Link>
              <Link
                href="/Register"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Register
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
