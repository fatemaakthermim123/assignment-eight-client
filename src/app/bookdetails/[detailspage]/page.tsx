import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/app/components/book-card";
import { BorrowButton } from "@/app/components/borrow-button";
import { cn } from "cn";
import {
  ArrowLeftIcon,
  BookXIcon,
  CopyIcon,
  MailIcon,
  SparklesIcon,
  TagIcon,
  UserRoundIcon,
  UserRoundPlusIcon,
} from "lucide-react";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const ALL_BOOKS_URL = `${process.env.NEXT_PUBLIC_API_URL}/all-books`;


type DetailsPageProps = {
  params: Promise<{ detailspage: string }>;
};

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { detailspage: id } = await params;
const token= await getTokenFromServer()
console.log(token)
  let book: Book | null = null;

  try {
    const res = await fetch(`${ALL_BOOKS_URL}/${id}`, {
     
    
     headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
     },
        },);

    if (!res.ok) {
      notFound();
    }

    book = (await res.json()) as Book;
  } catch {
    notFound();
  }

  if (!book) {
    notFound();
  }

  const copies = book.availableCopies ?? 0;
  const inStock = copies > 0;
  const addedByName = book.addedByName ?? "Unknown";
  const addedByEmail = book.addedByEmail ?? "Unknown";

  return (
    <div className="relative isolate">
      {/* Soft decorative glows behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 size-80 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/all-books"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group -ml-2 hover:bg-transparent hover:text-primary",
            )}
          >
            <ArrowLeftIcon
              className="transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to All Books
          </Link>
        </div>

        <Card className="group/card gap-0 overflow-hidden rounded-3xl border-0 bg-card/90 p-0 shadow-2xl ring-1 ring-foreground/5 backdrop-blur md:grid md:grid-cols-[2fr_3fr] md:items-stretch">
          {/* Cover */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.bookImage}
              alt={book.bookTitle}
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full max-w-none object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/5"
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-6 bg-linear-to-l from-black/15 to-transparent md:block"
            />
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 gap-1.5 border border-white/30 bg-white/80 px-3 py-1 text-foreground shadow-md backdrop-blur-md"
            >
              <TagIcon className="size-3" aria-hidden="true" />
              {book.category}
            </Badge>

            {/* Stock badge */}
            <span
              className={cn(
                "absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md",
                inStock
                  ? "bg-primary text-primary-foreground"
                  : "bg-foreground/70 text-white",
              )}
            >
              {inStock ? (
                <CopyIcon className="size-3.5" aria-hidden="true" />
              ) : (
                <BookXIcon className="size-3.5" aria-hidden="true" />
              )}
              {inStock
                ? `${copies} ${copies === 1 ? "copy" : "copies"} available`
                : "Not available"}
            </span>
          </div>

          {/* Details */}
          <CardContent className="flex flex-col justify-center gap-6 p-6 sm:p-10">
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-accent uppercase">
                <SparklesIcon className="size-3.5" aria-hidden="true" />
                Book Details
              </span>
              <h1 className="font-heading text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
                {book.bookTitle}
              </h1>
              <div
                aria-hidden="true"
                className="h-1 w-16 rounded-full bg-linear-to-r from-accent to-accent/20"
              />
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                  <UserRoundIcon
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                </span>
                by{" "}
                <span className="font-medium text-foreground">
                  {book.authorName}
                </span>
              </p>
            </div>

            {/* Short description */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
              <h2 className="font-heading text-lg">About this book</h2>
              <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">
                {book.shortDescription ??
                  "No description has been added for this book yet."}
              </p>
            </div>

            {/* Info tiles */}
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <UserRoundIcon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Author</dt>
                  <dd className="truncate font-semibold">{book.authorName}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <TagIcon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Category</dt>
                  <dd className="truncate font-semibold">{book.category}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:col-span-2">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl shadow-sm",
                    inStock
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  <CopyIcon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">
                    Available Copies
                  </dt>
                  <dd
                    className={cn(
                      "font-semibold",
                      inStock ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {inStock ? copies : "0 (currently unavailable)"}
                  </dd>
                </div>
              </div>
            </dl>

            {/* Added by */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
              <h2 className="flex items-center gap-2 font-heading text-lg">
                <UserRoundPlusIcon
                  className="size-5 text-accent"
                  aria-hidden="true"
                />
                Added by
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-primary to-accent text-sm font-semibold text-primary-foreground shadow-md">
                  {addedByName.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{addedByName}</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MailIcon
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate">{addedByEmail}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Borrow button + modal */}
            <BorrowButton
              bookId={book._id}
              bookTitle={book.bookTitle}
              bookImage={book.bookImage}
              availableCopies={copies}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailsPage;