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
        const creditRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options,
        );
        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`,
          options,
        );

        const detailData = await detailRes.json();
        const creditData = await creditRes.json();
        const similarData = await similarRes.json();

        setDetailData(detailData);
        setCreditData(creditData);
        setSimilarData(similarData);
        console.log(detailData, "detailData");
        console.log(creditData, "creditData");
        console.log(similarData, "similarData");
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
        <MovieTitleDetail />
        <MovieAbout detailData={detailData} creditData={creditData} />
        <SimilarMovies id={movieId} />
      </div>
      <Footer />
    </div>
  );
};

export default page;
