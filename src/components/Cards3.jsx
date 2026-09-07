"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import LoadingComponent from "./LoadingComponent";
import { useRouter } from "next/navigation";

// const Categories = [
//   { title: "Upcoming", endpoint: "upcoming" },
//   { title: "Popular", endpoint: "popular" },
//   { title: "Top Rated", endpoint: "top_rated" },
// ];

export const MovieCards3 = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWRhNWNkYWM5NzVjODNiMjIyMWE0YzE4ZjJmMmU3NiIsIm5iZiI6MTc4ODMxNDY4Ny41MTAwMDAyLCJzdWIiOiI2YTk3ODQzZjVkYjIxMTc0NjZiZWFhNjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PZ5ywChp18M3fCrN935Dq_DG-xbrhfqe8-PtZzZVd-0",
    },
  };
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api-key`,
          options,
        );
        const data = await response.json();

        setMovies(data.results.slice(0, 10));
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
    <div>
      <div className=" px-30 w-full h-12.5 mt-13 ">
        <div className="h-full  flex justify-between">
          <h1 className="font-semibold text-4xl">Top Rated</h1>
          <div className="flex items-center gap-2.5 pr-5">
            <p className="text-[20px]">See more</p>
            <ArrowRight />
          </div>
        </div>
      </div>

      <div className="w-full px-30 mt-10 flex flex-col gap-13">
        <div className="w-full gap-8 grid grid-cols-5">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="w-full flex flex-col text-black"
                onClick={() => router.push(`/movie/${movie.id}`)}
              >
                <div className="overflow-hidden rounded-md">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col  bg-[#F4F4F5] rounded-b-2xl">
                  <div className="flex mt-3 pl-3">
                    <img src="Star.png" />
                    <div className="flex">
                      <p>{movie.vote_average?.toFixed(1)}</p>
                      <p>/10</p>
                    </div>
                  </div>
                  <p className="mb-6 text-[18px] pl-3">{movie.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
