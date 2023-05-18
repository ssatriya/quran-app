import React from "react";

import { AyatType, SuratInfo } from "@/lib/type";
import axios, { AxiosError } from "axios";
import Ayat from "@/components/Ayat";
import SuratAudio from "@/components/SuratAudio";

interface Props {
  params: {
    id: number;
  };
}

interface SuratType {
  verses: AyatType[];
}
export async function generateMetadata({ params }: Props) {
  const response = await axios.get(
    `https://api.quran.com/api/v4/chapters/${params.id}?language=id`
  );
  const data = response.data as SuratInfo;

  return {
    title: `Baca Surat ${data.chapter.name_simple}`,
  };
}

const getSuratById = async (id: number) => {
  try {
    const response = await axios.get(
      `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=300`
    );
    return response.data as SuratType;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
  }
};

const SuratPage = async ({ params }: Props) => {
  const data = await getSuratById(params.id);
  const surat = data?.verses;
  return (
    <div>
      <SuratAudio suratId={params.id} />
      {surat?.map((ayat) => (
        <Ayat key={ayat.id} ayat={ayat} />
      ))}
    </div>
  );
};

export default SuratPage;
