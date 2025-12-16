"use client";

import { Navbar } from "../components/Navbar";
import { HorizontalDivider } from "@repo/ui";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<string | null>("what-is-celestify");

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center relative">
        µ{/* Hero Section */}
        <div className="w-full max-w-5xl flex flex-col items-center relative z-10">
          <div className="mt-20 xs:mt-24 sm:mt-36 flex flex-col items-center gap-7">
            <h1 className="text-center font-slab text-4xl xs:text-5xl sm:text-6xl bg-[linear-gradient(135deg,#9E9E9E_0%,#FDFCFF_50%,#9E9E9E_100%)] text-transparent bg-clip-text py-2">
              The personal <br />
              context engine
            </h1>
            <HorizontalDivider />
            <h2 className="text-xs xs:text-sm sm:text-base text-(--subtitle) text-center max-w-[256px] xs:max-w-sm sm:max-w-md">
              An AI agent that knows everything it needs to execute. Your data
              securely embedded into a vector archive.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
