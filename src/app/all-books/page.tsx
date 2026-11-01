import { BookCard, type Book } from "@/app/components/book-card";
import { BookOpenTextIcon } from "lucide-react";

const ALL_BOOKS_URL = "http://localhost:5000/all-books";

const AllBooksPage = async () => {
  const res = await fetch(ALL_BOOKS_URL, {
    cache: "no-store",
  });
  const books: Book[] = await res.json();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page heading */}
      <header className="mb-8 flex flex-col items-center gap-2 text-center sm:mb-12 sm:gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent sm:text-sm">
          The BookNook Shelf
        </span>
        <h1 className="font-heading text-primary">All Books</h1>
        <p className="text-pretty max-w-xl text-sm text-muted-foreground sm:text-base">
          Browse the full BookNook collection — every story on the shelf, from
          timeless classics to fresh arrivals.
        </p>
        <div
          aria-hidden="true"
          className="mt-1 h-px w-20 bg-accent/60"
        />
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <BookOpenTextIcon className="size-4 text-accent" aria-hidden="true" />
          {books.length} {books.length === 1 ? "book" : "books"} on the shelf
        </p>
      </header>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
