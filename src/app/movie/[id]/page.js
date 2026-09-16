"use client";

import { Footer } from "@/components/Footer";
import MovieAbout from "@/components/MovieAbout";

import MovieTitleDetail from "@/components/MovieTitlePoster";
import { NavigationBar } from "@/components/Navigation-bar";
import SimilarMovies from "@/components/SimilarMovies";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const page = () => {
  const params = useParams();
  const movieId = params.id;
  const [detailData, setDetailData] = useState();
  const [creditData, setCreditData] = useState();
  const [similarData, setSimilarData] = useState();
  const [trailerData, setTrailerData] = useState();

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
        // const detailRes = await fetch(
        //   `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        //   options,
        // );
        // const creditRes = await fetch(
        //   `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        //   options,
        // );
        // const similarRes = await fetch(
        //   `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`,
        //   options,
        // );
        const [detailRes, creditRes, similarRes, trailerRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
              options,
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
              options,
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`,
              options,
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
              options,
            ),
          ]);

        const [detailData, creditData, similarData, trailerData] =
          await Promise.all([
            detailRes.json(),
            creditRes.json(),
            similarRes.json(),
            trailerRes.json(),
          ]);
        // const detailData = await detailRes.json();
        // const creditData = await creditRes.json();
        // const similarData = await similarRes.json();
        // const trailerData = await trailerRes.json();

        setDetailData(detailData);
        setCreditData(creditData);
        setSimilarData(similarData);
        setTrailerData(trailerData);
        console.log(detailData, "detailData");
        console.log(creditData, "creditData");
        console.log(similarData, "similarData");
        console.log(trailerData, "trailerData");
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetail();
  }, []);
  return (
    <div className="flex flex-col">
      <NavigationBar />
      <div className="px-60 flex flex-col">
        <MovieTitleDetail trailerData={trailerData} />
        <MovieAbout detailData={detailData} creditData={creditData} />
        <SimilarMovies id={movieId} />
      </div>
      <Footer />
    </div>
  );
};

export default page;
