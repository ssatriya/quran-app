"use client";

import React, { useEffect, useRef, useState } from "react";

import { PlayIcon, PauseIcon, Loader2 } from "lucide-react";

import { SuratAudio } from "@/lib/type";
import { Button } from "./ui/button";
import axios from "axios";

type Props = {
  suratId: number;
};

const SuratAudio = ({ suratId }: Props) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setAudioLoading(true);
    const fetchAudio = async (id: number) => {
      const response = await axios.get(
        `https://api.quran.com/api/v4/chapter_recitations/1/${id}?segments=true`
      );
      const data = response.data as SuratAudio;

      setAudioURL(data.audio_file.audio_url);
      setAudioLoading(false);
    };
    fetchAudio(suratId);
  }, [suratId]);

  const audioStatusHandler = () => {
    setAudioPlayed(false);
  };

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
      {audioLoading ? (
        <Button variant="outline">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memuat Audio
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={audioHandler}
          disabled={audioLoading}
        >
          {!audioPlayed ? (
            <PlayIcon className="cursor-pointer" />
          ) : (
            <PauseIcon className="cursor-pointer" />
          )}{" "}
          <span className="ml-2">{!audioPlayed ? "Putar" : "Jeda"} Audio</span>
        </Button>
      )}
      {audioURL !== "" ? (
        <audio
          src={`${audioURL}`}
          onEnded={audioStatusHandler}
          ref={audioRef}
        ></audio>
      ) : null}
    </div>
  );
};

export default SuratAudio;
