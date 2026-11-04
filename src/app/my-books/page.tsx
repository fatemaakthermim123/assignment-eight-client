import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import type { Book } from "@/app/components/book-card";
import { MyBookCard } from "@/app/components/my-book-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { LibraryBigIcon, LockIcon } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MyBooksPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  // Not logged in
  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
          <LockIcon className="size-7 text-primary" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-2xl text-primary">
          Login to see your books
        </h1>
        <p className="text-sm text-muted-foreground">
          Your added books show up here once you are logged in.
        </p>
        <Link
          href="/Login"
          className={cn(buttonVariants(), "rounded-full px-6")}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const res = await fetch(`${API_URL}/my-books/${user.email}`, {
    cache: "no-store",
  });
  const books: Book[] = res.ok ? await res.json() : [];

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-20 -z-10 size-72 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <header className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
          <h1 className="font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            My Books
          </h1>
          <div
            aria-hidden="true"
            className="h-1 w-24 rounded-full bg-linear-to-r from-transparent via-accent to-transparent"
          />
          <p className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-border/60">
            {books.length} {books.length === 1 ? "book" : "books"} added by you
          </p>
        </header>

        {books.length > 0 ? (
          <div className="flex flex-col gap-4">
            {books.map((book) => (
              <MyBookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <LibraryBigIcon
                className="size-7 text-primary"
                aria-hidden="true"
              />
            </span>
            <h2 className="font-heading text-xl">
              You haven&aops;t added any books
            </h2>
            <p className="text-sm text-muted-foreground">
              Add your first book and it will show up here.
            </p>
            <Link
              href="/add-book"
              className={cn(buttonVariants(), "rounded-full px-6")}
            >
              Add a book
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;