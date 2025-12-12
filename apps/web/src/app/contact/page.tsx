"use client";

import { Navbar } from "../../components/Navbar";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Users, HelpCircle, Briefcase, Github, Twitter } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full flex justify-center items-center px-8 py-32">
        <div className="w-full max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-(--muted) hover:text-(--foreground) transition-colors mb-12"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>
          
          <div className="flex flex-col gap-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-medium">
                Get in touch
              </h1>
              <p className="text-lg text-(--subtitle) max-w-2xl">
                Have questions? Want to learn more? We'd love to hear from you.
              </p>
            </motion.div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="mailto:ethan@celestify.ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-(--primary-border)/50 transition-all group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-16 h-16 bg-(--primary)/10 border border-(--primary-border)/30 rounded-xl flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                  <Mail className="w-8 h-8 text-(--primary-border)" />
                </div>
                <h3 className="text-xl font-semibold relative z-10">General Inquiries</h3>
                <p className="text-sm text-(--muted) text-center relative z-10">
                  ethan@celestify.ai
                </p>
                <p className="text-xs text-(--muted) text-center mt-2 relative z-10">
                  Questions, feedback, or just want to say hello
                </p>
              </motion.a>

              <motion.a
                href="mailto:ethan@celestify.ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-(--primary-border)/50 transition-all group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 w-16 h-16 bg-(--primary)/10 border border-(--primary-border)/30 rounded-xl flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                  <MessageSquare className="w-8 h-8 text-(--primary-border)" />
                </div>
                <h3 className="text-xl font-semibold relative z-10">Sales & Partnerships</h3>
                <p className="text-sm text-(--muted) text-center relative z-10">
                  ethan@celestify.ai
                </p>
                <p className="text-xs text-(--muted) text-center mt-2 relative z-10">
                  Enterprise solutions, partnerships, and custom integrations
                </p>
              </motion.a>
            </div>

            {/* Additional Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.a
                href="https://discord.gg/Gjh5pVUFrQ"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-xl p-6 flex flex-col gap-3 hover:border-(--primary-border)/50 transition-all group"
              >
                <div className="w-12 h-12 bg-(--primary)/10 border border-(--primary-border)/30 rounded-lg flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                  <Users className="w-6 h-6 text-(--primary-border)" />
                </div>
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-(--muted)">
                  Join our Discord community for updates, discussions, and support
                </p>
              </motion.a>

              <motion.a
                href="mailto:ethan@celestify.ai"
                whileHover={{ y: -2, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-xl p-6 flex flex-col gap-3 hover:border-(--primary-border)/50 transition-all group"
              >
                <div className="w-12 h-12 bg-(--primary)/10 border border-(--primary-border)/30 rounded-lg flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                  <HelpCircle className="w-6 h-6 text-(--primary-border)" />
                </div>
                <h3 className="font-semibold">Support</h3>
                <p className="text-sm text-(--muted)">
                  Technical support and troubleshooting assistance
                </p>
              </motion.a>

              <motion.a
                href="mailto:ethan@celestify.ai"
                whileHover={{ y: -2, scale: 1.02 }}
                className="bg-(--card-background) border border-(--border) rounded-xl p-6 flex flex-col gap-3 hover:border-(--primary-border)/50 transition-all group"
              >
                <div className="w-12 h-12 bg-(--primary)/10 border border-(--primary-border)/30 rounded-lg flex items-center justify-center group-hover:bg-(--primary)/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-(--primary-border)" />
                </div>
                <h3 className="font-semibold">Careers</h3>
                <p className="text-sm text-(--muted)">
                  Interested in joining our team? We'd love to hear from you
                </p>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-(--border) to-transparent"></div>
              <p className="text-sm text-(--muted) font-mono uppercase tracking-widest">
                Connect with us
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/celestify"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-(--card-background) border border-(--border) rounded-xl flex items-center justify-center hover:border-(--primary-border)/50 transition-all group"
                >
                  <Github className="w-6 h-6 text-(--muted) group-hover:text-(--primary-border) transition-colors" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/celestify"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-(--card-background) border border-(--border) rounded-xl flex items-center justify-center hover:border-(--primary-border)/50 transition-all group"
                >
                  <Twitter className="w-6 h-6 text-(--muted) group-hover:text-(--primary-border) transition-colors" />
                </motion.a>
                <motion.a
                  href="https://discord.gg/Gjh5pVUFrQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-(--card-background) border border-(--border) rounded-xl flex items-center justify-center hover:border-(--primary-border)/50 transition-all group"
                >
                  <Users className="w-6 h-6 text-(--muted) group-hover:text-(--primary-border) transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
