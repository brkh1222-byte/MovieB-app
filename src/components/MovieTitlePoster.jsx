"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

const MovieTitleDetail = ({ trailerData }) => {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState({});
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options,
        );

        const detailData = await detailRes.json();

        setMovie(detailData);
        console.log(detailData, "detailData");
        console.log(movie, "movie");
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetail();
  }, []);
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}m`;
  };
  const formatVoteCount = (votes) => {
    const k = (votes / 1000).toFixed(1);
    return `${k}k`;
  };

  const trailer =
    trailerData?.results?.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) || trailerData?.results?.find((video) => video.site === "YouTube");

  const trailerUrl = trailer?.key
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`
    : null;

  const handleClick = () => {
    if (!trailerUrl) return;
    setIsTrailerOpen(true);
  };

  return (
    <div className="w-full">
      <div className="w-full h-25   flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-[50px] font-bold">{movie?.original_title}</h1>
          <div className="flex gap-2">
            <p className="text-[20px]">{movie.release_date}</p>
            <p className="text-[20px] font-bold">·</p>
            <p className="text-[20px]">{movie.adult ? "Adult" : "PG"}</p>
            <p className="text-[20px] font-bold">·</p>
            <p className="text-[20px]">{formatRuntime(movie.runtime)}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[20px]">Rating</p>
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <img src="/Star.png" className="w-9 h-9" />
                <div className="flex flex-col leading-8 pt-2">
                  <div className="flex items-center">
                    <p className=" text-[30px] font-bold">
                      {movie.vote_average?.toFixed(1)}
                    </p>
                    <p className="text-[25px]  text-slate-500">/10</p>
                  </div>
                  <p className="text-[20px] text-slate-500">
                    {formatVoteCount(movie.vote_count)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full h-[700px] mt-10 gap-10">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="Poster image"
        />
        <div className="relative h-full">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Backdrop image"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center gap-5 bottom-10 left-10 ">
            <div
              onClick={handleClick}
              className="rounded-full bg-white flex justify-center items-center h-11 w-11 hover:bg-slate-300 cursor-pointer"
            >
              <Play className="w-5" />
            </div>
            <p className="text-white text-[20px]">Play trailer</p>
          </div>
        </div>
      </div>

      {isTrailerOpen && trailerUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div
            className="relative w-[90vw] max-w-5xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-white"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={trailerUrl}
                title="Movie trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTitleDetail;
