"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Loader2, Pause, Play } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type AudioState = "idle" | "loading" | "playing" | "paused";

type BadEndingCardProps = {
  badAudioUrl: string;
};

export function BadEndingCard({ badAudioUrl }: BadEndingCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlaying = () => setAudioState("playing");
    const handleWaiting = () => setAudioState("loading");
    const handlePause = () => setAudioState("paused");

    const handleEnded = () => {
      setAudioState("idle");
      setCurrentTime(0);
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

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (err) {
        console.error(err);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ending #67</CardTitle>
        <CardDescription>"The F••• Up"</CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          An utter classic. Usually preceded by phrases like "it'll be alright
          on the night", or "I've played this one before, same ending right?".
          Better pray the crowd are drunk enough for this. I read somewhere that
          alcohol makes your hearing worse. Better hope it works!
        </p>
      </CardContent>

      <CardFooter className="flex gap-4">
        <audio ref={audioRef} src={badAudioUrl} preload="metadata" />

        <Button variant="ghost" size="icon" onClick={togglePlayback}>
          {audioState === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : audioState === "playing" ? (
            <Pause />
          ) : (
            <Play />
          )}
        </Button>

        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={0.1}
          onValueChange={(values) => {
            const value = Array.isArray(values) ? values[0] : values;

            if (audioRef.current) {
              audioRef.current.currentTime = value;
            }
          }}
          className="w-full"
        />

        <span className="min-w-10 text-right text-sm tabular-nums">
          {formatTime(duration)}
        </span>
      </CardFooter>
    </Card>
  );
}
