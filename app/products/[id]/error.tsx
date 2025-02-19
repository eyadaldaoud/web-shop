"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { ShinyButton } from "@/components/magicui/shiny-button";

export default function Error({ error }: any) {
  return (
    <div className="flex">
      <div className="relative items-center content-center h-[600px] m-10  w-full overflow-hidden rounded-lg border bg-background">
        <h1 className="text-center">Something went wrong: {error.message}</h1>
        <PulsatingButton className="ml-auto mr-auto mt-10 z-50">
          Return Home
        </PulsatingButton>

        <FlickeringGrid
          className="absolute inset-0 z-0 size-full "
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={800}
        />
      </div>
    </div>
  );
}
