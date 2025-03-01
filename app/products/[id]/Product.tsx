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
    <div className="container mx-auto px-4 py-8">
      {/* For mobile, center items; on desktop, align items to the start */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Image & Thumbnails Section */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 lg:items-start">
          {/* Thumbnails Container */}
          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto overflow-x-auto lg:overflow-y-auto flex-nowrap no-scrollbar">
            {product.images.map((image: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden ${
                  selectedImage === index ? "border-2 border-blue-800" : ""
                }`}
              >
                <Image
                  src={urlFor(image.asset)?.width(100).height(100).url() || ""}
                  fill
                  className="object-cover"
                  alt={`${product.name} thumbnail ${index + 1}`}
                />
              </button>
            ))}
          </div>
          {/* Main Image Container */}
          <div className="flex-grow">
            <ShineBorder
              className="relative w-full aspect-square lg:max-w-lg rounded-lg"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={
                      urlFor(product.images[selectedImage].asset)
                        ?.width(1080)
                        .height(1080)
                        .url() || ""
                    }
                    fill
                    className="rounded-lg"
                    alt={product.name}
                  />
                </motion.div>
              </AnimatePresence>
            </ShineBorder>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between flex-1 min-h-[400px]">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {product.name}
            </h1>
            <div className="max-h-96 overflow-y-auto text-base md:text-lg mb-2">
              {product.description}
            </div>
          </div>
          <div>
            <p className="text-lg md:text-xl font-semibold mb-6">
              Price: ${product.price.toFixed(2)}
            </p>
            <ShinyButton
              onClick={() => handleAddToCart(product)}
              className="w-full max-w-xs mx-auto lg:mx-0"
            >
              {addedItems.includes(product._id) ? "Added" : "Add to cart"}
            </ShinyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
