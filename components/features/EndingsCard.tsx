import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export default function EndingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ending #1</CardTitle>
        <CardDescription>"The Bill Haley"</CardDescription>
        <CardAction>
          <Button variant="link">open</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          The guitar lick is classic, but you can swap it with anything you
          like. The important thing is the stops.
        </p>
        <div className="flex flex-row gap-4 justify-end mt-8">
          <Button variant="outline">Download</Button>
          <Button>Play</Button>
        </div>
      </CardContent>
    </Card>
  );
}
