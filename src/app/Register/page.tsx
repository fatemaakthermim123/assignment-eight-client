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
import {
  CircleCheckIcon,
  CircleXIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
} from "lucide-react";

type FormErrors = Partial<
  Record<"name" | "email" | "photoUrl" | "password", string>
>;

const PASSWORD_RULES = [
  { label: "At least 6 characters", met: (value: string) => value.length >= 6 },
  {
    label: "One uppercase letter",
    met: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    met: (value: string) => /[a-z]/.test(value),
  },
] as const;

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);



  

  const isPasswordValid = PASSWORD_RULES.every((rule) => rule.met(password));

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

    if (!name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (photoUrl.trim()) {
      try {
        const parsed = new URL(photoUrl.trim());
        if (!["http:", "https:"].includes(parsed.protocol)) {
          throw new Error("unsupported protocol");
        }
      } catch {
        nextErrors.photoUrl =
          "Photo URL must be a valid http/https link to an image.";
      }
    }

    if (!password) {
      nextErrors.password = "Please enter a password.";
    } else if (!isPasswordValid) {
      nextErrors.password =
        "Password needs at least 6 characters, one uppercase and one lowercase letter.";
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
      const { data, error: signUpError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: photoUrl.trim() || undefined,
      });

      if (signUpError) {
        showToast(
          "error",
          "Registration failed",
          signUpError.message ??
            "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      if (data) {
        showToast(
          "success",
          "Welcome to BookNook!",
          "Your account has been created. Redirecting you home…",
        );
        // Give the success toast a moment before navigating.
        setTimeout(() => router.push("/"), 1800);
      }
    } catch {
      showToast(
        "error",
        "Registration failed",
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
          <form noValidate onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  Welcome to BookNook
                </h1>
                <p className="max-w-72 text-balance text-sm text-muted-foreground">
                  Register for a better reading experience — borrow, track and
                  curate your shelf.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="h-10 md:h-8"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? (
                  <FieldDescription
                    className="text-destructive"
                    role="alert"
                  >
                    {errors.name}
                  </FieldDescription>
                ) : null}
              </Field>

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
                <FieldLabel htmlFor="photo-url">
                  Photo URL{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  id="photo-url"
                  name="photoUrl"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="h-10 md:h-8"
                  value={photoUrl}
                  onChange={(event) => setPhotoUrl(event.target.value)}
                  aria-invalid={Boolean(errors.photoUrl)}
                />
                {errors.photoUrl ? (
                  <FieldDescription
                    className="text-destructive"
                    role="alert"
                  >
                    {errors.photoUrl}
                  </FieldDescription>
                ) : (
                  <FieldDescription>
                    A link to your profile picture — used next to your name.
                  </FieldDescription>
                )}
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
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="h-10 md:h-8"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                />

                {/* Live password checklist */}
                <ul className="mt-1 flex flex-col gap-1">
                  {PASSWORD_RULES.map((rule) => {
                    const met = rule.met(password);
                    return (
                      <li
                        key={rule.label}
                        className="flex items-center gap-2 text-sm"
                        aria-live="polite"
                      >
                        <span className="flex size-3.5 items-center justify-center [&_svg]:size-3.5">
                          {met ? (
                            <CircleCheckIcon className="text-emerald-600" />
                          ) : (
                            <CircleXIcon className="text-muted-foreground/60" />
                          )}
                        </span>
                        <span
                          className={
                            met ? "text-foreground" : "text-muted-foreground"
                          }
                        >
                          {rule.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>

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
                      Registering…
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have a BookNook account?{" "}
                  <Link href="/Login" className="underline underline-offset-2">
                    Login
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
                Your corner of the library awaits
              </CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Keep your books, borrows and reading habits organized in one
                cosy place.
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
