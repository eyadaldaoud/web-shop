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
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ProductsView({ products }: any) {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setAddedItems([...addedItems, item.id]);
    setTimeout(() => {
      setAddedItems(addedItems.filter((id) => id !== item.id));
    }, 500);
  };
  return (
    <div>
      <ProductFilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((Item: any, index: number) => (
          <Card
            key={index}
            className="relative max-w-md min-h-[470px] shadow-none"
          >
            \{" "}
            <CardHeader>
              <Lens defaultPosition={{ x: 260, y: 150 }}>
                <Image
                  src={Item.image}
                  alt="image placeholder"
                  width={500}
                  height={500}
                  className="h-60"
                />
              </Lens>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-1xl h-16">
                {Item.title.slice(0, 60)}
              </CardTitle>
              <CardDescription>
                <Button variant="secondary">{Item.price.toFixed(2)}$</Button>
              </CardDescription>
            </CardContent>
            <CardFooter className="w-full">
              <InteractiveHoverButton
                onClick={() => handleAddToCart(Item)}
                className="w-full text-center"
              >
                {addedItems.includes(Item.id) ? "Added" : "Add to cart"}
              </InteractiveHoverButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
