import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background">
      <Button variant="outline" className="hidden md:inline-flex">
        Login
      </Button>
      <div className="md:hidden">
        <ThemeToggle />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="#" className="text-foreground hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link href="#" className="text-foreground hover:text-primary">
            About
          </Link>
        </li>
        <li>
          <Link href="#" className="text-foreground hover:text-primary">
            Contact
          </Link>
        </li>
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
