import React from "react";

import { AyatType } from "@/lib/type";
import Ayat from "./Ayat";

interface Props {
  ayat: AyatType[];
}

const Juz = ({ ayat }: Props) => {
  return (
    <div>
      {ayat?.map((ayat) => (
        <Ayat key={ayat.id} ayat={ayat} />
      ))}
    </div>
  );
};

export default Juz;
