import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { client } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
import { MobileMenu } from "./mobile-menu";
import CartClient from "./cart-client";
import { Shirt } from "lucide-react";
const NAV_QUERY = `*[_type == "navitems"] | order(_createdAt asc)`;
export async function Navbar() {
  const NavItems = await client.fetch<SanityDocument[]>(NAV_QUERY, {});

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-foreground">
              <Shirt />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {NavItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-foreground hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <CartClient />
            <ThemeToggle />
          </div>

          <MobileMenu NavItems={NavItems} />
        </div>
      </div>
    </nav>
  );
}
