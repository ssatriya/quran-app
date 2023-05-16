import React from "react";

import { AyatType, Audio } from "@/lib/type";
import axios, { AxiosError } from "axios";
import Ayat from "@/components/Ayat";
import SuratAudio from "@/components/SuratAudio";

interface Props {
  params: {
    id: number;
  };
}

interface SuratType {
  surat: {
    verses: AyatType[];
  };
  audio: {
    audio_file: Audio;
  };
}

const getSuratById = async (id: number) => {
  try {
    // const res = await axios.get(
    //   `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=300`
    // );
    // return res.data as SuratType;

    const url1 = `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=300`;
    const url2 = `https://api.quran.com/api/v4/chapter_recitations/1/${id}?segments=true`;

    const res = await Promise.all([fetch(url1), fetch(url2)]);
    const surat = await res[0].json();
    const audio = await res[1].json();

    const result = {
      surat,
      audio,
    };
    return result as SuratType;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
  }
};

const SuratPage = async ({ params }: Props) => {
  const data = await getSuratById(params.id);
  const surat = data?.surat.verses;
  const audio = data?.audio.audio_file;
  return (
    <div>
      {audio && <SuratAudio audio={audio} />}
      {surat?.map((ayat) => (
        <Ayat key={ayat.id} ayat={ayat} />
      ))}
    </div>
  );
};

export default SuratPage;
