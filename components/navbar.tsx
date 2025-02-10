import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { client } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
const NAV_QUERY = `*[_type == "navitems"] | order(_createdAt asc)`;
export async function Navbar() {
  const NavItems = await client.fetch<SanityDocument[]>(NAV_QUERY, {});

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background">
      <Button variant="outline" className="hidden md:inline-flex">
        Login
      </Button>
      <div className="md:hidden">
        <ThemeToggle />
      </div>
      <ul className="flex space-x-4">
        {NavItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="text-foreground hover:text-primary"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="md:hidden">
          Login
        </Button>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
