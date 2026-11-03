import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { ReturnBookButton } from "@/app/components/return-book-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "cn";
import { BookMarkedIcon, LockIcon } from "lucide-react";

const API_URL = "http://localhost:5000";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const MyBorrowsPage = async () => {
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
          Login to see your borrows
        </h1>
        <Link
          href="/Login"
          className={cn(buttonVariants(), "rounded-full px-6")}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const res = await fetch(`${API_URL}/borrows/${user.email}`, {
    cache: "no-store",
  });
  const borrows: Borrow[] = res.ok ? await res.json() : [];

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <header className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
          <h1 className="font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            My Borrows
          </h1>
          <div
            aria-hidden="true"
            className="h-1 w-24 rounded-full bg-linear-to-r from-transparent via-accent to-transparent"
          />
          <p className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-border/60">
            {borrows.length} {borrows.length === 1 ? "book" : "books"} borrowed
          </p>
        </header>

        {borrows.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl bg-card shadow-md ring-1 ring-foreground/5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrows.map((borrow) => (
                  <TableRow key={borrow._id}>
                    <TableCell>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        referrerPolicy="no-referrer"
                        className="h-20 w-14 rounded-lg bg-secondary object-cover shadow-sm"
                      />
                    </TableCell>
                    <TableCell className="font-heading text-base font-semibold">
                      {borrow.bookTitle}
                    </TableCell>
                    <TableCell>{formatDate(borrow.borrowDate)}</TableCell>
                    <TableCell>{formatDate(borrow.returnDate)}</TableCell>
                    <TableCell className="text-right">
                      <ReturnBookButton
                        borrowId={borrow._id}
                        bookTitle={borrow.bookTitle}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <BookMarkedIcon
                className="size-7 text-primary"
                aria-hidden="true"
              />
            </span>
            <h2 className="font-heading text-xl">
              You haven&apos;t borrowed any books
            </h2>
            <p className="text-sm text-muted-foreground">
              Borrow a book and it will show up here.
            </p>
            <Link
              href="/all-books"
              className={cn(buttonVariants(), "rounded-full px-6")}
            >
              Browse books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowsPage;