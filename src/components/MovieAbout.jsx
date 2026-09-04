"use client";

import { Separator } from "@/components/ui/separator";

const MovieAbout = ({ detailData, creditData }) => {
  const director = creditData?.crew
    ?.filter((person) => person.known_for_department === "Directing")
    .slice(0, 1);
  const writers = creditData?.crew
    ?.filter((person) => person.known_for_department === "Writing")
    .slice(0, 3);
  const Stars = creditData?.cast
    ?.filter((actor) => actor.known_for_department === "Acting")
    .slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-8 mt-15">
      <div className="flex gap-3">
        {detailData?.genres.map((genre) => {
          return (
            <div
              className="rounded-2xl h-5 w-fit border p-3
              border-slate-300 flex justify-center items-center font-semibold text-[14px]"
              key={genre.id}
            >
              {genre.name}
            </div>
          );
        })}
      </div>
      <div className="text-[20px]">{detailData?.overview}</div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="flex items-center gap-20">
            <p className="text-[20px] font-bold w-16">Director</p>
            {director?.map((director) => {
              return <p key={director.id}>{director.name}</p>;
            })}
          </div>
          <Separator />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-20">
            <p className="text-[20px] font-bold w-16">Writers</p>
            {writers?.map((writer) => {
              return <p key={writer.id}> {writer.name}</p>;
            })}
          </div>
          <Separator />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-20">
            <p className="text-[20px] font-bold w-16">Stars</p>
            {Stars?.map((star) => {
              return <p key={star.id}>{star.name}</p>;
            })}
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default MovieAbout;
