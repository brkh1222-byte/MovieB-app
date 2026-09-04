"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MovieTitleDetail = () => {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState({});
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
      <div className="flex justify-between w-full h-[700px] mt-10">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="Poster image"
        />
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop image"
        />
      </div>
    </div>
  );
};

export default MovieTitleDetail;
