import React from "react";

import { AyatType, SuratInfo } from "@/lib/type";
import axios, { AxiosError } from "axios";
import Ayat from "@/components/Ayat";
import SuratAudio from "@/components/SuratAudio";
import { SuratsType } from "@/lib/type";
import SuratWrapper from "@/components/wrapper-content/SuratWrapper";

interface Props {
  params: {
    id: string;
  };
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

const SuratPage = async ({ params }: Props) => {
  const { id } = params;

  return <SuratWrapper suratId={id} />;
};

export default SuratPage;
