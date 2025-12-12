import Home from "../client/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celestify • AI Knowledge Library",
  description: "Your personal AI knowledge base.",
};

export default function HomePage() {

  return (
    <>
      <Home />
    </>
  );
}
