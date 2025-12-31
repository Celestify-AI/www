"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Navbar } from "../components/Navbar";
import { LightRays } from "@repo/ui";
import { HorizontalDivider } from "@repo/ui";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const supabase = createClient(
  process.env.NEXT_PUBLIC_WAITLIST_URL!,
  process.env.NEXT_PUBLIC_WAITLIST_KEY!,
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const { error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      setStatus("Error");
      console.error("Supabase error:", JSON.stringify(error, null, 2));
    } else {
      setStatus("Reserved");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center relative">
        {/* Light Rays */}
        <div className="hidden md:flex absolute top-0 left-0 w-full h-screen z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#f2e6cf"
            rayLength={2}
            noiseAmount={0.2}
            mouseInfluence={0}
            lightSpread={1}
          />
        </div>
        {/* Hero Section */}
        <div className="w-full max-w-5xl px-4 flex flex-col items-center relative z-10">
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

          {/* Waitlist Form */}
          <div className="text-sm sm:text-base mt-10 bg-(--card-background) border border-(--card-border) px-3 py-2.5 rounded-xl w-full max-w-sm">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 outline-none min-w-0 bg-transparent"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="ml-auto bg-(--primary) text-(--light-background-text) px-3 py-2 rounded-lg cursor-pointer"
                disabled={loading}
              >
                {loading ? "Reserving..." : status ? status : "Reserve a spot"}
              </button>
            </form>
          </div>

          {/* CTA Buttons */}
          {/* <div className="mt-10 xs:mt-6 flex flex-col xs:flex-row gap-3 w-full xs:w-auto max-w-64">
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
          </div> */}

          {/* Trusted by marquee */}
          <div className="mt-10 flex flex-col w-full gap-8 items-center z-0">
            <span className="font-mono text-sm text-(--muted)">
              Trusted by founders at
            </span>
            <div className="w-full max-w-3xl px-8">
              <Marquee>
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
