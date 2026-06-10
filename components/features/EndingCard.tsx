import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Ending } from "@/lib/types/Ending";
import { Slider } from "../ui/slider";
import { Loader2, Pause, Play } from "lucide-react";
import { formatTime } from "@/lib/utils";

type EndingCardProps = {
  ending: Ending;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  onTogglePlayback: () => void;
  onSeek: (value: number) => void;
};

export function EndingCard({
  ending,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  onTogglePlayback,
  onSeek,
}: EndingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ending #{ending.ending_number}</CardTitle>
        <CardDescription>"{ending.nickname}"</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{ending.description}</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-4">
        <Button size="icon" onClick={onTogglePlayback}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : isPlaying ? (
            <Pause />
          ) : (
            <Play />
          )}
        </Button>

        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={0.1}
          onValueChange={(values) =>
            onSeek(Array.isArray(values) ? values[0] : values)
          }
          className="w-full"
        />

        <span className="text-sm text-foreground tabular-nums min-w-10 text-right">
          {formatTime(duration)}
        </span>
      </CardFooter>
    </Card>
  );
}
