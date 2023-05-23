"use client";

import { AyatType } from "@/lib/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Ayat from "../Ayat";
import SuratAudio from "../SuratAudio";
import Loading from "@/app/loading";

interface Props {
  suratId: string;
}

interface SuratType {
  verses: AyatType[];
}

const SuratWrapper = ({ suratId }: Props) => {
  const [surat, setSurat] = useState<SuratType>();

  useEffect(() => {
    const controller = new AbortController();

    const fetchSurat = async (id: string) => {
      try {
        const response = await axios.get(
          `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=286`,
          {
            signal: controller.signal,
          }
        );
        const data = response.data as SuratType;
        setSurat(data);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Axios request aborted.");
        } else {
          console.log(error);
        }
      }
    };
    fetchSurat(suratId);

    return () => {
      controller.abort();
    };
  }, [suratId]);

  return (
    <>
      <SuratAudio suratId={suratId} />
      {surat ? (
        surat?.verses.map((ayat) => <Ayat key={ayat.id} ayat={ayat} />)
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SuratWrapper;
