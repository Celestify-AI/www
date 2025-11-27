import type { Metadata } from "next";
import { Suspense } from "react";
import AppClient from "../../client/AppClient";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Your dashboard for Celestify.",
};

export default function AppHome() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AppClient />
      </Suspense>
    </>
  );
}
