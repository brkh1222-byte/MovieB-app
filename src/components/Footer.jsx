"use client";

import { Film, Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
export const Footer = () => {
  const router = useRouter();
  return (
    <div className="bg-[#302886] h-[350px] w-full mt-[51px] px-30 py-15">
      <div className="w-full  h-full flex justify-between gap-50 text-white text-[18px]">
        <div className="h-full w-[550px]  flex flex-col gap-5 justify-items-start items-start">
          <div
            onClick={() => router.push(`/`)}
            className="flex gap-1.5 text-[20px] items-center hover:cursor-pointer"
          >
            <Film />
            <div>Movie B</div>
          </div>
          <p className=" leading-10">
            © 2026 Movie B. All Rights Not Reserved.
          </p>
        </div>
        <div className="h-full w-full pl-[800px] gap-[96px] flex justify-between text-white text-[18px]">
          <div className="flex flex-col gap-[20px]">
            <p>Contact Information</p>
            <div className="flex items-center gap-[14px]">
              <Mail />
              <div className="flex flex-col">
                <p>Email:</p>
                <p>brkh1222@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-[14px]">
              <Phone />
              <div className="flex flex-col">
                <p>Phone:</p>
                <p>(+976)-9921****</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-white gap-[20px]">
            <p>Follow us</p>
            <div className="flex gap-[20px] font-semibold">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>X</p>
              <p>YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//  <div className="border border-red-500 h-auto w-[247px]"></div>
//         <div className="border border-red-500 h-full w-[913px]"></div>
