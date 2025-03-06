import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { client } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
const NAV_QUERY = `*[_type == "navitems"] | order(_createdAt asc)`;

export async function Footer() {
  const NavItems = await client.fetch<SanityDocument[]>(NAV_QUERY, {});

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            <p className="text-sm text-muted-foreground">
              A Developer dedicated to creating amazing web experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NavItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-sm text-muted-foreground not-italic">
              123 Web Dev Lane
              <br />
              Codeville, IN 46789
              <br />
              Email: info@example.com
              <br />
              Phone: (555) 123-4567
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://eyad.vercel.app"
            target="_blank"
            className=" cursor-pointer hover:underline"
          >
            Eyad
          </Link>{" "}
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
