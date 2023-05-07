import React from "react";
import Link from "next/link";

import { SuratsType } from "@/lib/type";

type Props = {
  surat?: SuratsType;
};

const Surat = ({ surat }: Props) => {
  const capitalize = surat?.revelation_place.replace(
    surat.revelation_place[0],
    surat.revelation_place[0].toUpperCase()
  );

  return (
    <Link href={`/surat/${surat?.id}`}>
      <div className="p-3 border border-slate-200 dark:border-accent rounded-md mb-2 hover:bg-accent hover:text-accent-foreground">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg">{surat?.name_simple}</h2>
          <p className="font-semibold text-xl">{surat?.name_arabic}</p>
        </div>
        <div className="flex justify-between items-center gap-1 text-sm text-slate-500 dark:text-white dark:text-opacity-75">
          <div>
            {surat?.translated_name.name} <span> • </span> {capitalize}
          </div>
          <div>{surat?.verses_count} Ayat</div>
        </div>
      </div>
    </Link>
  );
};

export default Surat;
