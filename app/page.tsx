import { EndingsList } from "@/components/features/EndingsList";
import { SearchEndingsBar } from "@/components/features/SearchEndingsBar";
import { TypographyH1 } from "@/components/ui/typographyH1";
import { TypographyP } from "@/components/ui/typographyP";
import { Tables } from "@/lib/database";
import supabase from "@/lib/supabase";
import { Ending } from "@/lib/types/Ending";

export default async function Page() {
  // BUG: play buttons don't know when they've finished playing
  // BUG: re-clicking play simply re-starts the audio
  // BUG: audio didn't work on mobile
  // TODO: implement a proper audio tools maybe?
  // TODO: replace open with download and have tools in the card footer?
  // TODO: show a loading state for when the audio is fetching

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
      <div>
        <TypographyH1>Outropedia</TypographyH1>
        <TypographyP>
          For all those rock and roll bands with no idea how to finish what they
          start...
        </TypographyP>
      </div>
      <div className="flex flex-row w-full md:justify-end">
        <SearchEndingsBar />
      </div>
      <EndingsList endings={endings} />
    </div>
  );
}
