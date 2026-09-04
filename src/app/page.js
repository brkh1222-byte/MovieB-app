"use client";

import { MovieCards } from "@/components/Cards";
import { MovieCards2 } from "@/components/Cards2";
import { MovieCards3 } from "@/components/Cards3";
import { Footer } from "@/components/Footer";

import { MainDisplay } from "@/components/Main-display";
import { NavigationBar } from "@/components/Navigation-bar";

export default function Page() {
  return (
    <div className="flex flex-col">
      <NavigationBar />
      <MainDisplay />
      <MovieCards />
      <MovieCards2 />
      <MovieCards3 />
      <Footer />
    </div>
  );
}
