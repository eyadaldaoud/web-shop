"use client";

import * as React from "react";
import { Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProductFilterBar() {
  const [category, setCategory] = React.useState<string[]>([]);

  return (
    <div className="w-full bg-muted py-2 px-4 mb-2 rounded">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" />
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
              <DropdownMenuCheckboxItem
                checked={category.includes("electronics")}
                onCheckedChange={(checked) =>
                  setCategory(
                    checked
                      ? [...category, "electronics"]
                      : category.filter((c) => c !== "electronics")
                  )
                }
              >
                Electronics
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={category.includes("clothing")}
                onCheckedChange={(checked) =>
                  setCategory(
                    checked
                      ? [...category, "clothing"]
                      : category.filter((c) => c !== "clothing")
                  )
                }
              >
                Clothing
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={category.includes("books")}
                onCheckedChange={(checked) =>
                  setCategory(
                    checked
                      ? [...category, "books"]
                      : category.filter((c) => c !== "books")
                  )
                }
              >
                Books
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="default">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}
