
import { BookCard, type Book } from "@/app/components/book-card";
import { BookOpenTextIcon } from "lucide-react";
import { connection } from "next/server";

const LATEST_BOOKS_URL = `${process.env.NEXT_PUBLIC_API_URL}/latest-books`;

const LatestBooks = async () => {
  await connection();

  const res = await fetch(LATEST_BOOKS_URL, {
    cache: "no-store",
  });

  const books: Book[] = await res.json();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
          <BookOpenTextIcon className="size-4" />
          Fresh Arrivals
        </span>

        <h2 className="font-heading text-3xl text-primary sm:text-4xl">
          Latest Added Books
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          Discover the newest additions to our BookNook collection.
        </p>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-muted-foreground">
          No books added yet.
        </p>
      )}
    </section>
  );
};

export default LatestBooks;
