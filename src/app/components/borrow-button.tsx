"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import {
  BookmarkPlusIcon,
  BookXIcon,
  Loader2Icon,
  LockIcon,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type BorrowButtonProps = {
  bookId: string;
  bookTitle: string;
  bookImage: string;
  availableCopies: number;
};

export function BorrowButton({
  bookId,
  bookTitle,
  bookImage,
  availableCopies,
}: BorrowButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const inStock = availableCopies > 0;

  const handleOpen = () => {
    if (!user) {
      toast.add({
        type: "error",
        title: "Login required",
        description: "Please login to borrow a book.",
      });
      return;
    }
    setOpen(true);
  };

  const handleBorrow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

        const token = await getTokenFromClient();

    const res = await fetch(`${API_URL}/borrows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId,
        bookTitle,
        bookImage,
      }),
    });
    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      setOpen(false);
      toast.add({
        type: "success",
        title: "Book borrowed",
        description: `"${bookTitle}" is now in My Borrows.`,
      });
      router.refresh();
    } else {
      setOpen(false);
      toast.add({
        type: "error",
        title: "Couldn't borrow the book",
        description: data.error ?? "Something went wrong.",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        disabled={!inStock}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
      >
        {inStock ? (
          <BookmarkPlusIcon className="size-5" aria-hidden="true" />
        ) : (
          <BookXIcon className="size-5" aria-hidden="true" />
        )}
        {inStock ? "Borrow this Book" : "Not Available"}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-primary">
              Borrow this book
            </DialogTitle>
            <DialogDescription>
              You are borrowing {bookTitle}. Please return it within 7 days.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBorrow} className="flex flex-col gap-5">
            <div className="rounded-2xl bg-muted/60 p-4 ring-1 ring-border/60">
              <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <LockIcon className="size-3.5" aria-hidden="true" />
                Taken from your account. This can&apos;t be changed.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="borrowUserName">User Name</Label>
                  <Input
                    id="borrowUserName"
                    value={user?.name ?? ""}
                    readOnly
                    className="cursor-not-allowed bg-muted font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="borrowUserEmail">User Email</Label>
                  <Input
                    id="borrowUserEmail"
                    value={user?.email ?? ""}
                    readOnly
                    className="cursor-not-allowed bg-muted font-medium"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl shadow-md shadow-primary/25"
              >
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin" aria-hidden="true" />
                    Borrowing…
                  </>
                ) : (
                  "Confirm Borrow"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}