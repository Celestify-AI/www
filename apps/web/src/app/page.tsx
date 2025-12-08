import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  title: "Celestify • AI Knowledge Library",
  description: "Your personal AI knowledge base.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div></div>
    </>
  );
}
