"use client";
import { useEffect, useState } from "react";
import { Marquee } from "../magicui/marquee";
import Image from "next/image";
import { client, urlFor } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ReviewCard = ({
  img,
  title,
  price,
  description,
  itemid,
}: {
  img?: string;
  title: string;
  description: string;
  price: string;
  itemid: string;
}) => {
  const router = useRouter();
  return (
    <figure
      onClick={() => router.push("/products/" + itemid)}
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex justify-center items-center text-center h-40 p-2">
        {img && (
          <div className="relative w-full h-full">
            <Image
              className="object-contain"
              fill
              sizes="100%"
              alt={title}
              src={img}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <figcaption className="mt-4 text-md text-center font-medium dark:text-white h-10 overflow-hidden">
          {title.slice(0, 15)}
        </figcaption>
      </div>
      <div className="flex flex-col">
        <figcaption className="border text-center m-2 text-md font-medium dark:text-white">
          {price}$
        </figcaption>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
    </figure>
  );
};

export default function ProductsView() {
  const [Products, setProducts] = useState<any[]>([]);

  const FetchLatestProducts = async () => {
    const PRODUCTS_QUERY = `*[_type == "product"]`;
    const Products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {});
    setProducts(Products);
  };

  useEffect(() => {
    FetchLatestProducts();
  }, []);

  return (
    <div className="mt-20 relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Marquee pauseOnHover className="[--duration:40s]">
        {Products?.map((item: any, index: number) => {
          // Check if the image exists before trying to use urlFor
          const imageUrl =
            item?.images && item.images[0]?.asset
              ? urlFor(item.images[0].asset)?.width(300).height(300).url()
              : "";

          return (
            <ReviewCard
              description=""
              key={index}
              title={item?.name || ""}
              img={imageUrl}
              price={item?.price || "0"}
              itemid={item?._id || ""}
            />
          );
        })}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
