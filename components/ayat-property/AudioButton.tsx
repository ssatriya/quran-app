"use client";

import React, { useRef, useState } from "react";

import { Button } from "../ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";

interface Props {
  audioUrl: string;
  currentVerse?: number;
  verseNumber: number;
  audioPlayed?: boolean;
  audioHandler?: (verseNumber: number, audioUrl: string) => void;
}

const AudioButton = ({
  audioUrl,
  currentVerse,
  verseNumber,
  audioPlayed,
  audioHandler,
}: Props) => {
  const clickHandler = () => {
    audioHandler && audioHandler(verseNumber, audioUrl);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="mb-4"
      onClick={clickHandler}
      aria-label="play button"
    >
      {currentVerse === verseNumber && audioPlayed ? (
        <PauseIcon />
      ) : (
        <PlayIcon />
      )}
    </Button>
  );
};

export default AudioButton;
