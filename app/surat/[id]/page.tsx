import React from "react";

import { AyatType, SuratInfo } from "@/lib/type";
import axios, { AxiosError } from "axios";
import Ayat from "@/components/Ayat";
import SuratAudio from "@/components/SuratAudio";
import { SuratsType } from "@/lib/type";

interface Props {
  params: {
    id: string;
  };
}

interface SuratType {
  verses: AyatType[];
}

interface Surat {
  chapters: SuratsType[];
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await axios.get(
    "https://api.quran.com/api/v4/chapters?language=en"
  );
  const surat = response.data as Surat;

  return surat.chapters.map((s) => ({
    id: s.id.toString(),
  }));
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

const getSuratById = async (id: string) => {
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
  const { id } = params;

  const data = await getSuratById(id);
  const surat = data?.verses;
  return (
    <div>
      <SuratAudio suratId={id} />
      {surat?.map((ayat) => (
        <Ayat key={ayat.id} ayat={ayat} />
      ))}
    </div>
  );
};

export default SuratPage;
