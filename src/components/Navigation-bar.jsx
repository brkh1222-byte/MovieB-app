import { GenreMenuFunction } from "./GenreMenu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./Mode-toggle";
import { Film } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NavigationBar = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleKeyDown = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      router.push(`/search?q=${text}`);
    }
  };
  return (
    <div className="h-20 flex items-center bg-[#f7f7f7]">
      <div className="w-screen flex items-center h-20  justify-between px-20 hover:cursor-pointer">
        <div
          onClick={() => router.push(`/`)}
          className="flex gap-1.5 text-[20px] items-center"
        >
          <Film />
          <div>Movie B</div>
        </div>
        <div className="flex gap-3">
          <GenreMenuFunction />
          <Input
            type="text"
            onKeyDown={handleKeyDown}
            value={text}
            onChange={handleChange}
          />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
