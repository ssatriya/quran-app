// "use client";

// import React, { useEffect, useRef, useState } from "react";
import { Scheherazade_New } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";

import { Bookmark, PlayIcon, PauseIcon } from "lucide-react";

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic"],
  weight: "400",
});

import { Separator } from "./ui/separator";
import { AyatType } from "@/lib/type";
import AyatPropertyButton from "./AyatProperty/AyatPropertyButton";

interface Props {
  ayat: AyatType;
}

const Ayat = ({ ayat }: Props) => {
  return (
    <div className="p-3 border border-slate-200 dark:border-accent rounded-md mb-2">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 items-center mr-6">
          <h2 className="tracking-widest font-semibold">{ayat.verse_key}</h2>
          <AyatPropertyButton
            ayatVerseKey={ayat.verse_key}
            audioUrl={ayat.audio?.url}
          />
        </div>
        <div dir="rtl" className="flex flex-wrap my-8">
          {ayat.words.map((char, index) => {
            const charType = char.char_type_name;
            let styledNumber;
            if (charType === "end") {
              styledNumber = (
                <div
                  key={index}
                  className="w-10 h-10 border-2 border-black dark:border-white dark:border-opacity-75 bg-transparent p-2 relative flex justify-center items-center rounded-full mr-1"
                >
                  <p className="absolute desktop:text-2xl tablet:text-2xl mobile:text-xl">
                    {char.text}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`desktop:text-4xl tablet:text-4xl mobile:text-3xl mb-8 mt-3 rtl:mr-3 `}
              >
                {charType === "word" && char.text} {styledNumber}
              </div>
            );
          })}
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex gap-1 flex-wrap mt-3">
        {ayat.words.slice(0, -1).map((char, index) => {
          const capitalize = char.translation.text.replace(
            char.translation.text[0],
            char.translation.text[0].toUpperCase()
          );

          return (
            <p
              key={index}
              className="text-gray-600 dark:text-white dark:text-opacity-75"
            >
              {/* {capitalize} */}
              {char.translation.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Ayat;
