"use client";

import React, { useRef, useState } from "react";

import { Button } from "../ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";

interface Props {
  audioUrl: string;
}

const AudioButton = ({ audioUrl }: Props) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioHandler = async () => {
    if (audioPlayed) {
      if (audioRef.current) {
        audioRef.current.pause();
        setAudioPlayed(false);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.play();
        setAudioPlayed(true);
      }
    }
  };

  const audioStatusHandler = () => {
    setAudioPlayed(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={audioHandler}
      >
        {!audioPlayed ? (
          <PlayIcon className="cursor-pointer" />
        ) : (
          <PauseIcon className="cursor-pointer" />
        )}
      </Button>
      <audio
        src={`https://verses.quran.com/${audioUrl}`}
        ref={audioRef}
        onEnded={audioStatusHandler}
      ></audio>
    </>
  );
};

export default AudioButton;
