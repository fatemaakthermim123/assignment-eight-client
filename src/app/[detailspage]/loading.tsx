
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#722F37]/10">
        <BookOpen className="size-8 animate-pulse text-[#722F37]" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#722F37]">
          Loading Book Details...
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Please wait while we prepare your book.
        </p>
      </div>

      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-[#722F37]" />
      </div>
    </div>
  );
}
