import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { cn } from "@/lib/utils";
import { Loader, Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[500px] m-20 flex justify-center items-center">
      <div className="">
        <TypingAnimation className=" text-center justify-center items-center content-center text-[40px]">
          Fetching Products
        </TypingAnimation>
        <div className="text-center flex justify-center items-center">
          <Loader2Icon className="animate-spin duration-400 ease-linear mt-2 " />
        </div>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={1}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0  skew-y-12"
        )}
      />
    </div>
  );
}
