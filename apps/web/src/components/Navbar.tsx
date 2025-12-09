import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-22 bg-transparent pointer-events-none flex items-center justify-center px-8">
      <nav className="px-2.5 flex items-center justify-between h-14 w-full max-w-5xl bg-(--background) border border-(--border) rounded-2xl">
        <Link href="/" className="px-3">
          <Image
            src="/images/layout/logo.svg"
            width={103}
            height={22}
            alt="Celestify logo"
          />
        </Link>
        <div className="hidden md:flex text-(--muted) font-semibold text-sm">
          <Link href="/download" className="px-3 py-2 rounded-lg">
            Download
          </Link>
          <Link href="/pricing" className="px-3 py-2 rounded-lg">
            Pricing
          </Link>
          <Link href="/blog" className="px-3 py-2 rounded-lg">
            Blog
          </Link>
          <Link href="/contact" className="px-3 py-2 rounded-lg">
            Contact
          </Link>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/login" className="text-(--muted) font-semibold text-sm">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-(--primary) border border-(--primary-border) rounded-lg px-2.5 py-1.5 font-semibold text-sm"
          >
            Get Started
          </Link>
        </div>
        <div className="flex items-center justify-center p-1 mr-1 rounded-md md:hidden">
          <Menu />
        </div>
      </nav>
    </div>
  );
};

export { Navbar };
