"use client";

import React, { useEffect, useRef, useState } from "react";

import { PlayIcon, PauseIcon } from "lucide-react";

import { SuratAudio } from "@/lib/type";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  suratId: string;
};

const SuratAudio = ({ suratId }: Props) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [audioLoading, setAudioLoading] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const fetchAudio = async (id: string) => {
      try {
        const response = await axios.get(
          `https://api.quran.com/api/v4/chapter_recitations/1/${id}?segments=true`,
          {
            signal: controller.signal,
          }
        );
        const data = response.data as SuratAudio;

        setAudioURL(data.audio_file.audio_url);
        setAudioLoading(false);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Axios request aborted.");
        } else {
          console.log(error);
        }
      }
    };
    fetchAudio(suratId);

    return () => {
      controller.abort();
    };
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

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="mb-4 flex justify-between">
      <Button variant="outline" onClick={handleClick}>
        Kembali
      </Button>
      <Button variant="outline" onClick={audioHandler} disabled={audioLoading}>
        {!audioPlayed ? (
          <PlayIcon className="cursor-pointer" />
        ) : (
          <PauseIcon className="cursor-pointer" />
        )}{" "}
        <span className="ml-2">{!audioPlayed ? "Putar" : "Jeda"} Audio</span>
      </Button>

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
