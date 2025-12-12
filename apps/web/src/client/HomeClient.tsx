"use client";

import { Navbar } from "../components/Navbar";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Target,
  MessageSquare,
  Bell,
  Database,
  Workflow,
  ChevronRight,
  Minus,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<string | null>("what-is-celestify");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center relative overflow-hidden">
        {/* Subtle animated background particles - Client only to avoid hydration errors */}
        {mounted && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(20)].map((_, i) => {
              const randomX = Math.random() * 100;
              const randomY = Math.random() * 100;
              const randomDuration = Math.random() * 10 + 10;
              const randomDelay = Math.random() * 5;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-(--primary-border)/20 rounded-full"
                  initial={{
                    x: `${randomX}vw`,
                    y: `${randomY}vh`,
                    opacity: 0,
                  }}
                  animate={{
                    y: [`${randomY}vh`, `${(randomY + 30) % 100}vh`],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: randomDelay,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Hero Section */}
        <div className="w-full max-w-5xl px-8 sm:px-0 flex flex-col items-center relative z-10">
          <div className="mt-48 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <span className="font-mono text-(--muted)">
                  Alpha in Testing
                </span>
              </div>
              <h1 className="text-center font-medium text-5xl sm:text-7xl">
                The personal <br />
                <span className="text-(--primary-border) font-instrument-serif italic">
                  knowledge
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
              href="/"
              className="group flex font-medium items-center gap-2 px-4 py-2 bg-(--primary) border border-(--primary-border) rounded-xl hover:scale-105 transition-transform"
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
              className="group flex font-medium items-center gap-2 px-4 py-2 bg-(--card-background) border border-(--border) rounded-xl hover:scale-105 transition-transform"
            >
              Community{" "}
            </a>
          </div>
        </div>

        {/* Image Demo Section - Sleek Design */}
        <div className="w-full max-w-5xl px-8 mt-24 mb-12 relative z-10">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-50"></div>

            {/* Main container with refined styling */}
            <motion.div
              whileHover={{ scale: 1.005, y: -2 }}
              className="relative bg-gradient-to-br from-(--card-background) to-(--card-background)/95 border border-(--border)/50 rounded-[18px] p-1 overflow-hidden group hover:border-(--primary-border)/60 transition-all duration-500 shadow-2xl shadow-(--primary)/10"
            >
              {/* Image with subtle border */}
              <div className="relative w-full h-full bg-(--background) rounded-2xl overflow-hidden border border-(--border)/30">
                <Image
                  src="/images/hero/hero-banner.png"
                  alt="Celestify notification center demo showing personalized notifications and unified intelligence"
                  width={2540}
                  height={1440}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trusted By & Integrations Section - Minimal YC Style */}
        <div className="w-full max-w-4xl px-8 mb-8 relative z-10">
          <div className="flex flex-col items-center gap-16">
            {/* Trusted By - Professional YC Style */}
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-xs font-mono text-(--muted) uppercase tracking-[0.3em] mb-2">
                Trusted by founders from
              </p>
              <div className="flex items-center justify-center gap-8">
                {/* Y Combinator */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  <svg width="14px" height="14px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                    <g>
                      <rect fill="#FB651E" x="0" y="0" width="256" height="256"/>
                      <path d="M119.373653,144.745813 L75.43296,62.4315733 L95.5144533,62.4315733 L121.36192,114.52416 C121.759575,115.452022 122.2235,116.413008 122.753707,117.407147 C123.283914,118.401285 123.747838,119.428546 124.145493,120.48896 C124.410597,120.886615 124.609422,121.251127 124.741973,121.582507 C124.874525,121.913886 125.007075,122.212123 125.139627,122.477227 C125.802386,123.802744 126.39886,125.095105 126.929067,126.354347 C127.459274,127.613589 127.923198,128.773399 128.320853,129.833813 C129.381268,127.580433 130.541078,125.1614 131.80032,122.57664 C133.059562,119.99188 134.351922,117.307747 135.67744,114.52416 L161.92256,62.4315733 L180.612267,62.4315733 L136.27392,145.739947 L136.27392,198.826667 L119.373653,198.826667 L119.373653,144.745813 Z" fill="#FFFFFF"/>
                    </g>
                  </svg>
                  <span className="text-sm font-semibold text-(--foreground) group-hover:text-(--primary-border) transition-colors">
                    Y Combinator
                  </span>
                </motion.div>
                <div className="h-4 w-px bg-(--border)"></div>
                {/* Colleges */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" className="h-3.5" />
                  <span className="text-sm font-semibold text-(--foreground) group-hover:text-(--primary-border) transition-colors">
                    MIT
                  </span>
                </motion.div>
                <div className="h-4 w-px bg-(--border)"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg" className="h-3.5"/>
                  <span className="text-sm font-semibold text-(--foreground) group-hover:text-(--primary-border) transition-colors">
                    UPenn
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Integrations - Logo-based, minimal */}
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-xs font-mono text-(--muted) uppercase tracking-widest mb-2">
                Integrates with
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {[
                  { name: "Gmail", logo: "/images/hero/logos/gmail.svg" },
                  { name: "Slack", logo: "/images/hero/logos/slack.svg" },
                  {
                    name: "Google Drive",
                    logo: "/images/hero/logos/google-drive.svg",
                  },
                  {
                    name: "Microsoft",
                    logo: "/images/hero/logos/microsoft.svg",
                  },
                  { name: "LinkedIn", logo: "/images/hero/logos/linkedin.svg" },
                ].map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                    className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all"
                  >
                    <Image
                      src={integration.logo}
                      alt={integration.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span className="text-xs text-(--muted) font-medium">
                      {integration.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Section - Enhanced with Depth */}
        <div className="w-full max-w-5xl px-8 mt-12 mb-24 relative">
          {/* Background depth effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-(--primary)/10 rounded-full blur-3xl opacity-30"></div>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl font-medium leading-tight mb-6 max-w-3xl">
              Transform scattered information into{" "}
              <span className="font-instrument-serif italic text-(--primary-border)">
                unified intelligence
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-(--subtitle) mb-10 max-w-2xl leading-relaxed">
              Celestify transforms scattered information into a unified
              knowledge base. Every document, email, and message becomes part of
              your AI's understanding.
            </p>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-(--primary) border border-(--primary-border) rounded-xl font-medium transition-all shadow-lg shadow-(--primary)/30 hover:shadow-(--primary)/50 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
                <Download
                  size={18}
                  className="relative z-10 group-hover:translate-y-[-2px] transition-transform"
                />
                <span className="relative z-10">Download</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="w-full max-w-6xl px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-(--border) to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-(--primary-border) to-transparent"></div>
        </div>

        {/* Feature Cards Section */}
        <div className="w-full max-w-6xl px-8 mb-32 relative z-10">
          <div className="flex flex-col items-center gap-8 mb-16">
            <h2 className="text-4xl sm:text-5xl font-medium text-center">
              Your AI platform,{" "}
              <span className="font-instrument-serif italic text-(--primary-border)">
                always informed
              </span>
            </h2>
            <p className="text-(--subtitle) text-center max-w-2xl">
              Celestify positions AI at the inflow of information sources,
              building a comprehensive vector database that makes agentic
              workflows more effective through intelligent knowledge retrieval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card 1: Fewer notifications */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col gap-6 overflow-hidden group hover:border-(--primary-border)/50 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-(--background) border border-(--border) rounded-full flex items-center justify-center">
                <span className="text-sm font-mono text-(--muted)">1</span>
              </div>

              {/* Gradient Background */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-900/30 via-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col gap-4">
                {/* Visual: Notification badges */}
                <div className="flex flex-col gap-3 mb-2">
                  <div className="flex items-center gap-2 text-(--muted) text-sm font-mono opacity-60">
                    <span>this channel</span>
                    <div className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[2.5rem] text-center">
                      99+
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-(--muted) text-sm font-mono opacity-60">
                    <span>that channel</span>
                    <div className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[2.5rem] text-center">
                      99+
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl font-bold mb-3">
                    Intelligent filtering
                  </h3>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    Instead of drowning in notifications, Celestify surfaces
                    only the information that matters. Your vector database
                    learns what's important to you.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Card 2: Always-on AI */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-(--card-background) border-2 border-(--primary-border)/30 rounded-2xl p-8 flex flex-col gap-6 overflow-hidden group hover:border-(--primary-border) transition-all duration-300 shadow-lg shadow-purple-500/10"
            >
              {/* Number Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-(--background) border border-(--primary-border) rounded-full flex items-center justify-center">
                <span className="text-sm font-mono text-(--primary-border)">
                  2
                </span>
              </div>

              {/* Purple Glow Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-600/40 via-purple-600/20 to-transparent"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>

              <div className="relative z-10 flex flex-col gap-4">
                {/* Visual: AI Chat Interface */}
                <div className="bg-(--background)/50 border border-(--border)/50 rounded-lg p-3 mb-2">
                  <div className="text-xs font-mono text-(--muted) mb-2 opacity-70">
                    celestia assistant
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-(--highlight-background) border border-(--border)/30 rounded-md px-3 py-2 text-xs text-(--muted) leading-relaxed">
                      i've indexed 247 new documents from your integrations this
                      week
                    </div>
                    <div className="bg-(--highlight-background) border border-(--border)/30 rounded-md px-3 py-2 text-xs text-(--muted) leading-relaxed">
                      your vector db now has context on the q4 project. ready
                      for agentic workflows
                    </div>
                    <div className="bg-(--highlight-background) border border-(--border)/30 rounded-md px-3 py-2 text-xs text-(--muted) leading-relaxed">
                      found 3 high-priority items that need your attention based
                      on your patterns
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl font-bold mb-3">
                    Continuous knowledge building
                  </h3>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    Celestify continuously builds your knowledge base from all
                    connected sources, making your AI agent smarter with every
                    interaction.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Card 3: Highest relevance */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col gap-6 overflow-hidden group hover:border-(--primary-border)/50 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-(--background) border border-(--border) rounded-full flex items-center justify-center">
                <span className="text-sm font-mono text-(--muted)">3</span>
              </div>

              {/* Gradient Background */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-900/30 via-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col gap-4">
                {/* Visual: Priority List */}
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-(--primary-border)"></div>
                    <div className="h-2 bg-(--primary-border)/30 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-(--primary-border)"></div>
                    <div className="h-2 bg-(--primary-border)/20 rounded flex-1 max-w-[80%]"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-(--primary-border)"></div>
                    <div className="h-2 bg-(--primary-border)/15 rounded flex-1 max-w-[60%]"></div>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl font-bold mb-3">
                    RAG-powered relevance
                  </h3>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    Traditional tools show you the most recent information.
                    Celestify uses RAG to surface the most relevant insights
                    from your entire knowledge base.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="w-full max-w-6xl px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-(--border) to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-(--primary-border) to-transparent"></div>
        </div>

        {/* Pricing Section */}
        <div className="w-full max-w-6xl px-8 mb-32 relative z-10">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-4xl sm:text-5xl font-medium">
                Simple, transparent <br />
                <span className="text-(--primary-border) font-instrument-serif italic">
                  pricing
                </span>
              </h2>
              <p className="text-(--subtitle) max-w-md">
                Choose the plan that fits your needs. All plans include secure
                data embedding and AI-powered context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Entry Plan */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col group hover:border-(--primary-border)/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Entry</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">Free</span>
                      <span className="text-(--muted)">3-day trial</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        Limited RAG queries
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        Limited integrations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        Basic AI context
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="/"
                    className="w-full text-center px-4 py-3 bg-(--card-background) border border-(--border) rounded-xl font-medium hover:bg-(--highlight-background) hover:border-(--primary-border)/30 transition-all group/btn"
                  >
                    <span className="group-hover/btn:translate-x-1 inline-block transition-transform">
                      Start Free Trial
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-(--card-background) border-2 border-(--primary-border) rounded-2xl p-8 flex flex-col relative group hover:shadow-lg hover:shadow-(--primary-border)/20 transition-all duration-300 overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-(--primary) border border-(--primary-border) rounded-full text-sm font-medium z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  Most Popular
                </motion.div>
                <div className="relative z-10">
                  <div className="mb-6 mt-2">
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">$20</span>
                      <span className="text-(--muted)">/month</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        Standard RAG queries
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        All integrations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        Advanced AI context
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        Priority support
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="/"
                    className="w-full text-center px-4 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:opacity-90 transition-all group/btn relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    ></motion.div>
                    <span className="relative z-10 group-hover/btn:translate-x-1 inline-block transition-transform">
                      Get Started
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* Max Plan */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col group hover:border-(--primary-border)/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Max</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">$50</span>
                      <span className="text-(--muted)">/month</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        3x RAG queries vs Pro
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        3x usage capacity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        All Pro features
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-(--primary-border) shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-(--muted)">
                        24/7 priority support
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="/"
                    className="w-full text-center px-4 py-3 bg-(--card-background) border border-(--border) rounded-xl font-medium hover:bg-(--highlight-background) hover:border-(--primary-border)/30 transition-all group/btn"
                  >
                    <span className="group-hover/btn:translate-x-1 inline-block transition-transform">
                      Get Started
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Enterprise */}
            <div className="w-full max-w-2xl mt-8">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-(--card-background) border border-(--border) rounded-2xl p-8 text-center group hover:border-(--primary-border)/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-(--muted) mb-6">
                    Custom solutions for teams and organizations. Get dedicated
                    support, custom integrations, and volume pricing.
                  </p>
                  <Link
                    href="mailto:ethan@celestify.ai"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:opacity-90 transition-all group/btn relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    ></motion.div>
                    <span className="relative z-10">Contact Sales</span>
                    <ArrowRight
                      size={18}
                      className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="w-full max-w-6xl px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-(--border) to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-(--primary-border) to-transparent"></div>
        </div>

        {/* How It Works Section - Enhanced Design */}
        <div className="w-full max-w-6xl px-8 mb-32 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-medium mb-4">
              How it works
            </h2>
            <p className="text-(--subtitle) max-w-xl mx-auto text-base">
              Three simple steps to transform your information into actionable
              intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Build",
                description:
                  "Create your personal AI knowledge base in minutes. Connect your favorite tools and watch as Celestify begins indexing your information.",
                icon: Database,
                color: "purple",
              },
              {
                step: "02",
                title: "Connect",
                description:
                  "Seamlessly integrate with Gmail, Slack, Google Drive, and more. Your data flows securely into a unified vector archive.",
                icon: Workflow,
                color: "blue",
              },
              {
                step: "03",
                title: "Scale",
                description:
                  "As your knowledge base grows, Celestify's RAG system ensures your AI agent has the insights needed for complex workflows.",
                icon: Zap,
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-(--card-background) border border-(--border) rounded-2xl p-6 flex flex-col gap-5 hover:border-(--primary-border)/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                {item.color === "purple" ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                )}

                <div className="relative z-10">
                  {/* Icon and Step Number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-(--primary)/10 border border-(--primary-border)/30 rounded-lg flex items-center justify-center group-hover:bg-(--primary)/20 group-hover:border-(--primary-border)/50 transition-all">
                      <item.icon className="w-5 h-5 text-(--primary-border)" />
                    </div>
                    <span className="text-xl font-mono text-(--muted) font-medium">
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-(--foreground) transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-(--subtitle) leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="w-full max-w-6xl px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-(--border) to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-(--primary-border) to-transparent"></div>
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-4xl px-8 mb-32 relative z-10">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-medium">
                Frequently asked questions
              </h2>
              <p className="text-(--subtitle) max-w-md">
                Everything you need to know about Celestify
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              {[
                {
                  id: "what-is-celestify",
                  question: "What is Celestify?",
                  answer:
                    "Celestify is an AI knowledge library that helps you manage the chaos of the digital world. By positioning AI at the inflow of information sources, it builds a vector database and uses RAG to make agentic workflows more effective, giving your AI the necessary knowledge to execute tasks.",
                },
                {
                  id: "devices",
                  question: "Is Celestify available for all devices?",
                  answer:
                    "Currently, Celestify is available as a web application. We're working on desktop and mobile apps to extend the experience across all your devices.",
                },
                {
                  id: "pricing",
                  question: "Is Celestify free to use?",
                  answer:
                    "Celestify offers a free 3-day trial with limited RAG queries and integrations. We have Pro ($20/month) and Max ($50/month) plans for more advanced features. Enterprise customers can contact us for custom solutions.",
                },
                {
                  id: "integrations",
                  question: "Does Celestify integrate with my favorite apps?",
                  answer:
                    "Yes! Celestify integrates with Gmail, Slack, Google Drive, Microsoft, LinkedIn, and more. We're constantly adding new integrations based on user feedback.",
                },
                {
                  id: "vector-db",
                  question: "How does Celestify's vector database work?",
                  answer:
                    "Celestify securely embeds your data from all connected sources into a vector database. This allows for semantic search and retrieval-augmented generation (RAG), making your AI agent knowledge-aware and more effective at executing workflows.",
                },
                {
                  id: "better",
                  question: "How is Celestify better than other tools?",
                  answer:
                    "Unlike tools that just aggregate information, Celestify builds a comprehensive knowledge base using vector embeddings and RAG. This means your AI agent doesn't just have access to data—it understands relationships, relevance, and meaning, making agentic workflows truly effective.",
                },
              ].map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-(--card-background) border border-(--border) rounded-xl overflow-hidden group hover:border-(--primary-border)/50 transition-colors duration-300 relative"
                >
                  {/* Subtle gradient on hover - kept as CSS transition only */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                    }
                    className="w-full flex items-center justify-between p-6 hover:bg-(--highlight-background) transition-colors duration-200 text-left relative z-10"
                  >
                    <span className="font-semibold text-lg">
                      {faq.question}
                    </span>
                    <div>
                      {openFAQ === faq.id ? (
                        <Minus size={20} className="text-(--muted) shrink-0" />
                      ) : (
                        <ChevronRight
                          size={20}
                          className="text-(--muted) shrink-0"
                        />
                      )}
                    </div>
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-6 pt-2 text-(--muted) leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section - Compact */}
        <div className="w-full max-w-3xl px-8 mt-24 mb-16 flex flex-col items-center text-center">
          <p className="text-sm font-mono text-(--muted) uppercase tracking-[0.3em] mb-8">
            We believe
          </p>

          <h2 className="text-2xl sm:text-3xl font-medium leading-tight mb-4 max-w-2xl">
            Knowledge is the modern{" "}
            <span className="font-instrument-serif italic text-(--primary-border)">
              interface
            </span>{" "}
            for intelligence
          </h2>

          <p className="text-base text-(--subtitle) mb-8 max-w-xl leading-relaxed">
            Build your AI knowledge base that helps your agent understand
            everything it needs to execute.
          </p>

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:scale-105 transition-all shadow-lg shadow-(--primary)/20 group/btn relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              ></motion.div>
              <Download
                size={18}
                className="relative z-10 group-hover/btn:translate-y-[-2px] transition-transform"
              />
              <span className="relative z-10">Download</span>
            </Link>
          </div>

          <p className="text-xs text-(--muted) mt-8 font-mono">
            Available for Web, with Desktop and Mobile coming soon
          </p>
        </div>

        {/* Decorative divider */}
        <div className="w-full max-w-6xl px-8 mb-16 relative">
          <div className="h-px bg-gradient-to-r from-transparent via-(--border) to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-(--primary-border) to-transparent"></div>
        </div>

        {/* Contact Us Section */}
        <div className="w-full max-w-4xl px-8 mb-32 mt-16 relative z-10">
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            className="bg-(--card-background) border border-(--border) rounded-2xl p-12 text-center group hover:border-(--primary-border)/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-medium mb-4">
                Get in touch
              </h2>
              <p className="text-(--subtitle) mb-8 max-w-md mx-auto">
                Have questions? Want to learn more? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="mailto:ethan@celestify.ai"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:scale-105 transition-all shadow-lg shadow-(--primary)/20 group/btn relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  ></motion.div>
                  <MessageSquare size={18} className="relative z-10" />
                  <span className="relative z-10">Contact Us</span>
                </Link>
                <a
                  href="mailto:ethan@celestify.ai"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-(--card-background) border border-(--border) rounded-xl font-medium hover:bg-(--highlight-background) hover:border-(--primary-border)/30 transition-all group/btn"
                >
                  <span className="group-hover/btn:translate-x-1 inline-block transition-transform">
                    Sales Inquiry
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
