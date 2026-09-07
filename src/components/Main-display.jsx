"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play } from "lucide-react";
import LoadingComponent from "./LoadingComponent";
import { useEffect, useState } from "react";

export const MainDisplay = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWRhNWNkYWM5NzVjODNiMjIyMWE0YzE4ZjJmMmU3NiIsIm5iZiI6MTc4ODMxNDY4Ny41MTAwMDAyLCJzdWIiOiI2YTk3ODQzZjVkYjIxMTc0NjZiZWFhNjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PZ5ywChp18M3fCrN935Dq_DG-xbrhfqe8-PtZzZVd-0",
    },
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api-key`,
          options,
        );
        const data = await response.json();

        setMovie(data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMovies();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <Carousel className="w-full mt-5">
      <CarouselContent>
        {movie.map((mov) => {
          return (
            <CarouselItem key={mov.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`}
                alt={mov.original_title}
                className="w-full h-full absolute object-cover z-0"
              />
              <div className="relative w-full h-237.5">
                <div className="w-101 absolute z-10 top-62.5 left-55 flex flex-col gap-7">
                  <div className="flex flex-col items-start">
                    <h3 className="text-[20px] text-white">Now Playing:</h3>
                    <h1 className="text-[60px] font-bold text-white">
                      {mov.original_title}
                    </h1>
                    <div className="flex w-20.75 h-12 items-center gap-2.5">
                      <img src="/Star.png" className="w-7 h-7" />
                      <div className="flex items-center">
                        <p className=" text-[30px] text-white">
                          {mov?.vote_average.toFixed(1)}
                        </p>
                        <p className="text-[24px] text-gray-700">/10</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-30 w-125">
                    <p className="text-white text-[20px] leading-6">
                      {mov.overview}
                    </p>
                  </div>
                  <div className="mt-5">
                    <button className="flex bg-white text-black rounded-md  h-15 w-[200px] justify-center items-center gap-2 hover:bg-gray-300">
                      <Play />
                      <p>Watch Trailer</p>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
