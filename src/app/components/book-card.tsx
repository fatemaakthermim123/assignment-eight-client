import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { BookOpenTextIcon } from "lucide-react";

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
    <Card className="group flex h-full flex-col gap-3 pt-0 shadow-sm ring-foreground/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:ring-primary/25">
      {/* Cover image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.bookImage}
          alt={book.bookTitle}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft scrim so the glassy category badge always reads well */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 border border-border/60 bg-card/80 text-card-foreground shadow-sm backdrop-blur-md"
        >
          {book.category}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-1">
        <CardTitle className="text-base leading-snug transition-colors duration-200 group-hover:text-primary">
          {book.bookTitle}
        </CardTitle>
        <p className="text-sm text-muted-foreground">by {book.authorName}</p>
      </CardContent>

      <CardFooter className="mt-auto p-3 px-4">
        <Button
          variant="outline"
          className="w-full border-border/70 bg-transparent transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <BookOpenTextIcon aria-hidden="true" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
