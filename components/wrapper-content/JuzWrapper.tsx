"use client";

import React from "react";

import { AyatType } from "@/lib/type";
import Ayat from "../Ayat";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SkeletonAyat from "../skeleton-loading/skeleton-ayat";

interface Props {
  juzId: string;
}

interface JuzType {
  verses: AyatType[];
}

const Juz = ({ juzId }: Props) => {
  const router = useRouter();

  const { isLoading, data } = useQuery({
    queryKey: ["juzById", juzId],
    queryFn: async ({ signal }) => {
      const response = await axios.get(
        `https://api.quran.com/api/v4/verses/by_juz/${juzId}?language=id&words=true&word_fields=text_uthmani&page=1&per_page=286`,
        {
          signal,
        }
      );
      return response.data as JuzType;
    },
  });

  const buttonHandler = () => {
    router.back();
  };

  return (
    <>
      <Button variant="outline" className="mb-4" onClick={buttonHandler}>
        Kembali
      </Button>
      {isLoading && <SkeletonAyat cards={8} />}
      {data?.verses?.map((ayat) => (
        <Ayat key={ayat.id} ayat={ayat} />
      ))}
    </>
  );
};

export default Juz;
