"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Loader2Icon, Undo2Icon } from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ReturnBookButtonProps = {
  borrowId: string;
  bookTitle: string;
};

export function ReturnBookButton({
  borrowId,
  bookTitle,
}: ReturnBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    setLoading(true);

        const token = await getTokenFromClient();

    const res = await fetch(`${API_URL}/borrows/${borrowId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });

    setLoading(false);

    if (res.ok) {
      toast.add({
        type: "success",
        title: "Book returned",
        description: `"${bookTitle}" has been returned.`,
      });
      router.refresh();
    } else {
      toast.add({
        type: "error",
        title: "Couldn't return the book",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleReturn}
      disabled={loading}
      className="rounded-xl border-primary/40 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground"
    >
      {loading ? (
        <Loader2Icon className="animate-spin" aria-hidden="true" />
      ) : (
        <Undo2Icon aria-hidden="true" />
      )}
      Return Book
    </Button>
  );
}