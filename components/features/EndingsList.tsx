"use client";

import { useRef, useState } from "react";
import { EndingCard } from "./EndingCard";
import { Ending } from "@/lib/types/Ending";

type EndingsListProps = {
  endings: Ending[];
};

export function EndingsList({ endings }: EndingsListProps) {
  const [currentEndingId, setCurrentEndingId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = (ending: Ending) => {
    if (!audioRef.current) return;

    audioRef.current.src = ending.audioUrl;
    audioRef.current.play();

    setCurrentEndingId(ending.ending_id);
    setIsPlaying(true);
  };

  return (
    <>
      <audio ref={audioRef} />
      <ul className="flex flex-col gap-8">
        {endings.map((ending) => {
          return (
            <li key={ending.ending_id}>
              <EndingCard
                ending={ending}
                onPlay={() => handlePlay(ending)}
                isPlaying={isPlaying && currentEndingId === ending.ending_id}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
