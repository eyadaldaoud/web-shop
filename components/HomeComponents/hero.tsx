import { client } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_QUERY = `*[_type == "hero"]`;
const options = { next: { revalidate: 3 } };

export default async function Hero() {
  const hero = await client.fetch<SanityDocument[]>(HERO_QUERY, {}, options);

  return (
    <div>
      {" "}
      {hero.map((item, index) => (
        <div key={index} className="">
          <h1 className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
            {item?.title}
          </h1>
          <div className=" z-10 flex min-h-20 items-center justify-center">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                {item?.description}
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>
        </div>
      ))}
    </div>
  );
}
