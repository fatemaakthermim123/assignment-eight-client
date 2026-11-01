



import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, BookOpenTextIcon, TagIcon, UserRoundIcon } from "lucide-react";
import { cn } from "cn";

export type Book = {
  _id: string;
  bookTitle: string;
  authorName: string;
  category: string;
  bookImage: string;
  shortDescription?: string;
};

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border-0 pt-0 shadow-md ring-1 ring-foreground/5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:ring-primary/30">
      {/* Cover image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.bookImage}
          alt={book.bookTitle}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient so the image blends into the card and the badge reads well */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10 transition-opacity duration-300 group-hover:from-black/55"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 gap-1.5 border border-white/30 bg-white/80 px-2.5 py-1 text-foreground shadow-md backdrop-blur-md"
        >
          <TagIcon className="size-3" aria-hidden="true" />
          {book.category}
        </Badge>
      </div>

      {/* Gold accent line that grows on hover */}
      <div
        aria-hidden="true"
        className="h-0.5 w-12 bg-linear-to-r from-accent to-transparent transition-all duration-500 group-hover:w-full"
      />

      <CardContent className="flex flex-1 flex-col gap-2 px-4 pt-4">
        <CardTitle className="line-clamp-2 font-heading text-lg leading-snug transition-colors duration-200 group-hover:text-primary">
          {book.bookTitle}
        </CardTitle>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <UserRoundIcon className="size-3.5 text-primary" aria-hidden="true" />
          </span>
          <span className="truncate">{book.authorName}</span>
        </p>
      
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-3">
        <Link
          href={`/${book._id}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full rounded-xl border-border/70 bg-transparent transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25",
          )}
        >
          <BookOpenTextIcon aria-hidden="true" />
          View Details
          <ArrowRightIcon
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}