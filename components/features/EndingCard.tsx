import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Ending } from "@/lib/types/Ending";

type EndingCardProps = {
  ending: Ending;
  isPlaying: boolean;
  onPlay: () => void;
};

export function EndingCard({ ending, isPlaying, onPlay }: EndingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ending #{ending.ending_number}</CardTitle>
        <CardDescription>"{ending.nickname}"</CardDescription>
        <CardAction>
          <Button variant="link">open</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{ending.info}</p>
        <div className="flex flex-row gap-4 justify-end mt-8">
          <Button variant="outline">Download</Button>
          <Button onClick={onPlay}>{isPlaying ? "Stop" : "Play"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
