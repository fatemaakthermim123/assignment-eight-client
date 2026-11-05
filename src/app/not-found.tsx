import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">
        404
      </p>
      <h1 className="mt-3">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved. Head
        back home or view everyone already registered.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button size="lg" render={<Link href="/">Back to home</Link>} />
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/Users">View all books</Link>}
        />
      </div>
    </div>
  );
}
