"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavItem } from "@/app/utils/Types";

export function MobileMenu({ NavItems }: { NavItems: any }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </Button>
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-background p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            {NavItems.map((item: NavItem, index: number) => (
              <Link
                key={index}
                href={item.link}
                className="text-foreground hover:text-primary"
              >
                {item.title}
              </Link>
            ))}

            <Button variant="outline" className="w-full">
              Login
            </Button>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
