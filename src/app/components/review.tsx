
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { StarIcon, QuoteIcon } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Emily Carter",
    role: "Book Lover",
    rating: 5,
    review:
      "BookNook has made discovering new books so easy. I love the collection and the overall experience!",
  },
  {
    name: "Daniel Smith",
    role: "University Student",
    rating: 5,
    review:
      "A wonderful platform for readers. The book collection is impressive and finding my favorite books is simple.",
  },
  {
    name: "Sophia Williams",
    role: "Regular Reader",
    rating: 4,
    review:
      "I really enjoy using BookNook. The interface is clean, beautiful, and very easy to navigate.",
  },
  {
    name: "James Anderson",
    role: "Book Enthusiast",
    rating: 5,
    review:
      "Finally, a platform where I can explore different categories of books in one place. Highly recommended!",
  },
  {
    name: "Olivia Brown",
    role: "Teacher",
    rating: 5,
    review:
      "BookNook is a great resource for finding interesting books. It has become one of my favorite platforms.",
  },
  {
    name: "William Davis",
    role: "Student",
    rating: 4,
    review:
      "The website is simple to use and the book details are helpful. I would love to see more books added.",
  },
  {
    name: "Ava Wilson",
    role: "Book Lover",
    rating: 5,
    review:
      "I love how easy it is to explore books here. The experience feels smooth and enjoyable.",
  },
  {
    name: "Benjamin Miller",
    role: "Reader",
    rating: 5,
    review:
      "A beautiful place for book lovers. I found some amazing books that I had been looking for.",
  },
  {
    name: "Isabella Taylor",
    role: "Literature Student",
    rating: 4,
    review:
      "The variety of books is great. I especially like how everything is organized into categories.",
  },
  {
    name: "Lucas Martin",
    role: "Regular Reader",
    rating: 5,
    review:
      "BookNook makes reading discovery more enjoyable. Looking forward to exploring more books!",
  },
  {
    name: "Mia Thompson",
    role: "Teacher",
    rating: 5,
    review:
      "A helpful platform with a lovely design. I would definitely recommend it to other readers.",
  },
  {
    name: "Henry White",
    role: "Book Enthusiast",
    rating: 5,
    review:
      "Great collection, beautiful design, and a smooth browsing experience. Keep up the good work!",
  },
];

const reviewPages = [
  reviews.slice(0, 4),
  reviews.slice(4, 8),
  reviews.slice(8, 12),
];

const Reviews = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      {/* Heading */}
      <div className="mb-12 text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
          <QuoteIcon className="size-4" />
          Reader Experiences
        </span>

        <h2 className="font-heading text-3xl text-primary sm:text-4xl">
          What Our Readers Say
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Discover what our readers think about their BookNook experience.
        </p>
      </div>

      {/* Review Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={24}
        className="reviews-swiper !pb-14"
      >
        {reviewPages.map((page, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {page.map((item) => (
                <div
                  key={item.name}
                  className="flex min-h-64 flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <QuoteIcon className="mb-4 size-8 text-[#722F37]/30" />

                  <p className="flex-1 text-sm leading-7 text-muted-foreground">
                    “{item.review}”
                  </p>

                  {/* Rating */}
                  <div className="my-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`size-4 ${
                          i < item.rating
                            ? "fill-[#D4A853] text-[#D4A853]"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Reviewer Info */}
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold text-foreground">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
