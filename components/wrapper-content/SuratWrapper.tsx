"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import Ayat from "../Ayat";
import axios from "axios";
import { AyatType, TerjemahanSurat } from "@/lib/type";
import SkeletonLoading from "../SkeletonLoading";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoadingSpinner from "../LoadingSpinner";
import SkeletonAyat from "../skeleton-loading/skeleton-ayat";

interface Props {
  suratId: string;
}

interface SuratType {
  verses: AyatType[];
}

const SuratWrapper = ({ suratId }: Props) => {
  const router = useRouter();
  const contentType = useSelector(
    (state: RootState) => state.content.currentContentType
  );

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["suratById", suratId],
    queryFn: async ({ signal }) => {
      const response = await axios.get(
        `https://api.quran.com/api/v4/verses/by_chapter/${suratId}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=300`,
        {
          signal,
        }
      );
      return response.data as SuratType;
    },
  });

  // const { data: terjemahan } = useQuery({
  //   queryKey: ["terjemahanSurat", suratId],
  //   queryFn: async ({ signal }) => {
  //     const response = await axios.get(
  //       `https://quranapi.idn.sch.id/surah/${suratId}`,
  //       { signal }
  //     );
  //     return response.data as TerjemahanSurat;
  //   },
  // });

  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentVerse, setCurrentVerse] = useState<number>(1);

  const audioHandler = async (verseNumber: number, audioUrl: string) => {
    setAudioPlayed((prev) => !prev);

    setCurrentVerse(verseNumber);
    audioRef.current?.setAttribute(
      "src",
      `https://verses.quran.com/${data?.verses[verseNumber - 1].audio.url}`
    );
    audioRef.current?.load;

    if (!audioPlayed) {
      audioRef.current?.play();
    }

    if (audioPlayed) {
      audioRef.current?.pause();
    }
  };

  const audioStatusHandler = () => {
    setCurrentVerse((prev) => ++prev);
    setAudioPlayed((prev) => !prev);

    audioRef.current?.setAttribute(
      "src",
      `https://verses.quran.com/${data?.verses[currentVerse].audio.url}`
    );
    audioRef.current?.load;
    audioRef.current?.play();
    setAudioPlayed((prev) => !prev);
  };

  const buttonHandler = () => {
    router.back();
  };

  return (
    <>
      <Button variant="outline" className="mb-4" onClick={buttonHandler}>
        Kembali
      </Button>
      {isLoading && <SkeletonAyat cards={8} />}
      {data?.verses.map((ayat, index) => (
        <Ayat
          key={ayat.id}
          ayat={ayat}
          audioHandler={audioHandler}
          audioPlayed={audioPlayed}
          currentVerse={currentVerse}
          contentType={contentType}
        />
      ))}
      <audio ref={audioRef} onEnded={audioStatusHandler}></audio>
    </>
  );
};

export default SuratWrapper;
