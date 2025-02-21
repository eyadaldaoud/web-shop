"use client";

import { useState } from "react";
import { urlFor } from "@/app/sanity/client";
import { ShineBorder } from "@/components/magicui/shine-border";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/features/cartSlice";
import { ShinyButton } from "@/components/magicui/shiny-button";

export default function Product({ product }: any) {
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setAddedItems((prev) => [...prev, item._id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== item._id));
    }, 500);
  };

  return (
    <div className="m-4 md:m-20 flex justify-center flex-col lg:flex-row">
      <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-96 w-full lg:w-auto order-2 lg:order-1">
          {product.images.map((image: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden ${
                selectedImage === index ? "ring-2 ring-primary" : ""
              }`}
            >
              <Image
                src={urlFor(image.asset)?.width(100).height(100).url() || ""}
                layout="fill"
                objectFit="cover"
                alt={`${product.name} thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
        <div className="order-1 lg:order-2 w-full lg:w-auto">
          <ShineBorder
            className="relative w-full h-[300px] md:h-[400px] lg:w-96 lg:h-96 rounded-lg"
            children={
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={
                      urlFor(product.images[selectedImage].asset)
                        ?.width(1080)
                        .height(1080)
                        .url() || ""
                    }
                    layout="fill"
                    objectFit="none"
                    alt={product.name}
                    className="rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
            }
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          />
        </div>
      </div>
      <div className="flex justify-center lg:justify-start mt-8 lg:mt-0 lg:ml-8">
        <div className="max-w-md w-full text-center lg:text-start">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">
            Price: ${product.price.toFixed(2)}
          </p>
          <ShinyButton
            onClick={() => handleAddToCart(product)}
            className="w-full text-center lg:w-[300px]"
          >
            {addedItems.includes(product._id) ? "Added" : "Add to cart"}
          </ShinyButton>
        </div>
      </div>
    </div>
  );
}
