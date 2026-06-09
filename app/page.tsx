import EndingsCard from "@/components/features/EndingsCard";
import { SearchEndingsBar } from "@/components/features/SearchEndingsBar";
import { TypographyH1 } from "@/components/ui/typographyH1";
import { TypographyP } from "@/components/ui/typographyP";

export default function Home() {
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
      <ul className="flex flex-col gap-8">
        <li>
          <EndingsCard />
        </li>
        <li>
          <EndingsCard />
        </li>
        <li>
          <EndingsCard />
        </li>
      </ul>
    </div>
  );
}
