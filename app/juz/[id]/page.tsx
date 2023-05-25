import React from "react";
import axios, { AxiosError } from "axios";

import { AyatType, AllJuz } from "@/lib/type";
import JuzWrapper from "@/components/wrapper-content/JuzWrapper";

interface Props {
  params: {
    id: string;
  };
}

const JuzPage = async ({ params }: Props) => {
  const { id } = params;

  return <JuzWrapper juzId={id} />;
};

export default JuzPage;
