import React from "react";
import { Button } from "./ui/button";

interface Props {
  verseKey: string;
}

const BookmarkPill = ({ verseKey }: Props) => {
  return (
    <div className="flex gap-1 items-center justify-center bg-emerald-600 text-gray-200 w-fit rounded-full">
      <p className="text-base font-semibold px-3 pl-4 pr-0">
        Al-Fatihah {verseKey}
      </p>
      <Button variant="link" className="text-gray-200 rounded-r-full">
        &#10005;
      </Button>
    </div>
  );
};

export default BookmarkPill;
