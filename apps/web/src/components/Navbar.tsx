"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-16 pointer-events-none bg-(--background)/75 backdrop-blur-lg flex items-center justify-center px-4 z-50">
      <nav className="flex items-center justify-between h-full w-full max-w-5xl pointer-events-auto">
        <Link href="/" className="px-3">
          <Image
            src="/images/layout/logo.svg"
            width={103}
            height={22}
            alt="Celestify logo"
          />
        </Link>
        <div className="hidden md:flex text-(--muted) font-semibold text-sm">
          <Link href="/" className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)">
            Download
          </Link>
          <Link href="/pricing" className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)">
            Pricing
          </Link>
          <Link href="/careers" className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)">
            Careers
          </Link>
          <Link href="/contact" className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)">
            Contact
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          <div className="hidden xs:flex gap-2">
            <Link
              href="/"
              className="text-(--muted) font-semibold text-sm px-3 py-2 transition-all hover:bg-(--highlight-background) rounded-lg"
            >
              Login
            </Link>
            <Link
              href="/"
              className="bg-(--card-background) border border-(--card-border) rounded-xl px-3 py-2 font-semibold text-sm text-(--primary)"
            >
              Get Started
            </Link>
          </div>
          <button onClick={() => setOpen(!isOpen)} className="flex items-center justify-center p-1 mr-1 rounded-md md:hidden">
            <Hamburger toggled={isOpen} size={18} direction="right" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };
