import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { SanityDocument } from "next-sanity";
import { client } from "./sanity/client";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ChevronRight } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { AuroraText } from "@/components/magicui/aurora-text";
const HERO_QUERY = `*[_type == "home"]`;

const options = { next: { revalidate: 1 } };
export default async function Home() {
  const hero = await client.fetch<SanityDocument[]>(HERO_QUERY, {}, options);

  return (
    <div className="m-20 flex justify-center">
      {hero.map((item, index) => (
        <div key={index} className="">
          <h1 className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
            {item.hero.title}
          </h1>
          <div className=" z-10 flex min-h-20 items-center justify-center">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                {item.hero.description}
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>
        </div>
      ))}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}
