"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import type { Book } from "@/app/components/book-card";
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  CopyIcon,
  Loader2Icon,
  PencilIcon,
  TagIcon,
  Trash2Icon,
  UserRoundIcon,
} from "lucide-react";
import { cn } from "cn";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/all-books`;

type MyBookCardProps = {
  book: Book;
};

export function MyBookCard({ book }: MyBookCardProps) {
  const router = useRouter();
  const copies = book.availableCopies ?? 0;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    const res = await fetch(`${API_URL}/${book._id}`, {
      method: "DELETE",
    });

    setDeleting(false);

    if (res.ok) {
      setDeleteOpen(false);
      toast.add({
        type: "success",
        title: "Book deleted",
        description: `"${book.bookTitle}" has been removed.`,
      });
      router.refresh();
    } else {
      toast.add({
        type: "error",
        title: "Couldn't delete the book",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
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
              <UserRoundIcon
                className="size-3.5 text-primary"
                aria-hidden="true"
              />
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
              href={` bookdetails/${book._id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-xl border-border/70 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground",
              )}
            >
              <BookOpenTextIcon aria-hidden="true" />
              View Details
              <ArrowRightIcon aria-hidden="true" />
            </Link>

            <Link
              href={`/edit-book/${book._id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-xl border-accent/50 text-accent transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent",
              )}
            >
              <PencilIcon aria-hidden="true" />
              Edit
            </Link>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              className="rounded-xl border-destructive/40 text-destructive transition-all duration-200 hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2Icon aria-hidden="true" />
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-xl">
              Delete this book?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {book.bookTitle} will be permanently removed from My Books and
              All Books. This can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl"
            >
              {deleting ? (
                <>
                  <Loader2Icon className="animate-spin" aria-hidden="true" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2Icon aria-hidden="true" />
                  Yes, delete
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}