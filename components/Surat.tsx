import React from "react";
import Link from "next/link";
import { Scheherazade_New } from "next/font/google";

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic"],
  weight: "400",
});

import { SuratsType } from "@/lib/type";
import { Card } from "./ui/card";

type Props = {
  surat?: SuratsType;
};

const Surat = ({ surat }: Props) => {
  const capitalize = surat?.revelation_place.replace(
    surat.revelation_place[0],
    surat.revelation_place[0].toUpperCase()
  );

  return (
    <Link href={`/surat/${surat?.id}`} as={`/surat/${surat?.id}`}>
      <Card className="p-3 border dark:bg-background dark:text-gray-300 rounded-md mb-2 hover:bg-accent hover:text-accent-foreground">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg">{surat?.name_simple}</h2>
          <p className={`font-semibold text-2xl ${scheherazadeNew.className}`}>
            {surat?.name_arabic}
          </p>
        </div>
        <div className="flex justify-between items-center gap-1 text-sm text-slate-500 dark:text-white dark:text-opacity-75">
          <div>
            {surat?.translated_name.name}{" "}
            <span className="desktop:inline-block tablet:inline-block mobile:hidden">
              {" "}
              •{" "}
            </span>{" "}
            <span className="desktop:inline-block tablet:inline-block mobile:hidden">
              {capitalize}
            </span>
          </div>
          <div>{surat?.verses_count} Ayat</div>
        </div>
      </Card>
    </Link>
  );
};

export default Surat;
