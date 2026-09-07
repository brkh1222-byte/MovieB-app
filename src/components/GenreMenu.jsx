"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];
export function GenreMenuFunction() {
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
              <h1 className="font-semibold text-[25px]">Genres</h1>
              <p className="text-[17px]">See lists of movies by genre</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <Separator className="w-full" />
        <div className="flex flex-wrap gap-x-3 gap-y-3 mt-5">
          {genres.map((genre) => {
            return (
              <Badge
                variant="outline"
                className="font-semibold text-[15px] hover:cursor-pointer"
              >
                {genre} <ChevronRight />
              </Badge>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
