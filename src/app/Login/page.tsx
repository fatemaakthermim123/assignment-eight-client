"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "@/components/ui/toast";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";

type FormErrors = Partial<Record<"email" | "password", string>>;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function showToast(
    type: "error" | "success",
    title: string,
    description = "",
  ) {
    toast.add({
      type,
      title,
      ...(description ? { description } : {}),
    });
  }

  function validate(): FormErrors | null {
    const nextErrors: FormErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Please enter your password.";
    }

    if (Object.keys(nextErrors).length === 0) {
      return null;
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validate();
    if (validation) {
      setErrors(validation);
      showToast(
        "error",
        "Please fix the form",
        Object.values(validation).join(" "),
      );
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        showToast(
          "error",
          "Login failed",
          signInError.message ??
            "Invalid email or password. Please try again.",
        );
        return;
      }

      if (data) {
        showToast(
          "success",
          "Welcome back to BookNook!",
          "You are logged in. Taking you home…",
        );
        // Give the success toast a moment before navigating.
        setTimeout(() => router.push("/"), 1800);
      }
    } catch {
      showToast(
        "error",
        "Login failed",
        "Could not reach the server. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-3 py-6 sm:px-6 sm:py-10 lg:py-12">
      <Toaster />
      <Card className="overflow-hidden border-border bg-card p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 md:p-10"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  Welcome back to BookNook
                </h1>
                <p className="max-w-72 text-balance text-sm text-muted-foreground">
                  Login to continue borrowing, browsing and building your
                  shelf.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  className="h-10 md:h-8"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? (
                  <FieldDescription
                    className="text-destructive"
                    role="alert"
                  >
                    {errors.email}
                  </FieldDescription>
                ) : null}
              </Field>

              <Field>
                <div className="flex items-baseline justify-between gap-2">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    onClick={() => setShowPassword((seen) => !seen)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    aria-pressed={showPassword}
                  >
                    <span className="flex size-3.5 items-center justify-center [&_svg]:size-3.5">
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="h-10 md:h-8"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                />
                {errors.password ? (
                  <FieldDescription
                    className="text-destructive"
                    role="alert"
                  >
                    {errors.password}
                  </FieldDescription>
                ) : null}
              </Field>

              <Field>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-10 md:h-9"
                >
                  {submitting ? (
                    <>
                      <Loader2Icon
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Logging in…
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  New to BookNook?{" "}
                  <Link
                    href="/Register"
                    className="underline underline-offset-2"
                  >
                    Register
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>

          {/* Book-themed side panel */}
          <div className="relative hidden bg-primary md:block">
            <Image
              src="/images/library.png"
              alt="BookNook library shelves"
              fill
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-primary/30"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6 text-primary-foreground lg:p-8">
              <CardTitle className="text-primary-foreground">
                Your shelf has been waiting for you
              </CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Pick up right where you left off — your borrows and habits are
                right where you saved them.
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
