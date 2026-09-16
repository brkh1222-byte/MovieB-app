"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavigationBar } from "@/components/Navigation-bar";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const handlePrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
            },
          },
        );
        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);
  console.log("movies", movies);

  return (
    <div className="flex flex-col">
      <NavigationBar />
      <div className="container mx-auto py-12 flex flex-col gap-10">
        <h1 className="text-[30px]">Top Rated shi</h1>

        {loading && <div> Loading ... </div>}
        {!loading && (
          <div className="grid grid-cols-5 gap-4">
            {movies?.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="w-full flex flex-col text-black"
                  //Important onClick function to go in here
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex flex-col  bg-[#F4F4F5] rounded-b-2xl">
                    <div className="flex mt-3 pl-3">
                      <img src="/Star.png" />
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
        )}

        <div className="flex w-full justify-center items-center gap-10 font-semibold select-none">
          <button
            disabled={page === 1}
            onClick={handlePrev}
            className="hover:underline"
          >
            Previous
          </button>
          <span>{page}</span>
          <button onClick={handleNext} className="hover:underline">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Page;
