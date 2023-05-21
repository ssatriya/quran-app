import React from "react";
import axios, { AxiosError } from "axios";

import { AyatType, AllJuz } from "@/lib/type";
import Juz from "@/components/Juz";

interface Props {
  params: {
    id: string;
  };
}

interface JuzType {
  verses: AyatType[];
}

interface Juz {
  juzs: AllJuz[];
}

export async function generateStaticParams() {
  const response = await axios.get("https://api.quran.com/api/v4/juzs");

  const juz = response.data as Juz;

  return juz.juzs.map((j) => ({
    id: j.juz_number.toString(),
  }));
}

const getJuzById = async (id: string) => {
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
  const { id } = params;

  const data = await getJuzById(id);
  const ayat = data!.verses;

  return <Juz ayat={ayat} />;
};

export default JuzPage;
