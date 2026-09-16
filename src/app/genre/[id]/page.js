"use client";
import { NavigationBar } from "@/components/Navigation-bar";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreName, setGenreName] = useState("Genre");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const handlePrev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genreId)) {
        return prevSelected.filter((id) => id !== genreId);
      }

      return [...prevSelected, genreId];
    });
  };
  const handleViewSelectedGenres = () => {
    router.push(`/genre/${selectedGenres.join(",")}`);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setIsLoading(true);

        const genreIds = String(id ?? "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);

        if (genreIds.length === 0) {
          setGenreMovies([]);
          setGenreName("Genre");
          setIsLoading(false);
          return;
        }

        const [movieRes, genresRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds.join(",")}&page=${page}`,
            options,
          ),
          fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options,
          ),
        ]);

        const [movieData, genresData] = await Promise.all([
          movieRes.json(),
          genresRes.json(),
        ]);

        const matchedGenres = genresData.genres.filter((genre) =>
          genreIds.includes(String(genre.id)),
        );

        setGenreName(
          matchedGenres.length > 0
            ? matchedGenres.map((genre) => genre.name).join(", ")
            : "Genre",
        );
        setGenreMovies(movieData.results);
        setGenres(genresData.genres);
      } catch (error) {
        console.error(error);
        setGenreName("Genre");
        setGenreMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreMovies();
  }, [id, page]);

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="flex flex-col w-[2100px] h-206.5 mx-auto px-20 py-10 gap-10">
        <h1 className="text-3xl font-bold">
          {isLoading ? "Loading..." : genreName}
        </h1>
        <div className="flex gap-20 px-30">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 mb-10">
              <div className="grid grid-cols-4 gap-4">
                {genreMovies?.map((movie) => {
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
              {/* Pagination */}
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
              {/* Pagination */}
            </div>
          </div>
          <Separator orientation="vertical" className="mb-10" />

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-[20px]">Search by genre</h1>
              <p>See lists of movie by genre</p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-3 ">
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);

                return (
                  <Badge
                    key={genre.id}
                    variant={isSelected ? "default" : "outline"}
                    className="font-semibold text-[15px] hover:cursor-pointer"
                    onClick={() => handleGenreToggle(genre.id)}
                  >
                    {genre.name} <ChevronRight />
                  </Badge>
                );
              })}
            </div>

            {selectedGenres.length > 0 && (
              <button
                onClick={handleViewSelectedGenres}
                className="mt-3 rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
              >
                View selected genres
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
