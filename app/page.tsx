import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Hero from "@/components/HomeComponents/hero";
import ProductsView from "@/components/HomeComponents/products-view";

export default async function Home() {
  return (
    <div className="m-20  justify-center">
      <Hero />
      {/* <ProductsView /> */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}
