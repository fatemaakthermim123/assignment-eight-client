"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import type { Book } from "@/app/components/book-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { cn } from "cn";
import { LockIcon, PencilIcon, SaveIcon } from "lucide-react";

const API_URL = "http://localhost:5000/all-books";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setBook(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const updatedBook = {
      bookTitle: String(fd.get("bookTitle")).trim(),
      authorName: String(fd.get("authorName")).trim(),
      category: String(fd.get("category")),
      bookImage: String(fd.get("bookImage")).trim(),
      shortDescription: String(fd.get("shortDescription")).trim(),
      availableCopies: Number(fd.get("availableCopies")),
    };

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    if (res.ok) {
      toast.add({
        type: "success",
        title: "Book updated",
        description: `"${updatedBook.bookTitle}" has been saved.`,
      });
      router.push("/my-books");
      router.refresh();
    } else {
      toast.add({
        type: "error",
        title: "Couldn't update the book",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const selectClasses =
    "h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40";

  if (loading || isPending) {
    return <p className="p-10 text-center">Loading…</p>;
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-heading text-2xl text-primary">Book not found</h1>
        <Link
          href="/my-books"
          className={cn(buttonVariants(), "mt-4 rounded-full px-6")}
        >
          Back to My Books
        </Link>
      </div>
    );
  }

  // শুধু যে বইটা যোগ করেছে সে-ই এডিট করতে পারবে
  if (user?.email !== book.addedByEmail) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-heading text-2xl text-primary">
          You can&apos;t edit this book
        </h1>
        <Link
          href="/my-books"
          className={cn(buttonVariants(), "mt-4 rounded-full px-6")}
        >
          Back to My Books
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-accent uppercase">
          <PencilIcon className="size-3.5" aria-hidden="true" />
          Update your book
        </span>
        <h1 className="font-heading text-4xl text-primary sm:text-5xl">
          Edit Book
        </h1>
        <div className="h-1 w-24 rounded-full bg-accent" />
      </header>

      <Card className="rounded-3xl border-0 shadow-2xl ring-1 ring-foreground/5">
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="bookTitle">Book Title</Label>
                <Input
                  id="bookTitle"
                  name="bookTitle"
                  defaultValue={book.bookTitle}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  name="authorName"
                  defaultValue={book.authorName}
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  defaultValue={book.category}
                  required
                  className={selectClasses}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="availableCopies">Available Copies</Label>
                <Input
                  id="availableCopies"
                  name="availableCopies"
                  type="number"
                  min={0}
                  defaultValue={book.availableCopies ?? 0}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bookImage">Book Image URL</Label>
              <Input
                id="bookImage"
                name="bookImage"
                type="url"
                defaultValue={book.bookImage}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                rows={4}
                defaultValue={book.shortDescription ?? ""}
                required
              />
            </div>

            {/* Read-only user info */}
            <div className="rounded-2xl bg-muted/60 p-4 ring-1 ring-border/60">
              <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <LockIcon className="size-3.5" aria-hidden="true" />
                Added by. This can&apos;t be changed.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="userName">User Name</Label>
                  <Input
                    id="userName"
                    value={book.addedByName ?? ""}
                    readOnly
                    className="cursor-not-allowed bg-muted font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="userEmail">User Email</Label>
                  <Input
                    id="userEmail"
                    value={book.addedByEmail ?? ""}
                    readOnly
                    className="cursor-not-allowed bg-muted font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/my-books"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 flex-1 rounded-2xl text-base",
                )}
              >
                Cancel
              </Link>
              <Button
                type="submit"
                className="h-12 flex-1 rounded-2xl text-base font-semibold shadow-lg shadow-primary/25"
              >
                <SaveIcon aria-hidden="true" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBookPage;