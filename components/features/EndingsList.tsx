"use client";

import { useEffect, useRef, useState } from "react";
import { EndingCard } from "./EndingCard";
import { Ending } from "@/lib/types/Ending";

type AudioState = "idle" | "loading" | "playing" | "paused";

type EndingsListProps = {
  endings: Ending[];
};

export function EndingsList({ endings }: EndingsListProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [currentEndingId, setCurrentEndingId] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlaying = () => setAudioState("playing");
    const handleWaiting = () => setAudioState("loading");
    const handlePause = () => setAudioState("paused");

    const handleEnded = () => {
      setAudioState("idle");
      setCurrentEndingId(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handleTogglePlayback = async (ending: Ending) => {
    const audio = audioRef.current;
    if (!audio) return;

    const isCurrentClip = currentEndingId === ending.ending_id;

    if (isCurrentClip) {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }

      return;
    }

    setAudioState("loading");

    audio.src = ending.audioUrl;

    setCurrentEndingId(ending.ending_id);

    try {
      await audio.play();
    } catch (err) {
      console.error(err);
      setAudioState("idle");
    }
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = value;
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      <ul className="flex flex-col gap-8">
        {endings.map((ending) => {
          return (
            <li key={ending.ending_id}>
              <EndingCard
                ending={ending}
                onTogglePlayback={() => handleTogglePlayback(ending)}
                onSeek={handleSeek}
                isPlaying={
                  currentEndingId === ending.ending_id &&
                  audioState === "playing"
                }
                isLoading={
                  currentEndingId === ending.ending_id &&
                  audioState === "loading"
                }
                currentTime={
                  currentEndingId === ending.ending_id ? currentTime : 0
                }
                duration={currentEndingId === ending.ending_id ? duration : 0}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
