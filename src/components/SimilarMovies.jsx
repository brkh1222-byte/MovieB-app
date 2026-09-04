"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const SimilarMovies = ({ id }) => {
  const router = useRouter();
  const [similarMovies, setSimilarMovies] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWRhNWNkYWM5NzVjODNiMjIyMWE0YzE4ZjJmMmU3NiIsIm5iZiI6MTc4ODMxNDY4Ny41MTAwMDAyLCJzdWIiOiI2YTk3ODQzZjVkYjIxMTc0NjZiZWFhNjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PZ5ywChp18M3fCrN935Dq_DG-xbrhfqe8-PtZzZVd-0",
    },
  };
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          options,
        );

        const similarData = await similarRes.json();

        setSimilarMovies(similarData.results.slice(0, 10));

        console.log(similarData, "similarData");
        console.log(similarMovies, "smovies");
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetail();
  }, []);
  return (
    <div className="w-full flex flex-col mt-10">
      <div className=" w-full h-12.5 mt-13 ">
        <div className="h-full  flex justify-between">
          <h1 className="font-bold text-4xl">More like this</h1>
          <div className="flex items-center gap-2.5">
            <p className="text-[20px]">See more</p>
            <ArrowRight />
          </div>
        </div>
      </div>
      <div className="w-full gap-8 grid grid-cols-5 mt-10">
        {similarMovies?.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-full flex flex-col text-black"
              //Important onClick function to go in here
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
                  <img src="/Star.png" />
                  <div className="flex">
                    <p>{movie.vote_average.toFixed(1)}</p>
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
  );
};

export default SimilarMovies;
