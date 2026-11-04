import Link from "next/link";

import { Button } from "@/components/ui/button";
import LibrarySlider from "./components/librarySlider";
import LatestBooks from "./components/latestBooks";
import Reviews from "./components/review";
import TopCategories from "./components/topCategories";
import { Suspense } from "react";



export default function Home() {
  return (
  <div>
    <div className="mt-10 mb-20"><LibrarySlider></LibrarySlider></div>
   <Suspense fallback="loading........."> <LatestBooks></LatestBooks></Suspense>
    <div className="mt-20 mb-10">
      <Reviews></Reviews>
    </div>
     <TopCategories></TopCategories>
  </div>
  );
}
