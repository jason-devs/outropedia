import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { TypographyP } from "../ui/typographyP";
import supabase from "@/lib/supabase";

export function InfoBox() {
  const getAudioUrl = (path: string) =>
    supabase.storage.from("audio").getPublicUrl(path).data.publicUrl;

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible className="rounded-md data-open:bg-muted">
          <CollapsibleTrigger
            render={
              <Button variant="ghost" className="w-full">
                Info
                <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
              </Button>
            }
          />
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
            <TypographyP>
              This is an app for all those rock and roll bands with no idea how
              to finish what they start. It's for inspiration, plus it's also a
              way to put a name to a ending so you can stop saying "nah bro! it
              went duh-duh du-dum!", and start saying, it's rock and roll ending
              #5.
            </TypographyP>
            <TypographyP>
              Also, so you can avoid ending #101 "the f*** up":
            </TypographyP>
            <audio
              controls
              src={getAudioUrl("bad.mp3")}
              className="mt-8 w-full"
            />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
