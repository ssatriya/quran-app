import React from "react";

import JuzWrapper from "@/components/wrapper-content/JuzWrapper";
import axios from "axios";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `Baca Juz ${params.id}`,
  };
}

const JuzPage = async ({ params }: Props) => {
  const { id } = params;

  return <JuzWrapper juzId={id} />;
};

export default JuzPage;
