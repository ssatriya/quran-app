"use client";

import React, { useRef, useState } from "react";

import { PlayIcon, PauseIcon } from "lucide-react";

import { Audio } from "@/lib/type";
import { Button } from "./ui/button";

type Props = {
  audio: Audio;
};

const SuratAudio = ({ audio }: Props) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioStatusHandler = () => {
    setAudioPlayed(false);
  };

  const audioURL = audio.audio_url;

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

  return (
    <div className="mb-4 flex justify-end">
      <Button variant="outline" onClick={audioHandler}>
        {!audioPlayed ? (
          <PlayIcon className="cursor-pointer" />
        ) : (
          <PauseIcon className="cursor-pointer" />
        )}{" "}
        <span className="ml-2">Putar Audio</span>
      </Button>
      <audio
        src={`${audioURL}`}
        onEnded={audioStatusHandler}
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default SuratAudio;
