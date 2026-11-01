


import { BookCard, type Book } from "@/app/components/book-card";
import { BookOpenTextIcon, LibraryBigIcon } from "lucide-react";

const ALL_BOOKS_URL = "http://localhost:5000/all-books";

const AllBooksPage = async () => {
  const res = await fetch(ALL_BOOKS_URL, {
    cache: "no-store",
  });
  const books: Book[] = await res.json();

  return (
    <div className="relative isolate overflow-hidden">
      {/* Soft decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-20 -z-10 size-72 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Page heading */}
        <header className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            <LibraryBigIcon className="size-3.5" aria-hidden="true" />
            The BookNook Shelf
          </span>

          <h1 className="font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            All Books
          </h1>

          <p className="max-w-xl text-sm text-pretty text-muted-foreground sm:text-base">
            Browse the full BookNook collection — every story on the shelf, from
            timeless classics to fresh arrivals.
          </p>

          {/* Gold accent line */}
          <div
            aria-hidden="true"
            className="h-1 w-24 rounded-full bg-linear-to-r from-transparent via-accent to-transparent"
          />

          <p className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-border/60">
            <BookOpenTextIcon
              className="size-4 text-primary"
              aria-hidden="true"
            />
            {books.length} {books.length === 1 ? "book" : "books"} on the shelf
          </p>
        </header>

        {/* Cards grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <BookOpenTextIcon
                className="size-7 text-primary"
                aria-hidden="true"
              />
            </span>
            <h2 className="font-heading text-xl">The shelf is empty</h2>
            <p className="text-sm text-muted-foreground">
              No books have been added yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;