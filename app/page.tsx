import { EndingsList } from "@/components/features/EndingsList";
import { InfoBox } from "@/components/features/InfoBox";
import { SearchEndingsBar } from "@/components/features/SearchEndingsBar";
import { TypographyH1 } from "@/components/ui/typographyH1";
import { Tables } from "@/lib/database";
import supabase from "@/lib/supabase";
import { Ending } from "@/lib/types/Ending";

export default async function Page() {
  const getAudioUrl = (path: string) =>
    supabase.storage.from("audio").getPublicUrl(path).data.publicUrl;
  const { data: rawEndings, error } = await supabase.from("endings").select();

  if (error) {
    throw new Error(error.message);
  }

  const endings: Ending[] = rawEndings.map(
    (rawEnding: Tables<"endings">): Ending => {
      return { ...rawEnding, audioUrl: getAudioUrl(rawEnding.audio_path) };
    },
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <TypographyH1>Outropedia</TypographyH1>
        <InfoBox />
        {/* <TypographyP> */}
        {/*   For all those rock and roll bands with no idea how to finish what they */}
        {/*   start. Here's some inspiration, plus a way to put a name to a ending */}
        {/*   so you can stop saying "nah bro! it went duh-duh du-dum!", and start */}
        {/*   saying, it's rock and roll ending #5. */}
        {/* </TypographyP> */}
        {/* <TypographyP> */}
        {/*   Also, so you can avoid ending #101 "the f*** up": */}
        {/* </TypographyP> */}
        {/* <audio controls src={getAudioUrl("bad.mp3")} className="mt-8" /> */}
      </div>
      <div className="flex flex-row w-full md:justify-end">
        <SearchEndingsBar />
      </div>
      <EndingsList endings={endings} />
    </div>
  );
}
