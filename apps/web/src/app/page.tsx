import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Celestify • AI Knowledge Library",
  description: "Your personal AI knowledge base.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex justify-center">
        <div className="w-full max-w-lg px-8 sm:px-0 flex flex-col items-center">
          <div className="mt-48 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="font-mono text-(--muted)">
                  Alpha in Testing
                </span>
              </div>
              <h1 className="text-center font-medium text-5xl sm:text-7xl">
                The personal <br />
                <span className="text-(--primary-border) font-instrument-serif italic">
                  context
                </span>{" "}
                engine
              </h1>
            </div>
            <h2 className="text-sm sm:text-base text-(--subtitle) text-center max-w-md">
              An AI agent that knows everything it needs to execute. Your data
              securely embedded into a vector archive.
            </h2>
          </div>
          <div className="flex mt-8 gap-3">
            <Link
              href="/signup"
              className="group flex font-medium items-center gap-2 px-4 py-2 bg-(--primary) border border-(--primary-border) rounded-xl"
            >
              Get Started{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="https://discord.gg/Gjh5pVUFrQ"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex font-medium items-center gap-2 px-4 py-2 bg-(--card-background) border border-(--border) rounded-xl"
            >
              Community{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
