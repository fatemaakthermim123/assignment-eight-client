import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 bg-background text-foreground">

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Logo & Description */}
        <div>
          <Link href="/" className="mb-5 inline-flex items-center gap-3">
            <img
              src="/images/library.png"
              alt="BookNook Logo"
              className="h-16 w-auto object-contain"
            />

            <span className="font-heading text-2xl font-bold text-[#722F37]">
              BookNook
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-muted-foreground">
            Your cozy corner for discovering wonderful books, exploring new
            stories, and sharing the joy of reading.
          </p>

          {/* Social Links */}
          <div className="mt-6 flex items-center gap-3">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-lg bg-secondary text-[#722F37] transition hover:bg-[#722F37] hover:text-white"
            >
              <FaFacebookF className="size-5" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-lg bg-secondary text-[#722F37] transition hover:bg-[#722F37] hover:text-white"
            >
              <FaInstagram className="size-5" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="flex size-10 items-center justify-center rounded-lg bg-secondary text-[#722F37] transition hover:bg-[#722F37] hover:text-white"
            >
              <FaTwitter className="size-5" />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-foreground">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition hover:text-[#722F37]">
                Home
              </Link>
            </li>

            <li>
              <Link href="/all-books" className="transition hover:text-[#722F37]">
                All Books
              </Link>
            </li>

            <li>
              <Link href="/my-books" className="transition hover:text-[#722F37]">
                My Books
              </Link>
            </li>

            <li>
              <Link href="/profile" className="transition hover:text-[#722F37]">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-foreground">
            Categories
          </h3>

          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Fiction", "Science", "History", "Kids"].map((category) => (
              <li key={category}>
                <Link
                  href={`/all-books?category=${category}`}
                  className="transition hover:text-[#722F37]"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-foreground">
            Contact Us
          </h3>

          <ul className="space-y-4 text-sm text-muted-foreground">

            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-[#722F37]" />
              <a
                href="mailto:booknook@example.com"
                className="transition hover:text-[#722F37]"
              >
                booknook@example.com
              </a>
            </li>

            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-[#722F37]" />
              <a
                href="tel:+8801700000000"
                className="transition hover:text-[#722F37]"
              >
                +880 1700-000000
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-[#722F37]" />
              <span>Bangladesh</span>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-muted-foreground sm:px-6 md:flex-row">

          <p>
            © 2026 BookNook. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <span
              className="cursor-pointer transition hover:text-[#722F37]"
            >
              Privacy Policy
            </span>

            <span
              className="cursor-pointer transition hover:text-[#722F37]"
            >
              Terms & Conditions
            </span>
          </div>

          <p>
            Made with <span className="text-[#722F37]">♥</span> for book lovers.
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;