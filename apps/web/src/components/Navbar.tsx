"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "motion/react";
import { HorizontalDivider } from "@repo/ui";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const mobileMenuStates = {
    closed: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.25 },
    },
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="fixed top-0 left-0 w-full flex flex-col z-50 pointer-events-auto">
      {/* Desktop Navbar */}
      <div className="h-16 pointer-events-none bg-(--background)/75 backdrop-blur-lg flex items-center justify-center px-4">
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
            <Link
              href="/"
              className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)"
            >
              Download
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)"
            >
              Pricing
            </Link>
            <Link
              href="/careers"
              className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg transition-all hover:bg-(--highlight-background)"
            >
              Contact
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <div className="hidden md:flex gap-2">
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
            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!isOpen)}
              className="flex items-center justify-center rounded-md md:hidden"
            >
              <Hamburger
                toggled={isOpen}
                size={18}
                direction="right"
                duration={0.15}
                color="#f2e6cf"
              />
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile expanded menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden flex flex-col gap-6 px-7 py-4 overflow-hidden h-[calc(100vh-64px)] items-center bg-(--background)/75 text-base backdrop-blur-lg font-semibold"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuStates}
          >
            <div className="flex md:hidden flex-col w-full gap-4">
              <Link
                href="/"
                className="bg-(--card-background) text-(--muted) border border-(--card-border) flex justify-center py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/"
                className="bg-(--primary) text-(--light-background-text) flex justify-center py-2 rounded-lg"
              >
                Get Started
              </Link>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Link
                href="/download"
                className="w-full py-3 border-b border-(--light-border) text-(--muted) hover:text-(--foreground)"
              >
                Download
              </Link>
              <Link
                href="/pricing"
                className="w-full py-3 border-b border-(--light-border) text-(--muted) hover:text-(--foreground)"
              >
                Pricing
              </Link>
              <Link
                href="/careers"
                className="w-full py-3 border-b border-(--light-border) text-(--muted) hover:text-(--foreground)"
              >
                Careers
              </Link>
              <Link
                href="/pricing"
                className="w-full py-3 text-(--muted) hover:text-(--foreground)"
              >
                Pricing
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar };
