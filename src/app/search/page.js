"use client";

import { NavigationBar } from "@/components/Navigation-bar";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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
    if (selectedGenres.length === 0) return;
    router.push(`/genre/${selectedGenres.map(String).join(",")}`);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        const searchRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
          options,
        );

        const searchData = await searchRes.json();

        setMovies(searchData.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSearchedMovies();
  }, [query, page]);
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const genresRes = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options,
        );
        const genresData = await genresRes.json();

        setGenres(genresData.genres);
        console.log(genresData, "genresData");
        console.log(genres, "genres");
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenre();
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-10">
        <NavigationBar />

        <div className="flex flex-col w-[2100px] h-206.5 mx-auto px-20 py-10 gap-10">
          <h1 className="text-[30px] font-bold px-30">
            Results for: "{query}"
          </h1>
          <div className="flex gap-20 px-30">
            <div className="flex flex-col gap-10">
              {query ? (
                <div className="flex flex-col gap-10 mb-10">
                  <div className="grid grid-cols-4 gap-4">
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
                              <img
                                src="/Star.png"
                                alt="star"
                                className="w-4 h-4"
                              />
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
              ) : (
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Search
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Type a movie name in the search input above to get started.
                  </p>
                </div>
              )}
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
    </div>
  );
};

export default Page;
