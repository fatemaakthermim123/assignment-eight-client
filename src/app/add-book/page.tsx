"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  BookOpenTextIcon,
  ImageIcon,
  Loader2Icon,
  LockIcon,
  PlusIcon,
  SparklesIcon,
  UserRoundIcon,
} from "lucide-react";

const BOOKS_URL = `${process.env.NEXT_PUBLIC_API_URL}/all-books`;

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

const AddBookPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.add({
        type: "error",
        title: "Login required",
        description: "Please login to add a book.",
      });
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    const newBook = {
      bookTitle: String(fd.get("bookTitle")).trim(),
      authorName: String(fd.get("authorName")).trim(),
      category: String(fd.get("category")),
      bookImage: String(fd.get("bookImage")).trim(),
      shortDescription: String(fd.get("shortDescription")).trim(),
            availableCopies: Number(fd.get("availableCopies")),
      addedByName: user.name,
      addedByEmail: user.email,
      addedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      const res = await fetch(BOOKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      toast.add({
        type: "success",
        title: "Book added",
        description: `"${newBook.bookTitle}" is now on the shelf.`,
      });

      form.reset();
      setImageUrl("");
      router.push("/all-books");
    } catch {
      toast.add({
        type: "error",
        title: "Couldn't add the book",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectClasses =
    "h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40";

  return (
    <div className="relative isolate overflow-hidden">
      {/* Soft decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 size-80 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Heading */}
        <header className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            <SparklesIcon className="size-3.5" aria-hidden="true" />
            Share a story
          </span>
          <h1 className="font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            Add Book
          </h1>
          <div
            aria-hidden="true"
            className="h-1 w-24 rounded-full bg-linear-to-r from-transparent via-accent to-transparent"
          />
          <p className="max-w-md text-sm text-pretty text-muted-foreground sm:text-base">
            Add a new book to the BookNook shelf. It shows up on the All Books
            page right away.
          </p>
        </header>

        <Card className="rounded-3xl border-0 bg-card/90 shadow-2xl ring-1 ring-foreground/5 backdrop-blur">
          <CardContent className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Section 1: Book info */}
              <section className="flex flex-col gap-5">
                <h2 className="flex items-center gap-2 font-heading text-lg">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpenTextIcon
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  Book info
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bookTitle">Book Title</Label>
                    <Input
                      id="bookTitle"
                      name="bookTitle"
                      placeholder="The Alchemist"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="authorName">Author Name</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      placeholder="Paulo Coelho"
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
                      required
                      defaultValue=""
                      className={selectClasses}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
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
                      min={1}
                      defaultValue={1}
                      required
                    />
                  </div>
                </div>
              </section>

              <div aria-hidden="true" className="h-px w-full bg-border" />

              {/* Section 2: Cover and description */}
              <section className="flex flex-col gap-5">
                <h2 className="flex items-center gap-2 font-heading text-lg">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <ImageIcon
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  Cover and description
                </h2>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bookImage">Book Image URL</Label>
                  <div className="flex items-start gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <Input
                        id="bookImage"
                        name="bookImage"
                        type="url"
                        placeholder="https://i.ibb.co/.../the-alchemist.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Paste a link to the book cover. A preview shows on the
                        right.
                      </p>
                    </div>

                    {/* Cover preview */}
                    <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary shadow-md ring-1 ring-foreground/5">
                      {imageUrl.trim() ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt="Cover preview"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon
                          className="size-6 text-muted-foreground/60"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    rows={4}
                    placeholder="A few lines about the book…"
                    required
                  />
                </div>
              </section>

              <div aria-hidden="true" className="h-px w-full bg-border" />

              {/* Section 3: Added by (locked) */}
              <section className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 font-heading text-lg">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <UserRoundIcon
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  Added by
                </h2>

                <div className="rounded-2xl bg-muted/60 p-4 ring-1 ring-border/60">
                  <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <LockIcon className="size-3.5" aria-hidden="true" />
                    Taken from your logged in account. This can&apos;t be changed.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="userName">User Name</Label>
                      <Input
                        id="userName"
                        value={
                          isPending ? "Loading…" : (user?.name ?? "Not logged in")
                        }
                        readOnly
                        className="cursor-not-allowed bg-muted font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="userEmail">User Email</Label>
                      <Input
                        id="userEmail"
                        value={
                          isPending
                            ? "Loading…"
                            : (user?.email ?? "Not logged in")
                        }
                        readOnly
                        className="cursor-not-allowed bg-muted font-medium"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                disabled={submitting || isPending}
                className="h-12 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                {submitting ? (
                  <>
                    <Loader2Icon className="animate-spin" aria-hidden="true" />
                    Adding…
                  </>
                ) : (
                  <>
                    <PlusIcon aria-hidden="true" />
                    Add Book
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddBookPage;