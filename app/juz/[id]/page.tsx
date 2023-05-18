import React from "react";
import axios, { AxiosError } from "axios";

import { AyatType } from "@/lib/type";
import Juz from "@/components/Juz";

interface Props {
  params: {
    id: number;
  };
}

interface JuzType {
  verses: AyatType[];
}

const getJuzById = async (id: number) => {
  try {
    const res = await axios.get(
      `https://api.quran.com/api/v4/verses/by_juz/${id}?language=id&words=true&word_fields=text_uthmani&page=1&per_page=300`
    );
    return res.data as JuzType;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
  }
};

const JuzPage = async ({ params }: Props) => {
  const data = await getJuzById(params.id);
  const ayat = data!.verses;

  return <Juz ayat={ayat} />;
};

export default JuzPage;
