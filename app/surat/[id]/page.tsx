import React from "react";

import { AyatType } from "@/lib/type";
import axios, { AxiosError } from "axios";
import Ayat from "@/components/Ayat";

interface Props {
  params: {
    id: number;
  };
}

interface SuratType {
  verses: AyatType[];
}

const getSuratById = async (id: number) => {
  try {
    const res = await axios.get(
      `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=300`
    );
    return res.data as SuratType;
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
      {surat?.map((ayat) => (
        <Ayat ayat={ayat} />
      ))}
    </div>
  );
};

export default SuratPage;
