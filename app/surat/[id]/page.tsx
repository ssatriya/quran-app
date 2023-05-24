import React from "react";

import { SuratInfo } from "@/lib/type";
import axios from "axios";
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
