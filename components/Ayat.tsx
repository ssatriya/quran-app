"use client";

import React, { useEffect, useRef, useState } from "react";
import { Scheherazade_New } from "next/font/google";
import { useDispatch } from "react-redux";

import { Bookmark, PlayIcon, PauseIcon } from "lucide-react";

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic"],
  weight: "400",
});

import { Separator } from "./ui/separator";
import { AyatType } from "@/lib/type";
import { AppDispatch } from "@/store/store";
import { setBookmark } from "@/store/content-slice";

interface Props {
  ayat: AyatType;
}

const Ayat = ({ ayat }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [bookmarked, setbookmarked] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmark = localStorage.getItem("bookmarks");
    if (storedBookmark) {
      const parsedBookmark = JSON.parse(storedBookmark);
      setbookmarked(parsedBookmark);
    }
  }, []);

  const handleClick = () => {
    dispatch(setBookmark(ayat.verse_key));

    if (bookmarked.find((bookmark) => bookmark === ayat.verse_key)) {
      const updatedBookmark = bookmarked.filter(
        (bookmark) => bookmark !== ayat.verse_key
      );
      setbookmarked(updatedBookmark);
    } else {
      setbookmarked((prev) => [...prev, ayat.verse_key]);
    }
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = async () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="p-3 border border-slate-200 dark:border-accent rounded-md mb-2 hover:bg-accent hover:text-accent-foreground">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6">
          <h2 className="tracking-widest font-semibold">{ayat.verse_key}</h2>
          <Bookmark
            fill={bookmarked.includes(ayat.verse_key) ? "purple" : "none"}
            className="cursor-pointer dark:text-white"
            onClick={handleClick}
            color="purple"
          />
          {/* <PlayIcon onClick={playAudio} /> */}
          {/* <PauseIcon /> */}
          {/* <audio src={ayat.audio.url} ref={audioRef}></audio> */}
        </div>
        <div dir="rtl" className="flex flex-wrap my-8">
          {ayat.words.map((char, index) => {
            const charType = char.char_type_name;
            let styledNumber;
            if (charType === "end") {
              styledNumber = (
                <div
                  key={index}
                  className="w-10 h-10 border-2 border-black dark:border-white dark:border-opacity-75 bg-transparent p-2 relative flex justify-center items-center rounded-full mr-4"
                >
                  <p className="absolute text-2xl">{char.text}</p>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`text-4xl mb-8 mt-3 rtl:mr-3 ${scheherazadeNew.className}`}
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
              {capitalize}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Ayat;
