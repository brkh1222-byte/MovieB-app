"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NavigationBar } from "@/components/Navigation-bar";

const SimilarMoviesPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const handlePrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?page=${page}`,
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
        console.error("Error fetching similar movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />

      <div className="container mx-auto py-12 flex flex-col gap-10">
        <h1 className="text-[30px] font-bold">More like this</h1>

        {loading && <div className="text-xl">Loading...</div>}

        {!loading && (
          <div className="grid grid-cols-5 gap-4">
            {movies?.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="w-full flex flex-col text-black cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <div className="overflow-hidden rounded-t-md bg-gray-200">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex flex-col bg-[#F4F4F5] rounded-b-2xl p-3">
                    <div className="flex items-center gap-1">
                      <img src="/Star.png" alt="star" className="w-4 h-4" />
                      <div className="flex text-sm">
                        <span className="font-semibold">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-gray-500">/10</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[18px] font-medium line-clamp-1">
                      {movie.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination controls */}
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

export default SimilarMoviesPage;
