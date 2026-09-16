"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// const genres = [
//   "Action",
//   "Adventure",
//   "Animation",
//   "Biography",
//   "Comedy",
//   "Crime",
//   "Documentary",
//   "Drama",
//   "Family",
//   "Fantasy",
//   "Film-Noir",
//   "Game-Show",
//   "History",
//   "Horror",
//   "Music",
//   "Musical",
//   "Mystery",
//   "News",
//   "Reality-TV",
//   "Romance",
//   "Sci-Fi",
//   "Short",
//   "Sport",
//   "Talk-Show",
//   "Thriller",
//   "War",
//   "Western",
// ];
export function GenreMenuFunction() {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY,
    },
  };
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
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="w-24.25">
            <ChevronDown />
            <p>Genre</p>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col text-black gap-1 pb-4">
              <Link href={`/genre`} className="font-semibold text-[25px]">
                Genres
              </Link>
              <p className="text-[17px]">See lists of movies by genre</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <Separator className="w-full" />
        <div className="flex flex-wrap gap-x-3 gap-y-3 mt-5">
          {genres.map((genre) => {
            return (
              <Badge
                key={genre.id}
                variant="outline"
                className="font-semibold text-[15px] hover:cursor-pointer"
                onClick={() => router.push(`/genre/${genre.id}`)}
              >
                {genre.name} <ChevronRight />
              </Badge>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
