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
  const badAudioUrl = supabase.storage.from("audio").getPublicUrl("bad.mp3")
    .data.publicUrl;

  const { data: rawEndings, error } = await supabase.from("endings").select();

  if (error) {
    throw new Error(error.message);
  }

  const endings: Ending[] = rawEndings.map(
    (rawEnding: Tables<"endings">): Ending => {
      return { ...rawEnding, audioUrl: getAudioUrl(rawEnding.audio_path) };
    },
  );

  // HACK: i'm prop drilling the badAudioUrl -->

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <TypographyH1>Outropedia</TypographyH1>
        <InfoBox badAudioUrl={badAudioUrl} />
      </div>
      <div className="flex flex-row w-full md:justify-end">
        <SearchEndingsBar />
      </div>
      <EndingsList endings={endings} />
    </div>
  );
}
