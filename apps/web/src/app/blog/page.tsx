import { Navbar } from "../../components/Navbar";
import Link from "next/link";
import { ArrowLeft, Sparkles, Zap, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celestify • Blog",
  description: "Read Celestify's vision and upcoming insights.",
};

export default function Blog() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full flex justify-center items-center px-8 py-32">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-4xl sm:text-5xl font-medium font-headline">Blog</h1>
              <p className="text-lg text-(--subtitle) max-w-2xl">
                Coming soon. Stay tuned for updates, insights, and
                announcements.
              </p>
            </div>

            {/* Vision Section */}
            <div className="flex flex-col gap-12">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-medium mb-4">
                  Our Vision
                </h2>
                <p className="text-(--subtitle) max-w-3xl mx-auto leading-relaxed">
                  At Celestify, we believe that knowledge is the modern
                  interface for intelligence. We're building a future where AI
                  agents don't just process data—they understand context,
                  relationships, and meaning.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="bg-(--card-background) border border-(--border) rounded-2xl p-6 flex flex-col gap-4 group hover:border-(--primary-border)/50 transition-all"
                >
                  <div className="w-12 h-12 bg-(--primary)/10 border border-(--primary-border)/30 rounded-xl flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-(--primary-border)" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Intelligent Knowledge
                  </h3>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    We're creating systems that understand not just what
                    information exists, but why it matters and how it connects.
                  </p>
                </div>

                <div
                  className="bg-(--card-background) border border-(--border) rounded-2xl p-6 flex flex-col gap-4 group hover:border-(--primary-border)/50 transition-all"
                >
                  <div className="w-12 h-12 bg-(--primary)/10 border border-(--primary-border)/30 rounded-xl flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                    <Zap className="w-6 h-6 text-(--primary-border)" />
                  </div>
                  <h3 className="text-lg font-semibold">Agentic Workflows</h3>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    Our RAG-powered approach enables AI agents to execute
                    complex workflows with the knowledge they need, when they
                    need it.
                  </p>
                </div>

                <div
                  className="bg-(--card-background) border border-(--border) rounded-2xl p-6 flex flex-col gap-4 group hover:border-(--primary-border)/50 transition-all"
                >
                  <div className="w-12 h-12 bg-(--primary)/10 border border-(--primary-border)/30 rounded-xl flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                    <Target className="w-6 h-6 text-(--primary-border)" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Unified Intelligence
                  </h3>
                  <p className="text-sm text-(--muted) leading-relaxed">
                    We're transforming scattered information into a unified
                    knowledge base that grows smarter with every interaction.
                  </p>
                </div>
              </div>

              <div className="bg-(--card-background) border border-(--border) rounded-2xl p-8 text-center">
                <p className="text-(--subtitle) leading-relaxed max-w-2xl mx-auto mb-6">
                  As we continue building, we'll share our journey, insights,
                  and the lessons we learn along the way. Follow along as we
                  shape the future of AI-powered knowledge management.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Get in touch
                  <ArrowLeft size={18} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
