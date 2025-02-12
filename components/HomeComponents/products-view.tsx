export default async function ProductsView() {
  const data = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
  return (
    <div className="mt-20 relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Marquee pauseOnHover className="[--duration:40s]">
        {data?.map((item: any, index: number) => (
          <ReviewCard
            description=""
            key={index}
            title={item.title}
            img={item.image}
            price={item.price}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Marquee } from "../magicui/marquee";
import Image from "next/image";

const ReviewCard = ({
  img,
  title,
  price,
  description,
}: {
  img: string;
  title: string;
  description: string;
  price: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex justify-center items-center text-center h-40">
        <Image
          className="rounded w-full h-40"
          width={300}
          height={100}
          alt=""
          src={img}
        />
      </div>
      <div className="flex flex-col">
        <figcaption className="mt-4 text-md text-center font-medium dark:text-white h-10">
          {title.slice(0, 20)}
        </figcaption>
      </div>
      <div className="flex flex-col">
        <figcaption className=" border text-center m-2 text-md font-medium dark:text-white">
          {price}$
        </figcaption>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
    </figure>
  );
};
