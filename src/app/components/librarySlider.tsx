
"use client";

import { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  {
    src: "/images/grand_classic_library.png",
    title: "Discover a World of Knowledge",
    description: "Explore thousands of books in our grand library.",
  },
  {
    src: "/images/modern_book_shelves.png",
    title: "A Space for Every Reader",
    description: "Find your next favorite book with BookNook.",
  },
  {
    src: "/images/bright_university_library.png",
    title: "Learn Something New",
    description: "Knowledge opens the door to endless possibilities.",
  },
  {
    src: "/images/booknook_reading_corner.png",
    title: "Your Reading Journey Starts Here",
    description: "Read, learn and grow with BookNook.",
  },
];

const LibrarySliderContent = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full aspect-video max-h-[600px] rounded-2xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img
                src={image.src}
                alt={image.title}
                className="h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center px-8 text-white md:px-16">
                <h2 className="max-w-xl text-3xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl">
                  {image.title}
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white drop-shadow-md md:text-lg">
                  {image.description}
                </p>

                <Link
                  href="/all-books"
                  className="mt-7 inline-flex w-80 items-center bg-[#722F37] hover:bg-[#5C252D] text-white justify-center rounded-lg px-6 py-3 font-semibold transition"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const LibrarySlider = () => {
  return (
    <Suspense fallback={<div className="w-full aspect-video" />}>
      <LibrarySliderContent />
    </Suspense>
  );
};

export default LibrarySlider;

