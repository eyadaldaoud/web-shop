"use client";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Lens } from "@/components/magicui/lens";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ProductFilterBar } from "./product-filter-bar";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState } from "react";
import { urlFor } from "../sanity/client";

export default function ProductsView({ products }: any) {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setAddedItems([...addedItems, item._id]);

    // setAddedItems(addedItems.filter((id) => id !== item._id));
  };
  return (
    <div>
      <ProductFilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((item: any, index: number) => (
          <Card
            key={index}
            className="relative max-w-md min-h-[200px] shadow-none"
          >
            <CardHeader>
              <Lens>
                <Image
                  src={urlFor(item.image)?.width(550).height(310).url() || ""}
                  alt="image placeholder"
                  width={800}
                  height={600}
                  className="w-full h-full"
                />
              </Lens>
            </CardHeader>
            <CardContent>
              <CardTitle className="md:text-1xl text-sm sm:overflow-hidden  overflow-y-scroll overflow-x-hidden h-16">
                {item?.title?.slice(0, 60)}
              </CardTitle>
              <CardDescription>
                <Button variant="secondary">{item.price.toFixed(2)}$</Button>
              </CardDescription>
            </CardContent>
            <CardFooter className="w-full">
              <InteractiveHoverButton
                onClick={() => handleAddToCart(item)}
                className="w-full text-center"
              >
                {addedItems.includes(item._id) ? "Added" : "Add to cart"}
              </InteractiveHoverButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
