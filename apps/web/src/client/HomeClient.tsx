"use client";

import { Navbar } from "../components/Navbar";
import { HorizontalDivider } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center relative">
        {/* Hero Section */}
        <div className="w-full max-w-5xl flex flex-col items-center relative z-10">
          {/* Headline and subtitle */}
          <div className="mt-32 xs:mt-36 flex flex-col items-center gap-7">
            <h1 className="text-center font-slab leading-none text-4xl xs:text-5xl sm:text-6xl bg-[linear-gradient(135deg,#9E9E9E_0%,#FDFCFF_50%,#9E9E9E_100%)] text-transparent bg-clip-text py-2">
              The personal <br />
              context engine
            </h1>
            <HorizontalDivider />
            <h2 className="text-sm sm:text-base text-(--subtitle) text-center max-w-[256px] xs:max-w-sm sm:max-w-md">
              An AI agent that knows everything it needs to execute. Your data
              securely embedded into a vector archive.
            </h2>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 xs:mt-6 flex flex-col xs:flex-row gap-3 w-full xs:w-auto max-w-64">
            <Link
              href="/"
              className="flex items-center justify-center font-medium gap-2.5 bg-(--primary) text-(--light-background-text) px-4 py-2 rounded-xl w-full xs:w-auto"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center font-medium gap-2.5 bg-(--card-background) text-(--muted) px-4 py-2 rounded-xl w-full xs:w-auto"
            >
              Careers
            </Link>
          </div>

          {/* Trusted by marquee */}
          <div className="mt-10 flex flex-col w-full gap-8 items-center">
            <span className="font-mono text-sm text-(--muted)">
              Trusted by founders at
            </span>
            <div className="w-full px-8">
              <Marquee
                pauseOnHover
                gradient
                gradientColor="#181818"
                gradientWidth={150}
              >
                <Image
                  alt="Berkley logo"
                  src="/images/hero/trusted-by/berkley.svg"
                  width={831}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="MiT logo"
                  src="/images/hero/trusted-by/mit.svg"
                  width={468}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="Stanford logo"
                  src="/images/hero/trusted-by/stanford.svg"
                  width={783}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="UPenn logo"
                  src="/images/hero/trusted-by/upenn.svg"
                  width={803}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="Y Combinator logo"
                  src="/images/hero/trusted-by/y-combinator.svg"
                  width={1276}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="Berkley logo"
                  src="/images/hero/trusted-by/berkley.svg"
                  width={831}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="MiT logo"
                  src="/images/hero/trusted-by/mit.svg"
                  width={468}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="Stanford logo"
                  src="/images/hero/trusted-by/stanford.svg"
                  width={783}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="UPenn logo"
                  src="/images/hero/trusted-by/upenn.svg"
                  width={803}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
                <Image
                  alt="Y Combinator logo"
                  src="/images/hero/trusted-by/y-combinator.svg"
                  width={1276}
                  height={256}
                  className="h-6 sm:h-8 w-auto mr-12"
                />
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
