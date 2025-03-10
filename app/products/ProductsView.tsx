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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState, useEffect } from "react";
import { urlFor, client } from "../sanity/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "../utils/Types";
import { RootState } from "../store";

const PRODUCTS_QUERY = `*[_type == "category"]{
  _id,
  name,
}`;

export default function ProductsView({ products }: any) {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories =
          await client.fetch<Category[]>(PRODUCTS_QUERY);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setAddedItems((prev) => [...prev, item._id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== item._id));
    }, 500);
  };

  return (
    <div>
      <ProductFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products
          .filter(
            (item: any) =>
              (!selectedCategory || item.category?._ref === selectedCategory) &&
              item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
          )
          .map((item: any, index: number) => (
            <Card
              key={index}
              className="relative max-w-md min-h-[200px] shadow-none"
            >
              <CardHeader
                className="h-64"
                onClick={() => router.push("/products/" + item._id)}
              >
                <div className="w-full h-full overflow-hidden rounded-t-lg">
                  <Lens>
                    <Image
                      src={
                        urlFor(item.images[0].asset)
                          ?.width(500)
                          .height(500)
                          .url() || ""
                      }
                      alt={item.name || "Product image"}
                      width={500}
                      height={500}
                      className="w-full h-full object-contain" // Change from object-cover to object-contain
                    />
                  </Lens>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="md:text-1xl text-sm sm:overflow-hidden overflow-y-scroll overflow-x-hidden h-16">
                  {item?.name?.slice(0, 60)}
                </CardTitle>
                <CardDescription>
                  <Button variant="secondary">{item.price.toFixed(2)}$</Button>
                </CardDescription>
              </CardContent>
              <CardFooter className="w-full">
                <InteractiveHoverButton
                  onClick={() => {
                    handleAddToCart(item);
                  }}
                  disabled={cartItems
                    .map((item) => item._id)
                    .includes(item._id)}
                  className="w-full text-center"
                >
                  {cartItems.map((item) => item._id).includes(item._id)
                    ? "In Cart"
                    : addedItems.includes(item._id)
                      ? "Added"
                      : "Add to cart"}
                </InteractiveHoverButton>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}

export function ProductFilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}: {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="w-full bg-muted py-2 px-4 mb-2 rounded">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[120px]">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((c) => (
                <DropdownMenuCheckboxItem
                  key={c._id}
                  checked={selectedCategory === c._id}
                  onCheckedChange={() =>
                    setSelectedCategory(selectedCategory === c._id ? "" : c._id)
                  }
                >
                  {c.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
