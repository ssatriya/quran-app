"use client";

import React, { useEffect, useRef, useState } from "react";
import { Scheherazade_New } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";

import { Bookmark, PlayIcon, PauseIcon } from "lucide-react";

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic"],
  weight: "400",
});

import { Separator } from "./ui/separator";
import { AyatType } from "@/lib/type";
import { AppDispatch, RootState } from "@/store/store";
import { setBookmark } from "@/store/content-slice";
import { Button } from "./ui/button";

interface Props {
  ayat: AyatType;
}

const Ayat = ({ ayat }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [bookmarked, setbookmarked] = useState<string[]>([]);
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);

  const contentType = useSelector(
    (state: RootState) => state.content.currentContentType
  );

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

  const audioHandler = async () => {
    if (audioPlayed) {
      if (audioRef.current) {
        audioRef.current.pause();
        setAudioPlayed(false);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.play();
        setAudioPlayed(true);
      }
    }
  };

  let audioButton;

  if (ayat.audio?.url) {
    audioButton = (
      <>
        <Button
          variant="outline"
          size="sm"
          className="mb-4"
          onClick={audioHandler}
        >
          {!audioPlayed ? (
            <PlayIcon className="cursor-pointer" />
          ) : (
            <PauseIcon className="cursor-pointer" />
          )}
        </Button>
        <audio
          src={`https://verses.quran.com/${ayat.audio.url}`}
          ref={audioRef}
        ></audio>
      </>
    );
  }

  return (
    <div className="p-3 border border-slate-200 dark:border-accent rounded-md mb-2">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 items-center mr-6">
          <h2 className="tracking-widest font-semibold">{ayat.verse_key}</h2>
          <Button variant="outline" size="sm" onClick={handleClick}>
            <Bookmark
              fill={bookmarked.includes(ayat.verse_key) ? "purple" : "none"}
              className="cursor-pointer dark:text-white"
              color="purple"
            />
          </Button>
          {audioButton}
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
                className={`desktop:text-4xl tablet:text-4xl mobile:text-3xl mb-8 mt-3 rtl:mr-3 ${scheherazadeNew.className}`}
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
