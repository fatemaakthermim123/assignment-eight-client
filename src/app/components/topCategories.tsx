
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Explore stories, novels and timeless classics.",
    icon: BookOpen,
    color: "bg-[#722F37]",
    href: "/all-books?category=Fiction",
  },
  {
    name: "Science",
    description: "Discover science, technology and the universe.",
    icon: FlaskConical,
    color: "bg-[#365B70]",
    href: "/all-books?category=Science",
  },
  {
    name: "History",
    description: "Travel through history and explore the past.",
    icon: Landmark,
    color: "bg-[#947044]",
    href: "/all-books?category=History",
  },
  {
    name: "Kids",
    description: "Fun stories and adventures for young readers.",
    icon: Baby,
    color: "bg-[#55765C]",
    href: "/all-books?category=Kids",
  },
];

const TopCategories = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Explore BookNook
        </p>

        <h2 className="font-heading text-3xl text-primary sm:text-4xl">
          Top Categories
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Explore your favorite genres and discover your next great read.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              href={category.href}
              className="group flex items-center gap-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${category.color} text-white transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="size-8" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </p>
              </div>

              <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TopCategories;
