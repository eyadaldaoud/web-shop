import { client } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ChevronRight, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuroraText } from "../magicui/aurora-text";

const HERO_QUERY = `*[_type == "hero"]`;
const options = { next: { revalidate: 3 } };

export default async function Hero() {
  const hero = await client.fetch<SanityDocument[]>(HERO_QUERY, {}, options);

  return (
    <div>
      {" "}
      {hero.map((item, index) => (
        <div key={index} className="">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center">
            {item?.title.slice(0, 4)}
            <AuroraText>{item?.title?.slice(4, 15)}</AuroraText>
          </h1>
          <p className={cn(`text-center mt-4`)}>{item?.description}</p>
          <div className=" z-10 flex min-h-20 items-center justify-center">
            <Link target="_blank" href={item?.link}>
              <AnimatedGradientText>
                <Link2 /> <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  {item?.linktitle}
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
