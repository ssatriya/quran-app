"use client";

import React from "react";
import BookmarkButton from "./BookmarkButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AudioButton from "./AudioButton";

interface Props {
  ayatVerseKey: string;
  audioUrl: string;
}

const AyatPropertyButton = ({ ayatVerseKey, audioUrl }: Props) => {
  const contentType = useSelector(
    (state: RootState) => state.content.currentContentType
  );

  return (
    <div className="flex flex-col gap-1 justify-center items-center mb-6">
      {contentType === "surat" ? (
        <>
          <AudioButton audioUrl={audioUrl} />
          <BookmarkButton ayatVerseKey={ayatVerseKey} />
        </>
      ) : (
        <BookmarkButton ayatVerseKey={ayatVerseKey} />
      )}
    </div>
  );
};

export default AyatPropertyButton;
