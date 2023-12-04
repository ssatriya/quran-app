"use client";

import { Scheherazade_New } from "next/font/google";

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic"],
  weight: "400",
});

import { Separator } from "./ui/separator";
import { AyatType } from "@/lib/type";
import { useRef } from "react";
import { Card } from "./ui/card";
import AudioButton from "./ayat-property/AudioButton";
import BookmarkButton from "./ayat-property/BookmarkButton";

interface Props {
  ayat: AyatType;
  audioHandler?: (verseNumber: number, audioUrl: string) => void;
  audioPlayed?: boolean;
  currentVerse?: number;
  contentType?: string;
}

const Ayat = ({
  ayat,
  audioHandler,
  audioPlayed,
  currentVerse,
  contentType,
}: Props) => {
  const ayatRef = useRef<HTMLDivElement>(null);

  if (currentVerse === ayat.verse_number) {
    ayatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <Card
      className="p-3 mb-2 dark:bg-background dark:text-gray-300"
      ref={ayatRef}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 items-center mr-6 mb-4">
          <h2 className="tracking-widest font-semibold">{ayat.verse_key}</h2>
          <div className="flex flex-col my-2">
            {contentType === "surat" && (
              <AudioButton
                audioUrl={ayat.audio?.url}
                verseNumber={ayat.verse_number}
                audioPlayed={audioPlayed}
                audioHandler={audioHandler}
                currentVerse={currentVerse}
              />
            )}
            <BookmarkButton verseKey={ayat.verse_key} />
          </div>
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
        {ayat.words.map((terjemahan, index) => {
          return (
            <p
              key={ayat.verse_number + index}
              className="text-gray-600 dark:text-white dark:text-opacity-75"
            >
              {terjemahan.translation.text}
            </p>
          );
        })}
      </div>
    </Card>
  );
};

export default Ayat;
