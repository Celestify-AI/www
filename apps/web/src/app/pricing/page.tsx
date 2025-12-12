import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Celestify • Pricing",
  description: "Subscribe to Celestify's paid plan.",
};

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full flex justify-center items-center px-8 py-32">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-4xl sm:text-5xl font-medium">
                Simple, transparent <br />
                <span className="text-(--primary-border) font-instrument-serif italic">
                  pricing
                </span>
              </h1>
              <p className="text-(--subtitle) max-w-md">
                Choose the plan that fits your needs. All plans include secure data embedding and AI-powered context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Entry Plan */}
              <div className="bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Entry</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">Free</span>
                    <span className="text-(--muted)">3-day trial</span>
                  </div>
                  <p className="text-sm text-(--muted) mt-2">Perfect for trying Celestify</p>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Limited RAG queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Limited integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Basic AI context</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Community support</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="w-full text-center px-4 py-3 bg-(--card-background) border border-(--border) rounded-xl font-medium hover:bg-(--highlight-background) transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-(--card-background) border-2 border-(--primary-border) rounded-2xl p-8 flex flex-col relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-(--primary) border border-(--primary-border) rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <div className="mb-6 mt-2">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$20</span>
                    <span className="text-(--muted)">/month</span>
                  </div>
                  <p className="text-sm text-(--muted) mt-2">For individuals and small teams</p>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Standard RAG queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">All integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Advanced AI context</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Unlimited workflows</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="w-full text-center px-4 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>

              {/* Max Plan */}
              <div className="bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Max</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$50</span>
                    <span className="text-(--muted)">/month</span>
                  </div>
                  <p className="text-sm text-(--muted) mt-2">For power users and teams</p>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">3x RAG queries vs Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">3x usage capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">All Pro features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">24/7 priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-(--primary-border) shrink-0 mt-0.5" />
                    <span className="text-sm text-(--muted)">Advanced analytics</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="w-full text-center px-4 py-3 bg-(--card-background) border border-(--border) rounded-xl font-medium hover:bg-(--highlight-background) transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="w-full max-w-2xl mt-8">
              <div className="bg-(--card-background) border border-(--border) rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-(--muted) mb-6">
                  Custom solutions for teams and organizations. Get dedicated support, custom integrations, and volume pricing.
                </p>
                <Link
                  href="mailto:sales@celestify.ai"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-(--primary) border border-(--primary-border) rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Sales
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
