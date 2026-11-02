import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Book } from "@/app/components/book-card";
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  CopyIcon,
  TagIcon,
  UserRoundIcon,
} from "lucide-react";
import { cn } from "cn";

type MyBookCardProps = {
  book: Book;
};

export function MyBookCard({ book }: MyBookCardProps) {
  const copies = book.availableCopies ?? 0;

  return (
    <Card className="group flex-row items-stretch gap-4 overflow-hidden rounded-2xl border-0 p-3 shadow-md ring-1 ring-foreground/5 transition-all duration-300 ease-out hover:shadow-xl hover:ring-primary/30 sm:gap-6 sm:p-4">
      {/* Cover */}
      <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary shadow-md sm:h-44 sm:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.bookImage}
          alt={book.bookTitle}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 className="line-clamp-2 font-heading text-lg leading-snug transition-colors duration-200 group-hover:text-primary sm:text-xl">
          {book.bookTitle}
        </h2>

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <UserRoundIcon className="size-3.5 text-primary" aria-hidden="true" />
          </span>
          <span className="truncate">{book.authorName}</span>
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="gap-1.5 border border-border/60 px-2.5 py-1"
          >
            <TagIcon className="size-3" aria-hidden="true" />
            {book.category}
          </Badge>
          <Badge
            variant="secondary"
            className="gap-1.5 border border-border/60 px-2.5 py-1 text-primary"
          >
            <CopyIcon className="size-3" aria-hidden="true" />
            {copies} {copies === 1 ? "copy" : "copies"}
          </Badge>
        </div>

        {book.shortDescription ? (
          <p className="line-clamp-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">
            {book.shortDescription}
          </p>
        ) : null}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Link
            href={`/${book._id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-xl border-border/70 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground",
            )}
          >
            <BookOpenTextIcon aria-hidden="true" />
            View Details
            <ArrowRightIcon aria-hidden="true" />
          </Link>

          {/* Edit and Delete buttons will be added here in the next steps */}
        </div>
      </div>
    </Card>
  );
}