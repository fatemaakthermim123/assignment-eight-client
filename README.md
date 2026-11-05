# 📚 BookNook — A Small Online Library

BookNook is a cozy online library where readers can explore books, add their own
titles to the shelf, borrow a book for a few days, and return it when done.
Simple idea: **Add a book, borrow a book, return a book.**

🔗 **Live Site:** [BookNook](https://booknook-vert.vercel.app/)

## ✨ Features

- 🔐 **Full Authentication (BetterAuth + MongoDB + JWT)** — Register with
  email/password and live password validation (uppercase, lowercase, minimum
  6 characters), secure session login, private-route protection via the Next.js
  proxy, and JWT `Authorization: Bearer` tokens on every protected API call.
- 📚 **Complete Book CRUD with JWT-protected APIs** — Grid of all books, rich
  book details with available-copies status, add/edit/delete books with a
  custom confirmation modal, success and error toast notifications everywhere,
  and book cover images referenced through imgbb.
- 🛒 **Borrow & Return System** — Borrow a book through an elegant modal with
  the user's account details pre-filled, tracked in My Borrows with borrow and
  return dates; copies go down on borrow and back up on return, and the Borrow
  button disables with a **"Not Available"** state when copies reach 0.
- 🙋 **Personalized User Area** — My Books (books you added) and My Borrows
  (your current loans with one-click return), filtered per user account;
  avatar dropdown with profile and logout.
- 🏠 **Polished Public Experience** — Swiper.js hero slider with a
  **Browse Books** call-to-action, dynamically loaded Latest Books (newest 6
  from MongoDB), Reader Reviews and Top Categories sections, and a custom 404
  page.
- 🎨 **Responsive, Consistent UI** — Built with Next.js App Router, Tailwind
  CSS v4 and shadcn UI; equal-height card grids, unified heading typography,
  mobile drawer navigation, and full support for mobile, tablet and desktop.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn UI
- **Authentication:** BetterAuth with MongoDB Adapter + JWT
- **Database:** MongoDB (via a separate Express/MongoDB backend)

## 🚀 Getting Started



> ⚠️ `NEXT_PUBLIC_*` variables are inlined at build time — restart the dev
> server after changing them. API routes used by the app are documented in the
> server repository.

## 🙇 Author

Fatema Akther Mim
