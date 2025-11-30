import type { Metadata } from "next";
import AppClient from "../../client/AppClient";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Your dashboard for Celestify.",
};

export default function AppHome() {
  return (
    <>
      <AppClient />
    </>
  );
}
